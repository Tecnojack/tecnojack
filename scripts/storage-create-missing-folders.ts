/**
 * storage-create-missing-folders.ts
 *
 * Crea únicamente las carpetas de Storage que faltan.
 * - Si una carpeta ya existe (tiene un .keep), la omite sin tocar nada.
 * - No borra, no sobreescribe, no modifica archivos existentes.
 *
 * Uso:
 *   npx tsx --tsconfig tsconfig.scripts.json scripts/storage-create-missing-folders.ts
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { App, ServiceAccount } from 'firebase-admin/app';

const SERVICE_ACCOUNT_PATH = resolve('secrets/tecnojack-admin-firebase-adminsdk-fbsvc-748b0cbcb3.json');
const STORAGE_BUCKET = 'tecnojack-admin.firebasestorage.app';

/** Carpetas que deben existir. Solo se crean si NO tienen ya un .keep. */
const FOLDERS_TO_ENSURE: string[] = [
  // Bodas híbridas (renombradas de slugs largos a nombres cortos)
  'servicios/bodas/hibridas/esencial',
  'servicios/bodas/hibridas/completo',
  'servicios/bodas/hibridas/premium',
  'servicios/bodas/hibridas/luxury',

  // Postboda — faltaba el plan completa
  'servicios/bodas/postboda/postboda-completa',

  // Quinces mixtos
  'servicios/quinces/mixto/esencial',
  'servicios/quinces/mixto/completo',
  'servicios/quinces/mixto/premium',
];

async function run(): Promise<void> {
  const app = await initApp();
  const { getStorage } = await import('firebase-admin/storage');
  const bucket = getStorage(app).bucket(STORAGE_BUCKET);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const folder of FOLDERS_TO_ENSURE) {
    const keepPath = `${folder}/.keep`;
    try {
      const [exists] = await bucket.file(keepPath).exists();
      if (exists) {
        console.log(`  ✔ ya existe  ${folder}`);
        skipped++;
        continue;
      }

      await bucket.file(keepPath).save('', {
        metadata: { contentType: 'text/plain' },
      });
      console.log(`  ✅ creado     ${folder}`);
      created++;
    } catch (err) {
      console.error(`  ❌ error en  ${folder}:`, err);
      errors++;
    }
  }

  console.log(`\nResumen: ${created} creadas, ${skipped} ya existían, ${errors} errores.`);
}

async function initApp(): Promise<App> {
  const { cert, getApps, initializeApp } = await import('firebase-admin/app');

  if (getApps().length) return getApps()[0]!;

  if (!existsSync(SERVICE_ACCOUNT_PATH)) {
    throw new Error(`No se encuentra el service account en: ${SERVICE_ACCOUNT_PATH}`);
  }

  const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8')) as ServiceAccount;
  return initializeApp({ credential: cert(serviceAccount) });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
