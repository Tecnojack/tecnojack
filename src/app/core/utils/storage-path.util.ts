/**
 * Normaliza un path de Storage o carpeta:
 * - quita slashes iniciales/finales
 * - elimina dobles slashes
 * - recorta espacios
 * - pasa a minúsculas
 */
export function normalizePath(value: string): string {
  return String(value ?? '')
    .trim()
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .replace(/\s+/g, '-')
    .replace(/\/\/+/g, '/')
    .toLowerCase();
}

/**
 * Detecta si un path de carpeta pertenece a un cliente/estudiante
 */
export function isClientFolder(folder: string): boolean {
  return folder.includes('/clientes/') || folder.includes('/estudiantes/');
}

/**
 * Devuelve la URL del cover de un cliente, o la imagen fallback.
 */
export function getClientCover(
  coverUrl: string | undefined | null,
  fallback = 'assets/images/placeholders/default-client.jpg'
): string {
  return coverUrl?.trim() ? coverUrl : fallback;
}
