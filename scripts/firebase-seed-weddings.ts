import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import type { App, ServiceAccount } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';

type SeedOptions = {
  dryRun: boolean;
  reset: boolean;
  only: string[] | null;
};

type ServiceAccountLike = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

type WeddingSeedRecord = {
  slug: string;
  theme: string;
  names: string;
  date: string;
  rsvpUrl?: string;
  rsvpDeadline?: string;
  location: {
    name: string;
    mapsUrl: string;
  };
  dressCode: {
    description: string;
    womenNote?: string;
    reservedColors?: string[];
  };
  pinterestUrl: string;
  giftNote: string;
  exclusiveNote: string;
};

type GuestSeedRecord = {
  slug: string;
  name: string;
  allowedGuests: number;
  customMessage: string;
  childrenCount?: number;
  sourceFile: string;
};

type LegacyGuestRecord = {
  slug?: string;
  name?: string;
  allowedGuests?: number;
  customMessage?: string;
  childrenCount?: number;
};

type GroupGuestRecord = {
  id_grupo: number;
  grupo: string;
  tipo: string;
  invitados: Array<{
    nombre: string;
    parentesco: string;
    adultos: number;
    ninos: number;
    total: number;
  }>;
};

const requireModule = createRequire(import.meta.url);
const GUEST_FILE_BY_WEDDING_SLUG: Record<string, string> = {
  'maria-nicolas': 'invitados_boda_MyD'
};
const DEFAULT_GUEST_MESSAGE = 'Nos encantaría que nos acompañes en este viaje.';
const commonSecondNames = new Set([
  'maria',
  'jose',
  'juan',
  'ana',
  'luis',
  'carlos',
  'andres',
  'fernando',
  'eduardo',
  'felipe',
  'johana',
  'javier',
  'sebastian',
  'camilo',
  'daniel',
  'nicolas',
  'sofia',
  'natalia',
  'marcela',
  'alejandra'
]);

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const weddings = loadWeddings(options.only);
  const plans = weddings.map((wedding) => ({
    wedding,
    guests: loadGuestsForWedding(wedding.slug)
  }));

  console.table(
    plans.map((plan) => ({
      wedding: plan.wedding.slug,
      guests: plan.guests.length,
      theme: plan.wedding.theme
    }))
  );

  if (options.dryRun) {
    console.log(`[Firebase weddings] Dry run completado. Bodas: ${plans.map((plan) => plan.wedding.slug).join(', ')}`);
    return;
  }

  const { db, projectId } = await initializeFirebaseApp();

  for (const plan of plans) {
    if (options.reset) {
      await resetWedding(db, plan.wedding.slug);
    }

    await seedWedding(db, plan.wedding);
    await seedGuests(db, plan.wedding.slug, plan.guests);
  }

  console.log(
    `[Firebase weddings] Carga completada en ${projectId ?? 'proyecto-desconocido'} para: ${plans.map((plan) => plan.wedding.slug).join(', ')}`
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
        .map((value) => slugify(value))
        .filter(Boolean)
    : null;

  return {
    dryRun: args.includes('--dry-run'),
    reset: args.includes('--reset'),
    only
  };
}

function printHelp(): void {
  console.log(`
Uso:
  npm run firebase:seed:weddings:dry-run
  npm run firebase:seed:weddings
  npm run firebase:seed:weddings:reset
  npm run firebase:seed:weddings -- --only=maria-nicolas

Credenciales soportadas:
  GOOGLE_APPLICATION_CREDENTIALS
  FIREBASE_SERVICE_ACCOUNT_PATH
  FIREBASE_SERVICE_ACCOUNT_JSON
  FIREBASE_SERVICE_ACCOUNT_JSON_BASE64
`);
}

function loadWeddings(only: string[] | null): WeddingSeedRecord[] {
  const weddings = readJsonFile<WeddingSeedRecord[]>('src/assets/data/weddings.json')
    .filter((item) => !!String(item.slug ?? '').trim())
    .map((item) => ({ ...item, slug: slugify(item.slug) }));

  return only?.length ? weddings.filter((item) => only.includes(item.slug)) : weddings;
}

function loadGuestsForWedding(weddingSlug: string): GuestSeedRecord[] {
  const fileBaseName = GUEST_FILE_BY_WEDDING_SLUG[weddingSlug] ?? weddingSlug;
  const filePath = resolve(`src/assets/data/guests/${fileBaseName}.json`);

  if (!existsSync(filePath)) {
    return [];
  }

  const payload = JSON.parse(readFileSync(filePath, 'utf8')) as unknown;
  return normalizeGuestsPayload(payload, fileBaseName);
}

function normalizeGuestsPayload(payload: unknown, sourceFile: string): GuestSeedRecord[] {
  if (!Array.isArray(payload) || !payload.length) {
    return [];
  }

  const first = payload[0] as Record<string, unknown> | null;
  if (!first || typeof first !== 'object') {
    return [];
  }

  if ('slug' in first && 'name' in first) {
    return (payload as LegacyGuestRecord[])
      .map((guest) => {
        const name = String(guest.name ?? '').trim();
        const slug = slugify(String(guest.slug ?? '') || name);
        if (!slug || !name) {
          return null;
        }

        return {
          slug,
          name,
          allowedGuests: Math.max(1, Number(guest.allowedGuests ?? 0) || 1),
          customMessage: String(guest.customMessage ?? '').trim() || DEFAULT_GUEST_MESSAGE,
          childrenCount:
            typeof guest.childrenCount === 'number' && guest.childrenCount > 0
              ? guest.childrenCount
              : undefined,
          sourceFile
        };
      })
      .filter((item): item is GuestSeedRecord => !!item);
  }

  if ('id_grupo' in first && 'invitados' in first) {
    return normalizeGroupedGuests(payload as GroupGuestRecord[], sourceFile);
  }

  return [];
}

function normalizeGroupedGuests(groups: GroupGuestRecord[], sourceFile: string): GuestSeedRecord[] {
  const items: GuestSeedRecord[] = [];

  groups.forEach((group) => {
    const memberInfo = (Array.isArray(group.invitados) ? group.invitados : [])
      .map((guest) => {
        const rawName = String(guest.nombre ?? '').trim();
        if (!rawName) {
          return null;
        }

        const childrenCount = Math.max(0, Number(guest.ninos ?? 0) || 0);
        const adults = Math.max(0, Number(guest.adultos ?? 0) || 0);
        const total = Math.max(1, Number(guest.total ?? 0) || adults + childrenCount || 1);
        const slug = slugify(normalizeShortName(rawName) || rawName);

        return { rawName, slug, childrenCount, total };
      })
      .filter((item): item is NonNullable<typeof item> => !!item);

    if (!memberInfo.length) {
      return;
    }

    const memberNames = memberInfo.map((member) => member.rawName);
    const totalChildren = memberInfo.reduce((sum, member) => sum + member.childrenCount, 0);
    const totalAllowedGuests = memberInfo.reduce((sum, member) => sum + member.total, 0);
    const childrenSuffix = totalChildren === 1 ? ' e hijo' : totalChildren > 1 ? ' e hijos' : '';
    const baseName = childrenSuffix ? joinNamesForChildrenSuffix(memberNames) : joinNames(memberNames);
    const displayName = `${baseName}${childrenSuffix}`;

    memberInfo.forEach((member) => {
      items.push({
        slug: member.slug,
        name: displayName,
        allowedGuests: Math.max(1, totalAllowedGuests),
        customMessage: DEFAULT_GUEST_MESSAGE,
        childrenCount: totalChildren || undefined,
        sourceFile
      });
    });
  });

  return dedupeGuests(items);
}

function dedupeGuests(items: GuestSeedRecord[]): GuestSeedRecord[] {
  const bySlug = new Map<string, GuestSeedRecord>();

  items.forEach((item) => {
    const current = bySlug.get(item.slug);
    if (!current || item.allowedGuests >= current.allowedGuests) {
      bySlug.set(item.slug, item);
    }
  });

  return [...bySlug.values()];
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
    throw new Error(`[Firebase weddings] No existe el archivo de credenciales: ${resolvedPath}`);
  }

  return JSON.parse(readFileSync(resolvedPath, 'utf8')) as ServiceAccountLike;
}

async function resetWedding(db: Firestore, weddingSlug: string): Promise<void> {
  const weddingDoc = db.collection('weddings').doc(weddingSlug);
  const guests = await weddingDoc.collection('guests').listDocuments();

  for (const chunk of chunkArray(guests, 400)) {
    const batch = db.batch();
    chunk.forEach((reference) => batch.delete(reference));
    await batch.commit();
  }

  await weddingDoc.delete().catch(() => undefined);
  console.log(`[Firebase weddings] ${weddingSlug}: limpiado documento y subcolección guests.`);
}

async function seedWedding(db: Firestore, wedding: WeddingSeedRecord): Promise<void> {
  await db.collection('weddings').doc(wedding.slug).set(sanitizeForFirestore(wedding));
  console.log(`[Firebase weddings] ${wedding.slug}: boda cargada.`);
}

async function seedGuests(db: Firestore, weddingSlug: string, guests: GuestSeedRecord[]): Promise<void> {
  if (!guests.length) {
    console.log(`[Firebase weddings] ${weddingSlug}: sin invitados para cargar.`);
    return;
  }

  for (const chunk of chunkArray(guests, 400)) {
    const batch = db.batch();

    chunk.forEach((guest) => {
      const { slug, ...payload } = guest;
      batch.set(
        db.collection('weddings').doc(weddingSlug).collection('guests').doc(slug),
        sanitizeForFirestore({ slug, ...payload })
      );
    });

    await batch.commit();
  }

  console.log(`[Firebase weddings] ${weddingSlug}: cargados ${guests.length} invitados.`);
}

function readJsonFile<T>(relativePath: string): T {
  const absolutePath = resolve(relativePath);
  return JSON.parse(readFileSync(absolutePath, 'utf8')) as T;
}

function sanitizeForFirestore<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForFirestore(item)) as T;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, entryValue]) => entryValue !== undefined)
      .map(([entryKey, entryValue]) => [entryKey, sanitizeForFirestore(entryValue)]);

    return Object.fromEntries(entries) as T;
  }

  return value;
}

function slugify(value: string): string {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return normalized
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeShortName(value: string): string {
  const cleaned = String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ');
  if (!cleaned) {
    return '';
  }

  const parts = cleaned.split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0] ?? '';
  if (parts.length === 2) return `${parts[0]} ${parts[1]}`;

  if (parts.length === 3) {
    const second = parts[1]?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') ?? '';
    const lastName = commonSecondNames.has(second) ? parts[2] : parts[1];
    return `${parts[0]} ${lastName}`;
  }

  return `${parts[0]} ${parts[parts.length - 2]}`;
}

function joinNames(names: string[]): string {
  const clean = names.map((item) => String(item ?? '').trim()).filter(Boolean);
  if (clean.length === 0) return '';
  if (clean.length === 1) return clean[0] ?? '';
  if (clean.length === 2) return `${clean[0]} & ${clean[1]}`;
  return `${clean.slice(0, -1).join(', ')} & ${clean.at(-1)}`;
}

function joinNamesForChildrenSuffix(names: string[]): string {
  return names.map((item) => String(item ?? '').trim()).filter(Boolean).join(', ');
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

requireModule('firebase-admin/firestore');

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
