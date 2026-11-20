import { LOCALIZED_IMAGES, LOCALIZED_IMAGE_DEFAULT_WIDTH, LOCALIZED_IMAGE_WIDTHS } from './localized-images.generated';

const FIREBASE_OBJECT = /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/([^?]+)/;
const LOCAL_VARIANT = /^(assets\/images\/site\/.+)-(\d+)\.webp$/;

/**
 * Firebase Storage URL → local optimized WebP (default width) when the image has been localized with
 * `npm run images:localize`. Any other URL is returned unchanged.
 */
export function localizeImageUrl(url: string): string {
	const match = FIREBASE_OBJECT.exec(url);
	if (!match) return url;
	let storagePath: string;
	try {
		storagePath = decodeURIComponent(match[1]);
	} catch {
		return url;
	}
	const base = LOCALIZED_IMAGES[storagePath];
	return base ? `${base}-${LOCALIZED_IMAGE_DEFAULT_WIDTH}.webp` : url;
}

/** `srcset` for a localized image (`assets/images/site/<slug>-<w>.webp`), or `null` for any other source. */
export function localizedSrcset(src: string | null | undefined): string | null {
	const match = LOCAL_VARIANT.exec(String(src ?? '').trim());
	if (!match) return null;
	return LOCALIZED_IMAGE_WIDTHS.map((w) => `${match[1]}-${w}.webp ${w}w`).join(', ');
}
