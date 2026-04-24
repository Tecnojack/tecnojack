/** Tipos de servicio para clientes */
export type ClientService = 'bodas' | 'prebodas' | 'quinces' | 'grados';

/** Tipos de entidad según servicio */
export type ClientType = 'cliente' | 'estudiante';

/**
 * Modelo de Cliente/Estudiante para portfolio
 * Se guarda en Firestore colección "clients"
 */
export interface Client {
  /** ID único del cliente (generado por Firestore) */
  id: string;

  /** Nombre completo del cliente/estudiante */
  name: string;

  /** Slug generado del nombre para URLs (juan-pablo-gomez) */
  slug: string;

  /** Tipo de servicio */
  service: ClientService;

  /** Etiqueta de servicio para UI pública */
  serviceLabel?: 'BODA' | 'PREBODA' | 'QUINCE' | 'GRADO';

  /** Categoría semántica para rutas públicas */
  category?: string;

  /** Tipo de entidad (cliente o estudiante) - derivado del service */
  type: ClientType;

  /** Fecha del evento/graduación (ISO 8601) */
  eventDate?: string;

  /** Ubicación del evento */
  location?: string;

  /** SOLO PARA GRADOS: Institución educativa */
  institution?: string;

  /** SOLO PARA GRADOS: Carrera/Programa */
  career?: string;

  /** SOLO PARA GRADOS: Año de graduación */
  graduationYear?: string;

  /** Ruta en Storage donde se guardan imágenes del cliente */
  folder: string;

  /** URL de imagen de portada (primera imagen subida) */
  coverUrl?: string;

  /** Cantidad de imágenes en la galería */
  galleryCount: number;

  /** Estado de publicación */
  status: 'published' | 'draft';

  /** Fecha de creación (ISO 8601) */
  createdAt: string;

  /** Fecha de última actualización (ISO 8601) */
  updatedAt: string;
}

/**
 * Datos para crear/actualizar un cliente (sin id, timestamps, ni derived fields)
 */
export interface ClientInput {
  name: string;
  service: ClientService;
  eventDate?: string;
  location?: string;
  institution?: string;
  career?: string;
  graduationYear?: string;
  status?: 'published' | 'draft';
}

/**
 * Resultado de crear cliente (con folder y urls generadas)
 */
export interface ClientCreated extends Client {
  folder: string;
}
