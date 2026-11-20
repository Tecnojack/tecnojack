/**
 * Localize the hardcoded Firebase Storage images used by the public site.
 *
 * Finds every `https://firebasestorage.googleapis.com/...` URL written in `src/app`, downloads the original
 * once, and writes lightweight responsive WebP variants into `src/assets/images/site/`:
 *
 *   <slug>-640.webp   phones on slow data, thumbnails
 *   <slug>-1080.webp  default `src` (phones and most cards)
 *   <slug>-1600.webp  large desktop displays (hero, full-bleed)
 *
 * With `--rewrite`, source files are updated to point at `assets/images/site/<slug>-1080.webp`.
 * Originals in Firebase are never modified or deleted. Re-running is safe: existing variants are skipped
 * unless `--force` is passed.
 *
 * Usage:
 *   npm run images:localize -- --dry-run      list what would be downloaded and rewritten
 *   npm run images:localize                    generate variants only
 *   npm run images:localize -- --rewrite       generate variants and rewrite URLs in src/app
 *   npm run images:localize -- --url="https://firebasestorage..."   add an image that only lives in Firebase/CMS
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = path.resolve('src/app');
const OUTPUT_DIR = path.resolve('src/assets/images/site');
const PUBLIC_PREFIX = 'assets/images/site';
const MANIFEST = path.join(OUTPUT_DIR, 'manifest.json');
const RUNTIME_MAP = path.resolve('src/app/shared/media/localized-images.generated.ts');
const WIDTHS = [640, 1080, 1600] as const;
const DEFAULT_WIDTH = 1080;
const QUALITY: Record<number, number> = { 640: 70, 1080: 74, 1600: 76 };
const URL_PATTERN = /https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/'"`\s]+\/o\/[^'"`\s)]+/g;
const SOURCE_EXTENSIONS = new Set(['.ts', '.html']);

interface Options {
	dryRun: boolean;
	rewrite: boolean;
	force: boolean;
	/** Extra Firebase URLs to localize even if they are not written in src/app (e.g. CMS covers). */
	urls: string[];
}

interface ManifestEntry {
	url: string;
	slug: string;
	storagePath: string;
	originalBytes: number;
	originalSize: string;
	variants: Record<string, number>;
}

function parseArgs(argv: string[]): Options {
	return {
		dryRun: argv.includes('--dry-run'),
		rewrite: argv.includes('--rewrite'),
		force: argv.includes('--force'),
		urls: argv.filter((a) => a.startsWith('--url=')).map((a) => a.slice('--url='.length)),
	};
}

async function listSourceFiles(dir: string, out: string[] = []): Promise<string[]> {
	for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await listSourceFiles(full, out);
		else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) out.push(full);
	}
	return out;
}

/** `.../o/servicios%2Fbodas%2Fcover.jpg?alt=media&token=...` → `servicios/bodas/cover.jpg` */
function storagePathOf(url: string): string {
	const encoded = url.split('/o/')[1]?.split('?')[0] ?? '';
	return decodeURIComponent(encoded);
}

function slugOf(storagePath: string): string {
	return storagePath
		.replace(/\.[a-z0-9]+$/i, '')
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/^servicios-/, '');
}

function formatBytes(bytes: number): string {
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function exists(file: string): Promise<boolean> {
	try {
		await fs.access(file);
		return true;
	} catch {
		return false;
	}
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const files = await listSourceFiles(SOURCE_DIR);

	// url -> files that reference it
	const usage = new Map<string, Set<string>>();
	for (const file of files) {
		const text = await fs.readFile(file, 'utf8');
		for (const match of text.match(URL_PATTERN) ?? []) {
			if (!usage.has(match)) usage.set(match, new Set());
			usage.get(match)!.add(file);
		}
	}

	for (const url of options.urls) {
		if (!usage.has(url)) usage.set(url, new Set());
	}

	// Several URLs (different tokens) can point at the same object: group by storage path.
	const bySlug = new Map<string, string[]>();
	for (const url of usage.keys()) {
		const slug = slugOf(storagePathOf(url));
		if (!bySlug.has(slug)) bySlug.set(slug, []);
		bySlug.get(slug)!.push(url);
	}

	console.log(`Found ${usage.size} Firebase URLs → ${bySlug.size} images in ${SOURCE_DIR}`);
	if (options.dryRun) {
		for (const [slug, urls] of bySlug) {
			const refs = new Set(urls.flatMap((u) => [...usage.get(u)!]));
			console.log(`  ${slug}  (${refs.size} file${refs.size === 1 ? '' : 's'})`);
		}
		return;
	}

	await fs.mkdir(OUTPUT_DIR, { recursive: true });
	// The manifest accumulates: once source URLs are rewritten they no longer appear in src/app,
	// so previous entries must survive later runs.
	const merged = new Map<string, ManifestEntry>();
	try {
		for (const entry of JSON.parse(await fs.readFile(MANIFEST, 'utf8')) as ManifestEntry[]) merged.set(entry.slug, entry);
	} catch {
		// first run: no manifest yet
	}
	const manifest: ManifestEntry[] = [];
	let originalTotal = 0;
	let defaultTotal = 0;

	for (const [slug, urls] of bySlug) {
		const url = urls[0];
		const targets = WIDTHS.map((w) => path.join(OUTPUT_DIR, `${slug}-${w}.webp`));
		const haveAll = (await Promise.all(targets.map(exists))).every(Boolean);

		const response = await fetch(url);
		if (!response.ok) {
			console.warn(`  ! ${slug}: HTTP ${response.status}, skipped (URL left untouched)`);
			continue;
		}
		const original = Buffer.from(await response.arrayBuffer());
		const meta = await sharp(original, { failOn: 'none' }).metadata();
		const variants: Record<string, number> = {};

		for (const width of WIDTHS) {
			const target = path.join(OUTPUT_DIR, `${slug}-${width}.webp`);
			if (haveAll && !options.force) {
				variants[width] = (await fs.stat(target)).size;
				continue;
			}
			const buffer = await sharp(original, { failOn: 'none' })
				.rotate()
				.resize({ width, withoutEnlargement: true })
				.webp({ quality: QUALITY[width], effort: 5, smartSubsample: true })
				.toBuffer();
			await fs.writeFile(target, buffer);
			variants[width] = buffer.byteLength;
		}

		originalTotal += original.byteLength;
		defaultTotal += variants[DEFAULT_WIDTH];
		manifest.push({
			url,
			slug,
			storagePath: storagePathOf(url),
			originalBytes: original.byteLength,
			originalSize: `${meta.width}x${meta.height}`,
			variants,
		});
		console.log(
			`  ✓ ${slug}: ${formatBytes(original.byteLength)} (${meta.width}x${meta.height}) → ` +
				WIDTHS.map((w) => `${w}: ${formatBytes(variants[w])}`).join(', '),
		);
	}

	for (const entry of manifest) merged.set(entry.slug, entry);
	const all = [...merged.values()].sort((a, b) => a.storagePath.localeCompare(b.storagePath));
	await fs.writeFile(MANIFEST, JSON.stringify(all, null, 2) + '\n');

	// Runtime map: URLs that arrive from Firestore/Storage at runtime resolve to the local variants too.
	const lines = all.map((e) => `\t${JSON.stringify(e.storagePath)}: '${PUBLIC_PREFIX}/${e.slug}',`).join('\n');
	await fs.writeFile(
		RUNTIME_MAP,
		'// Generated by scripts/localize-remote-images.ts — do not edit by hand.\n' +
			'// Firebase Storage path → local responsive WebP base (append -640 / -1080 / -1600 .webp).\n' +
			`export const LOCALIZED_IMAGE_WIDTHS = [${WIDTHS.join(', ')}] as const;\n` +
			`export const LOCALIZED_IMAGE_DEFAULT_WIDTH = ${DEFAULT_WIDTH};\n\n` +
			`export const LOCALIZED_IMAGES: Readonly<Record<string, string>> = {\n${lines}\n};\n`,
	);

	console.log(`\nManifest: ${all.length} localized images (${manifest.length} processed this run).`);
	if (manifest.length) {
		console.log(`Originals ${formatBytes(originalTotal)} → default ${DEFAULT_WIDTH}px variants ${formatBytes(defaultTotal)}`);
	}

	if (!options.rewrite) {
		console.log('Variants written. Re-run with --rewrite to point the source code at them.');
		return;
	}

	const localized = new Map(manifest.flatMap((entry) => bySlug.get(entry.slug)!.map((u) => [u, entry.slug] as const)));
	let changedFiles = 0;
	for (const file of files) {
		const text = await fs.readFile(file, 'utf8');
		const next = text.replace(URL_PATTERN, (url) => {
			const slug = localized.get(url);
			return slug ? `${PUBLIC_PREFIX}/${slug}-${DEFAULT_WIDTH}.webp` : url;
		});
		if (next !== text) {
			await fs.writeFile(file, next);
			changedFiles += 1;
			console.log(`  rewrote ${path.relative(process.cwd(), file)}`);
		}
	}
	console.log(`Rewrote ${changedFiles} source files.`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
