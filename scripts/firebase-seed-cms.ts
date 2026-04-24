import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import type { App, ServiceAccount } from 'firebase-admin/app';
import type { Firestore, WriteBatch } from 'firebase-admin/firestore';
import { adminCmsSeed } from '../src/app/features/admin/data/admin-cms.seed';
import { CMS_COLLECTION_KEYS, CmsCollectionKey } from '../src/app/features/admin/models/cms.models';

type SeedOptions = {
  dryRun: boolean;
  reset: boolean;
  only: CmsCollectionKey[] | null;
};

type ServiceAccountLike = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

const DATE_FIELDS = new Set([
  'createdAt',
  'updatedAt',
  'publishedAt',
  'deletedAt',
  'builtAt',
  'lastLoginAt',
  'submittedAt'
]);
const requireModule = createRequire(import.meta.url);

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const collections = options.only ?? CMS_COLLECTION_KEYS;
  const counts = collections.map((collection) => ({
    collection,
    count: adminCmsSeed[collection].length
  }));

  if (options.dryRun) {
    console.table(counts);
    console.log(`[Firebase seed] Dry run completado. Colecciones: ${collections.join(', ')}`);
    return;
  }

  const { db, projectId } = await initializeFirebaseApp();

  console.table(counts);

  for (const collection of collections) {
    if (options.reset) {
      await resetCollection(db, collection);
    }

    await seedCollection(db, collection, adminCmsSeed[collection] as unknown as Array<Record<string, unknown>>);
  }

  console.log(
    `[Firebase seed] Carga completada en ${projectId ?? 'proyecto-desconocido'} para: ${collections.join(', ')}`
  );
}

function parseArgs(args: string[]): SeedOptions {
  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const onlyArg = args.find((arg) => arg.startsWith('--only='));
  const only = onlyArg
    ? onlyArg
        .slice('--only='.length)
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
    : null;

  const invalidCollections = (only ?? []).filter((value) => !CMS_COLLECTION_KEYS.includes(value as CmsCollectionKey));
  if (invalidCollections.length) {
    throw new Error(`[Firebase seed] Colecciones inválidas en --only: ${invalidCollections.join(', ')}`);
  }

  return {
    dryRun: args.includes('--dry-run'),
    reset: args.includes('--reset'),
    only: (only as CmsCollectionKey[] | null) ?? null
  };
}

function printHelp(): void {
  console.log(`
Uso:
  npm run firebase:seed:cms -- --dry-run
  npm run firebase:seed:cms
  npm run firebase:seed:cms -- --reset
  npm run firebase:seed:cms -- --only=categories,pages,sections

Credenciales soportadas:
  GOOGLE_APPLICATION_CREDENTIALS
  FIREBASE_SERVICE_ACCOUNT_PATH
  FIREBASE_SERVICE_ACCOUNT_JSON
  FIREBASE_SERVICE_ACCOUNT_JSON_BASE64
`);
}

async function initializeFirebaseApp(): Promise<{ app: App; db: Firestore; projectId?: string }> {
  const { applicationDefault, cert, getApps, initializeApp } = await import('firebase-admin/app');
  const { getFirestore } = await import('firebase-admin/firestore');

  const serviceAccount = resolveServiceAccount();
  let app: App;

  if (getApps().length) {
    app = getApps()[0]!;
    return { app, db: getFirestore(app), projectId: String(app.options.projectId ?? '') || undefined };
  }

  if (serviceAccount) {
    app = initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
      projectId: process.env['FIREBASE_PROJECT_ID'] || serviceAccount.project_id
    });
    return { app, db: getFirestore(app), projectId: String(app.options.projectId ?? '') || undefined };
  }

  app = initializeApp({
    credential: applicationDefault(),
    projectId: process.env['FIREBASE_PROJECT_ID']
  });

  return { app, db: getFirestore(app), projectId: String(app.options.projectId ?? '') || undefined };
}

function resolveServiceAccount(): ServiceAccountLike | null {
  const inlineJson = process.env['FIREBASE_SERVICE_ACCOUNT_JSON'];
  if (inlineJson?.trim()) {
    return JSON.parse(inlineJson) as ServiceAccountLike;
  }

  const base64Json = process.env['FIREBASE_SERVICE_ACCOUNT_JSON_BASE64'];
  if (base64Json?.trim()) {
    return JSON.parse(Buffer.from(base64Json, 'base64').toString('utf8')) as ServiceAccountLike;
  }

  const credentialPath =
    process.env['FIREBASE_SERVICE_ACCOUNT_PATH'] || process.env['GOOGLE_APPLICATION_CREDENTIALS'] || '';

  if (!credentialPath.trim()) {
    return null;
  }

  const resolvedPath = resolve(credentialPath);
  if (!existsSync(resolvedPath)) {
    throw new Error(`[Firebase seed] No existe el archivo de credenciales: ${resolvedPath}`);
  }

  return JSON.parse(readFileSync(resolvedPath, 'utf8')) as ServiceAccountLike;
}

async function resetCollection(db: Firestore, collection: CmsCollectionKey): Promise<void> {
  const snapshots = await db.collection(collection).listDocuments();
  if (!snapshots.length) {
    console.log(`[Firebase seed] ${collection}: sin documentos previos para eliminar.`);
    return;
  }

  for (const chunk of chunkArray(snapshots, 400)) {
    const batch = db.batch();
    chunk.forEach((reference) => batch.delete(reference));
    await batch.commit();
  }

  console.log(`[Firebase seed] ${collection}: eliminados ${snapshots.length} documentos previos.`);
}

async function seedCollection(
  db: Firestore,
  collection: CmsCollectionKey,
  records: Array<Record<string, unknown>>
): Promise<void> {
  if (!records.length) {
    console.log(`[Firebase seed] ${collection}: sin registros para cargar.`);
    return;
  }

  for (const chunk of chunkArray(records, 400)) {
    const batch = db.batch();
    chunk.forEach((record) => queueSet(batch, db, collection, record as Record<string, unknown>));
    await batch.commit();
  }

  console.log(`[Firebase seed] ${collection}: cargados ${records.length} registros.`);
}

function queueSet(
  batch: WriteBatch,
  db: Firestore,
  collection: CmsCollectionKey,
  record: Record<string, unknown>
): void {
  const id = String(record['id'] ?? '').trim();
  if (!id) {
    throw new Error(`[Firebase seed] La colección ${collection} contiene un registro sin id.`);
  }

  const payload = normalizeForFirestore(omitId(record));
  batch.set(db.collection(collection).doc(id), payload);
}

function omitId(record: Record<string, unknown>): Record<string, unknown> {
  const { id: _id, ...rest } = record;
  return rest;
}

function normalizeForFirestore(value: unknown, key = ''): unknown {
  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeForFirestore(item));
  }

  if (typeof value === 'string' && DATE_FIELDS.has(key)) {
    const { Timestamp } = requireTimestampModule();
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : Timestamp.fromDate(date);
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).map(([entryKey, entryValue]) => [
      entryKey,
      normalizeForFirestore(entryValue, entryKey)
    ]);

    return Object.fromEntries(entries);
  }

  return value;
}

function requireTimestampModule(): { Timestamp: typeof import('firebase-admin/firestore').Timestamp } {
  return requireModule('firebase-admin/firestore') as { Timestamp: typeof import('firebase-admin/firestore').Timestamp };
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
