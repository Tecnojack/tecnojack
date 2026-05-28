import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

type CliOptions = {
  dryRun: boolean;
  rootDir: string;
  maxDimension: number;
  jpegQuality: number;
  webpQuality: number;
  pngQuality: number;
  minSavingsBytes: number;
  minSavingsRatio: number;
};

type ImageResult = {
  filePath: string;
  originalBytes: number;
  optimizedBytes: number;
  changed: boolean;
  error?: string;
};

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function parseArgs(argv: string[]): CliOptions {
  const defaults: CliOptions = {
    dryRun: false,
    rootDir: path.resolve('src/assets'),
    maxDimension: 2560,
    jpegQuality: 78,
    webpQuality: 78,
    pngQuality: 80,
    minSavingsBytes: 8 * 1024,
    minSavingsRatio: 0.02
  };

  const options = { ...defaults };

  for (const arg of argv) {
    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }
    if (arg.startsWith('--root=')) {
      options.rootDir = path.resolve(arg.slice('--root='.length));
      continue;
    }
    if (arg.startsWith('--max-dimension=')) {
      const value = Number(arg.slice('--max-dimension='.length));
      if (Number.isFinite(value) && value > 0) {
        options.maxDimension = Math.floor(value);
      }
      continue;
    }
    if (arg.startsWith('--jpeg-quality=')) {
      const value = Number(arg.slice('--jpeg-quality='.length));
      if (Number.isFinite(value) && value >= 1 && value <= 100) {
        options.jpegQuality = Math.floor(value);
      }
      continue;
    }
    if (arg.startsWith('--webp-quality=')) {
      const value = Number(arg.slice('--webp-quality='.length));
      if (Number.isFinite(value) && value >= 1 && value <= 100) {
        options.webpQuality = Math.floor(value);
      }
      continue;
    }
    if (arg.startsWith('--png-quality=')) {
      const value = Number(arg.slice('--png-quality='.length));
      if (Number.isFinite(value) && value >= 1 && value <= 100) {
        options.pngQuality = Math.floor(value);
      }
      continue;
    }
    if (arg.startsWith('--min-savings-bytes=')) {
      const value = Number(arg.slice('--min-savings-bytes='.length));
      if (Number.isFinite(value) && value >= 0) {
        options.minSavingsBytes = Math.floor(value);
      }
      continue;
    }
    if (arg.startsWith('--min-savings-ratio=')) {
      const value = Number(arg.slice('--min-savings-ratio='.length));
      if (Number.isFinite(value) && value >= 0 && value <= 1) {
        options.minSavingsRatio = value;
      }
      continue;
    }
  }

  return options;
}

async function collectImageFiles(rootDir: string): Promise<string[]> {
  const output: string[] = [];

  async function walk(currentDir: string): Promise<void> {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        output.push(fullPath);
      }
    }
  }

  await walk(rootDir);
  return output;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kib = bytes / 1024;
  if (kib < 1024) return `${kib.toFixed(1)} KB`;
  const mib = kib / 1024;
  return `${mib.toFixed(2)} MB`;
}

async function optimizeFile(filePath: string, options: CliOptions): Promise<ImageResult> {
  const extension = path.extname(filePath).toLowerCase();
  const originalBuffer = await fs.readFile(filePath);
  const originalBytes = originalBuffer.byteLength;

  let pipeline = sharp(originalBuffer, { failOn: 'none' })
    .rotate()
    .resize({
      width: options.maxDimension,
      height: options.maxDimension,
      fit: 'inside',
      withoutEnlargement: true
    });

  switch (extension) {
    case '.jpg':
    case '.jpeg':
      pipeline = pipeline.jpeg({
        quality: options.jpegQuality,
        progressive: true,
        mozjpeg: true,
        chromaSubsampling: '4:2:0'
      });
      break;
    case '.png':
      pipeline = pipeline.png({
        quality: options.pngQuality,
        compressionLevel: 9,
        effort: 10,
        palette: true
      });
      break;
    case '.webp':
      pipeline = pipeline.webp({
        quality: options.webpQuality,
        effort: 6
      });
      break;
    default:
      return {
        filePath,
        originalBytes,
        optimizedBytes: originalBytes,
        changed: false
      };
  }

  try {
    const optimizedBuffer = await pipeline.toBuffer();
    const optimizedBytes = optimizedBuffer.byteLength;

    if (optimizedBytes >= originalBytes) {
      return {
        filePath,
        originalBytes,
        optimizedBytes: originalBytes,
        changed: false
      };
    }

    const savedBytes = originalBytes - optimizedBytes;
    const savedRatio = originalBytes > 0 ? savedBytes / originalBytes : 0;
    const shouldWrite = savedBytes >= options.minSavingsBytes || savedRatio >= options.minSavingsRatio;

    if (!shouldWrite) {
      return {
        filePath,
        originalBytes,
        optimizedBytes: originalBytes,
        changed: false
      };
    }

    if (!options.dryRun) {
      await fs.writeFile(filePath, optimizedBuffer);
    }

    return {
      filePath,
      originalBytes,
      optimizedBytes,
      changed: true
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      filePath,
      originalBytes,
      optimizedBytes: originalBytes,
      changed: false,
      error: message
    };
  }
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));

  const files = await collectImageFiles(options.rootDir);
  if (!files.length) {
    console.log(`[Image Optimize] No se encontraron imágenes en ${options.rootDir}`);
    return;
  }

  console.log(`[Image Optimize] ${options.dryRun ? 'Simulación' : 'Optimización'} de ${files.length} imágenes en ${options.rootDir}`);

  const results: ImageResult[] = [];
  for (const filePath of files) {
    const result = await optimizeFile(filePath, options);
    results.push(result);
  }

  const changed = results.filter((item) => item.changed);
  const failed = results.filter((item) => item.error);
  const totalBefore = results.reduce((sum, item) => sum + item.originalBytes, 0);
  const totalAfter = results.reduce((sum, item) => sum + item.optimizedBytes, 0);
  const savedBytes = totalBefore - totalAfter;
  const savedPercent = totalBefore > 0 ? (savedBytes / totalBefore) * 100 : 0;

  console.log(`[Image Optimize] Archivos optimizados: ${changed.length}/${results.length}`);
  if (failed.length) {
    console.log(`[Image Optimize] Archivos omitidos por error: ${failed.length}`);
  }
  console.log(`[Image Optimize] Antes: ${formatBytes(totalBefore)} | Después: ${formatBytes(totalAfter)} | Ahorro: ${formatBytes(savedBytes)} (${savedPercent.toFixed(2)}%)`);

  const topChanges = [...changed]
    .sort((a, b) => (b.originalBytes - b.optimizedBytes) - (a.originalBytes - a.optimizedBytes))
    .slice(0, 15);

  if (topChanges.length) {
    console.log('[Image Optimize] Top archivos con mayor ahorro:');
    for (const item of topChanges) {
      const delta = item.originalBytes - item.optimizedBytes;
      console.log(`- ${path.relative(process.cwd(), item.filePath)}: ${formatBytes(item.originalBytes)} -> ${formatBytes(item.optimizedBytes)} (ahorro ${formatBytes(delta)})`);
    }
  }

  if (failed.length) {
    console.log('[Image Optimize] Archivos con error:');
    for (const item of failed.slice(0, 20)) {
      console.log(`- ${path.relative(process.cwd(), item.filePath)}: ${item.error}`);
    }
  }
}

main().catch((error) => {
  console.error('[Image Optimize] Error:', error);
  process.exitCode = 1;
});
