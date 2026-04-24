import { Injectable, inject } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageUploadService {
  private readonly storage = inject(Storage);

  /**
   * Valida si el archivo es una imagen permitida (jpg, png, webp).
   */
  private isValidImage(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    return allowedTypes.includes(file.type);
  }

  /**
   * Normaliza el nombre del archivo: minúsculas y sin espacios.
   */
  private normalizeFileName(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9.-]/g, '');
  }

  /**
   * Sube el cover de un paquete o página.
   * Siempre se guarda como cover.jpg en la ruta especificada.
   */
  async uploadCover(file: File, path: string): Promise<string> {
    if (!this.isValidImage(file)) {
      throw new Error('Tipo de archivo no permitido. Solo jpg, png o webp.');
    }

    const storagePath = `${this.cleanPath(path)}/cover.jpg`;
    const storageRef = ref(this.storage, storagePath);

    // Subir archivo (sobrescribe si existe)
    await uploadBytes(storageRef, file, { contentType: 'image/jpeg' });
    return await getDownloadURL(storageRef);
  }

  /**
   * Sube múltiples imágenes para una galería de clientes.
   * Genera nombres únicos basados en timestamp y random.
   */
  async uploadClientImages(files: File[], path: string): Promise<string[]> {
    const uploadPromises = files.map(async (file) => {
      if (!this.isValidImage(file)) {
        console.warn(`Archivo omitido por tipo no válido: ${file.name}`);
        return null;
      }

      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${timestamp}-${random}.${ext}`;
      
      const storagePath = `${this.cleanPath(path)}/${fileName}`;
      const storageRef = ref(this.storage, storagePath);

      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    });

    const results = await Promise.all(uploadPromises);
    return results.filter((url): url is string => url !== null);
  }

  /**
   * Elimina un archivo en la ruta especificada.
   */
  async deleteFile(path: string): Promise<void> {
    const storageRef = ref(this.storage, this.cleanPath(path));
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      throw error;
    }
  }

  /**
   * Limpia la ruta para evitar barras dobles o espacios.
   */
  private cleanPath(path: string): string {
    return path.trim().replace(/\/+/g, '/').replace(/^\/|\/$/g, '');
  }
}
