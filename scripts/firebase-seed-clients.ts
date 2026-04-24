import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { App, ServiceAccount } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';
import type { Bucket } from '@google-cloud/storage';

type ClientService = 'bodas' | 'prebodas' | 'quinces' | 'grados';
type ClientStatus = 'draft' | 'published';

type SeedOptions = {
  dryRun: boolean;
  onlyServices: ClientService[] | null;
};

type ServiceAccountLike = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

type InitialClient = {
  name: string;
  location: string;
  date: string;
};

type ClientInput = {
  name: string;
  service: ClientService;
  location: string;
  eventDate: string;
};

type ClientSeedDocument = {
  name: string;
  slug: string;
  service: ClientService;
  serviceLabel: 'BODA' | 'PREBODA' | 'QUINCE' | 'GRADO';
  category: string;
  location: string;
  eventDate: string;
  folder: string;
  coverUrl: null;
  galleryCount: number;
  status: ClientStatus;
  createdAt: string;
  updatedAt: string;
};

const INITIAL_CLIENTS_BY_SERVICE: Record<ClientService, InitialClient[]> = {
  bodas: [
    { name: 'Daniel & Daniela', location: 'Medellin, Antioquia', date: '2024-06' },
    { name: 'Yurley & Pablo', location: 'Medellin, Antioquia', date: '2024-11' },
    { name: 'Mery & Diego', location: 'Medellin, Antioquia', date: '2025-06' },
    { name: 'Ruben & Slendy', location: 'Medellin, Antioquia', date: '2025-03' },
    { name: 'Mat & Jack', location: 'Medellin, Antioquia', date: '2025-04' },
    { name: 'Maria & Santi', location: 'Carmen del Viboral, Antioquia', date: '2025-01' },
    { name: 'Andres & Karen', location: 'Sogamoso, Boyaca', date: '2025-03' },
    { name: 'Mai & Ari', location: 'Santa Rosa del Sur, Bolivar', date: '2024-12' }
  ],
  prebodas: [
    { name: 'Sara & Jefferson', location: 'Santa Elena, Antioquia', date: '2025' },
    { name: 'Eliana & Santiago', location: 'Medellin, Antioquia', date: '2024' },
    { name: 'Maira & Ariel', location: 'Medellin, Antioquia', date: '2024' },
    { name: 'Maria & Santi', location: 'Carmen del Viboral, Antioquia', date: '2024' },
    { name: 'Yurley & Pablo', location: 'Medellin, Antioquia', date: '2024' }
  ],
  quinces: [
    { name: 'Maria Jose', location: 'Guarne, Antioquia', date: '2025-08' },
    { name: 'Sofia Colorado', location: 'Sabaneta, Antioquia', date: '2026-03' }
  ],
  grados: [
    { name: 'Maira Romero', location: 'UNAC', date: '2024' },
    { name: 'Kethe Artundiaga', location: 'UNAC', date: '2026' },
    { name: 'Andrea Rojas', location: 'UNAC', date: '2026' },
    { name: 'Jessica Duran', location: 'UNAC', date: '2026' },
    { name: 'Valentina Ruiz', location: 'UNAC', date: '2025' },
    { name: 'Sara Jimenez', location: 'EAFIT', date: '2023' },
    { name: 'Sara Villamizar', location: 'EAFIT', date: '2026' },
    { name: 'Anderson Cuadrado', location: 'UNAC', date: '2025' },
    { name: 'Kelly Moreno', location: 'UdeA', date: '2026' }
  ]
};

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const services = options.onlyServices ?? (Object.keys(INITIAL_CLIENTS_BY_SERVICE) as ClientService[]);

  const rows = services.map((service) => ({
    service,
    total: INITIAL_CLIENTS_BY_SERVICE[service].length
  }));

  console.table(rows);

  const { db, bucket, projectId } = await initializeFirebaseApp();

  let created = 0;
  let existing = 0;

  for (const service of services) {
    for (const entry of INITIAL_CLIENTS_BY_SERVICE[service]) {
      const result = await createClientSeed(
        db,
        bucket,
        {
          name: entry.name,
          service,
          location: entry.location,
          eventDate: entry.date
        },
        options
      );

      if (result === 'created') created += 1;
      if (result === 'exists') existing += 1;
    }
  }

  console.log(
    `[Firebase clients seed] Proyecto: ${projectId ?? 'desconocido'} | creados: ${created} | existentes: ${existing}`
  );
}

function parseArgs(args: string[]): SeedOptions {
  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const onlyArg = args.find((arg) => arg.startsWith('--only='));
  const onlyServices = onlyArg
    ? onlyArg
        .slice('--only='.length)
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean) as ClientService[]
    : null;

  const validServices = new Set<ClientService>(['bodas', 'prebodas', 'quinces', 'grados']);
  const invalid = (onlyServices ?? []).filter((value) => !validServices.has(value));
  if (invalid.length) {
    throw new Error(`[Firebase clients seed] Servicios invalidos en --only: ${invalid.join(', ')}`);
  }

  return {
    dryRun: args.includes('--dry-run'),
    onlyServices
  };
}

function printHelp(): void {
  console.log(`
Uso:
  npm run firebase:seed:clients
  npm run firebase:seed:clients -- --dry-run
  npm run firebase:seed:clients -- --only=bodas,quinces

Credenciales soportadas:
  GOOGLE_APPLICATION_CREDENTIALS
  FIREBASE_SERVICE_ACCOUNT_PATH
  FIREBASE_SERVICE_ACCOUNT_JSON
  FIREBASE_SERVICE_ACCOUNT_JSON_BASE64
`);
}

async function initializeFirebaseApp(): Promise<{ app: App; db: Firestore; bucket: Bucket; projectId?: string }> {
  const { applicationDefault, cert, getApps, initializeApp } = await import('firebase-admin/app');
  const { getFirestore } = await import('firebase-admin/firestore');
  const { getStorage } = await import('firebase-admin/storage');

  const serviceAccount = resolveServiceAccount();
  let app: App;

  if (getApps().length) {
    app = getApps()[0]!;
  } else if (serviceAccount) {
    app = initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
      projectId: process.env['FIREBASE_PROJECT_ID'] || serviceAccount.project_id,
      storageBucket: process.env['FIREBASE_STORAGE_BUCKET'] || 'tecnojack-admin.firebasestorage.app'
    });
  } else {
    app = initializeApp({
      credential: applicationDefault(),
      projectId: process.env['FIREBASE_PROJECT_ID'],
      storageBucket: process.env['FIREBASE_STORAGE_BUCKET'] || 'tecnojack-admin.firebasestorage.app'
    });
  }

  return {
    app,
    db: getFirestore(app),
    bucket: getStorage(app).bucket(),
    projectId: String(app.options.projectId ?? '') || undefined
  };
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

  const envPath =
    process.env['FIREBASE_SERVICE_ACCOUNT_PATH'] || process.env['GOOGLE_APPLICATION_CREDENTIALS'] || '';

  if (envPath.trim()) {
    const resolvedPath = resolve(envPath);
    if (!existsSync(resolvedPath)) {
      throw new Error(`[Firebase clients seed] No existe el archivo de credenciales: ${resolvedPath}`);
    }
    return JSON.parse(readFileSync(resolvedPath, 'utf8')) as ServiceAccountLike;
  }

  const localDefault = resolve('secrets/tecnojack-admin-firebase-adminsdk-fbsvc-748b0cbcb3.json');
  if (existsSync(localDefault)) {
    return JSON.parse(readFileSync(localDefault, 'utf8')) as ServiceAccountLike;
  }

  return null;
}

async function createClientSeed(
  db: Firestore,
  bucket: Bucket,
  clientInput: ClientInput,
  options: SeedOptions
): Promise<'created' | 'exists'> {
  const normalizedInput = normalizeClientInput(clientInput);
  const slug = createSlug(normalizedInput.name);

  const existing = await db
    .collection('clients')
    .where('slug', '==', slug)
    .where('service', '==', normalizedInput.service)
    .limit(1)
    .get();

  const folder = buildStorageFolder(normalizedInput.service, slug);

  if (!existing.empty) {
    if (!options.dryRun) {
      // Garantiza que la carpeta exista en Storage aun si el cliente ya estaba en Firestore.
      await createStorageKeepFile(bucket, folder);
    }
    console.log(`⚠ ya existia: ${normalizedInput.name} (${normalizedInput.service}/${slug})`);
    return 'exists';
  }

  const nowIso = new Date().toISOString();

  const doc: ClientSeedDocument = {
    name: normalizedInput.name,
    slug,
    service: normalizedInput.service,
    serviceLabel: mapServiceLabel(normalizedInput.service),
    category: mapCategory(normalizedInput.service),
    location: normalizedInput.location,
    eventDate: normalizedInput.eventDate,
    folder,
    coverUrl: null,
    galleryCount: 0,
    status: 'draft',
    createdAt: nowIso,
    updatedAt: nowIso
  };

  if (!options.dryRun) {
    await createStorageKeepFile(bucket, folder);
    await db.collection('clients').add(doc);
  }

  console.log(`✔ cliente creado: ${normalizedInput.name} (${normalizedInput.service}/${slug})`);
  return 'created';
}

function normalizeClientInput(input: ClientInput): ClientInput {
  return {
    name: normalizeWhitespace(input.name),
    service: input.service,
    location: normalizeWhitespace(input.location),
    eventDate: normalizeWhitespace(input.eventDate)
  };
}

function normalizeWhitespace(value: string): string {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ');
}

function createSlug(value: string): string {
  const normalized = normalizeWhitespace(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/[-\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return normalized;
}

function buildStorageFolder(service: ClientService, slug: string): string {
  if (service === 'grados') {
    return `servicios/grados/estudiantes/${slug}`;
  }

  return `servicios/${service}/clientes/${slug}`;
}

function mapCategory(service: ClientService): string {
  switch (service) {
    case 'prebodas':
      return 'preboda';
    case 'bodas':
      return 'bodas';
    case 'quinces':
      return 'quinces';
    case 'grados':
      return 'grados';
  }
}

function mapServiceLabel(service: ClientService): 'BODA' | 'PREBODA' | 'QUINCE' | 'GRADO' {
  switch (service) {
    case 'bodas':
      return 'BODA';
    case 'prebodas':
      return 'PREBODA';
    case 'quinces':
      return 'QUINCE';
    case 'grados':
      return 'GRADO';
  }
}

async function createStorageKeepFile(bucket: Bucket, folder: string): Promise<void> {
  const file = bucket.file(`${folder}/.keep`);
  await file.save('', {
    resumable: false,
    contentType: 'text/plain; charset=utf-8',
    metadata: {
      cacheControl: 'no-cache'
    }
  });
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
