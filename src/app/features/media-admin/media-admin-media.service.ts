import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  type Firestore,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  type FirebaseStorage,
} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Observable } from 'rxjs';
import { ClientAdminService } from './client-admin.service';
import { normalizePath, isClientFolder } from '../../core/utils/storage-path.util';

export type MediaAdminMediaType = 'image' | 'other';

export interface MediaAdminMediaDoc {
  id: string;
  name: string;
  url: string;
  alt: string;
  folder: string;
  mimeType: string;
  sizeLabel: string;
  storagePath: string;
  mediaType: MediaAdminMediaType;
  active: boolean;
  status: 'published' | 'draft';
  order: number;
  publishedAt: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class MediaAdminMediaService {
  private readonly app = inject(FirebaseApp);
  private readonly firestore: Firestore = getFirestore(this.app);
  private readonly storage: FirebaseStorage = getStorage(this.app);
  private readonly clientAdmin = inject(ClientAdminService);

  readonly media$: Observable<MediaAdminMediaDoc[]> = new Observable<
    MediaAdminMediaDoc[]
  >((subscriber) => {
    const q = query(
      collection(this.firestore, 'media'),
      orderBy('order', 'desc'),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        subscriber.next(
          snapshot.docs.map((record) => ({
            id: record.id,
            ...(record.data() as Omit<MediaAdminMediaDoc, 'id'>),
          })),
        );
      },
      (error) => subscriber.error(error),
    );

    return unsubscribe;
  });

  listByFolder$(folder: string): Observable<MediaAdminMediaDoc[]> {
    const normalized = this.normalizeFolder(folder);
    return new Observable<MediaAdminMediaDoc[]>((subscriber) => {
      const q = query(
        collection(this.firestore, 'media'),
        where('folder', '==', normalized),
        where('deletedAt', '==', null),
        orderBy('order', 'desc'),
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          subscriber.next(
            snapshot.docs.map((record) => ({
              id: record.id,
              ...(record.data() as Omit<MediaAdminMediaDoc, 'id'>),
            })),
          );
        },
        (error) => subscriber.error(error),
      );

      return unsubscribe;
    });
  }

  async uploadImage(
    file: File,
    options?: { alt?: string; folder?: string },
  ): Promise<void> {
    const folder = this.normalizeFolder(options?.folder) || 'media';
    const storagePath = `${folder}/${Date.now()}-${this.sanitizeFileName(file.name)}`;
    const storageRef = ref(this.storage, storagePath);

    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    const nowIso = new Date().toISOString();
    const order = Date.now();

    try {
      await addDoc(collection(this.firestore, 'media'), {
        name: file.name,
        url: downloadUrl,
        alt: String(options?.alt ?? '').trim() || file.name,
        folder,
        mimeType: file.type,
        sizeLabel: this.formatSizeLabel(file.size),
        storagePath,
        mediaType: file.type.startsWith('image/') ? 'image' : 'other',
        active: true,
        status: 'published',
        order,
        publishedAt: nowIso,
        deletedAt: null,
        createdAt: nowIso,
        updatedAt: nowIso,
      } satisfies Omit<MediaAdminMediaDoc, 'id'>);
    } catch (firestoreError) {
      // Rollback: eliminar el archivo de Storage para evitar inconsistencias
      try {
        await deleteObject(storageRef);
      } catch {
        // Rollback fallido — el archivo quedará huérfano en Storage, pero al menos no tenemos registro roto
      }
      throw firestoreError;
    }

    // Detectar cliente y actualizar su información
    await this.updateClientIfImageUploaded(folder, downloadUrl);
  }

  async uploadImageWithId(
    file: File,
    options: {
      id: string;
      alt?: string;
      folder: string;
      storagePath: string;
      name?: string;
      /** Si true, el archivo ya fue subido a Storage externamente — NO lo vuelve a subir */
      alreadyUploaded?: boolean;
    },
  ): Promise<{
    id: string;
    url: string;
    storagePath: string;
    folder: string;
  } | null> {
    const id = String(options?.id ?? '').trim();
    if (!id) return null;

    const folder = this.normalizeFolder(options?.folder) || 'media';
    const storagePath = String(options?.storagePath ?? '').trim();
    if (!storagePath) return null;

    const storageRef = ref(this.storage, storagePath);
    let downloadUrl: string;

    if (options.alreadyUploaded) {
      // El archivo ya está en Storage — solo obtener la URL
      downloadUrl = await getDownloadURL(storageRef);
    } else {
      await uploadBytes(storageRef, file);
      downloadUrl = await getDownloadURL(storageRef);
    }

    const nowIso = new Date().toISOString();
    const order = Date.now();

    try {
      await setDoc(
        doc(this.firestore, 'media', id),
        {
          name: String(options?.name ?? file.name),
          url: downloadUrl,
          alt: String(options?.alt ?? '').trim() || file.name,
          folder,
          mimeType: file.type,
          sizeLabel: this.formatSizeLabel(file.size),
          storagePath,
          mediaType: file.type.startsWith('image/') ? 'image' : 'other',
          active: true,
          status: 'published',
          order,
          publishedAt: nowIso,
          deletedAt: null,
          createdAt: nowIso,
          updatedAt: nowIso,
        } satisfies Omit<MediaAdminMediaDoc, 'id'>,
        { merge: true },
      );
    } catch (firestoreError) {
      // Rollback solo si fuimos nosotros quien subió el archivo
      if (!options.alreadyUploaded) {
        try {
          await deleteObject(storageRef);
        } catch {
          // Rollback fallido — archivo huérfano en Storage
        }
      }
      throw firestoreError;
    }

    // Detectar cliente y actualizar su información
    await this.updateClientIfImageUploaded(folder, downloadUrl);

    return { id, url: downloadUrl, storagePath, folder };
  }

  async setActive(id: string, active: boolean): Promise<void> {
    const trimmed = String(id ?? '').trim();
    if (!trimmed) return;

    const nowIso = new Date().toISOString();
    await updateDoc(doc(this.firestore, 'media', trimmed), {
      active,
      updatedAt: nowIso,
      deletedAt: active ? null : nowIso,
    });
  }

  /**
   * Guarda el registro de un archivo en Firestore sin volver a subirlo a Storage.
   * Úsalo cuando el archivo ya fue subido externamente y solo necesitas registrar los metadatos.
   */
  async saveMediaRecord(options: {
    id: string;
    url: string;
    storagePath: string;
    folder: string;
    name: string;
    mimeType: string;
    sizeBytes: number;
    alt?: string;
  }): Promise<void> {
    const id = String(options?.id ?? '').trim();
    if (!id) return;

    const folder = this.normalizeFolder(options?.folder) || 'media';
    const storagePath = String(options?.storagePath ?? '').trim();
    if (!storagePath) return;

    const nowIso = new Date().toISOString();
    const order = Date.now();

    await setDoc(
      doc(this.firestore, 'media', id),
      {
        name: String(options.name ?? ''),
        url: String(options.url ?? ''),
        alt: String(options?.alt ?? '').trim() || options.name,
        folder,
        mimeType: String(options.mimeType ?? ''),
        sizeLabel: this.formatSizeLabel(Number(options.sizeBytes ?? 0)),
        storagePath,
        mediaType: String(options.mimeType ?? '').startsWith('image/')
          ? ('image' as MediaAdminMediaType)
          : ('other' as MediaAdminMediaType),
        active: true,
        status: 'published' as const,
        order,
        publishedAt: nowIso,
        deletedAt: null,
        createdAt: nowIso,
        updatedAt: nowIso,
      } satisfies Omit<MediaAdminMediaDoc, 'id'>,
      { merge: true },
    );

    // Detectar cliente y actualizar su información
    await this.updateClientIfImageUploaded(folder, options.url);
  }

  async updateAlt(id: string, alt: string): Promise<void> {
    const trimmed = String(id ?? '').trim();
    if (!trimmed) return;

    await updateDoc(doc(this.firestore, 'media', trimmed), {
      alt: String(alt ?? '').trim(),
      updatedAt: new Date().toISOString(),
    });
  }

  async softDelete(
    asset: Pick<MediaAdminMediaDoc, 'id' | 'storagePath'>,
  ): Promise<void> {
    const id = String(asset.id ?? '').trim();
    if (!id) return;

    const storagePath = String(asset.storagePath ?? '').trim();
    if (storagePath) {
      try {
        await deleteObject(ref(this.storage, storagePath));
      } catch {
        // Si las reglas de Storage no permiten borrar, igual marcamos como eliminado en Firestore.
      }
    }

    const nowIso = new Date().toISOString();
    await updateDoc(doc(this.firestore, 'media', id), {
      active: false,
      updatedAt: nowIso,
      deletedAt: nowIso,
      status: 'draft',
    });
  }

  /**
   * Detecta si la carpeta pertenece a un cliente y actualiza su información
   * - Incrementa galleryCount
   * - Asigna coverUrl si es la primera imagen
   */
  private async updateClientIfImageUploaded(
    folder: string,
    imageUrl: string
  ): Promise<void> {
    if (!isClientFolder(folder)) return;

    try {
      const client = await this.clientAdmin.getClientByFolder(folder);
      if (!client) return;

      // Incrementar contador de imágenes
      await this.clientAdmin.incrementGalleryCount(client.id);

      // Asignar cover URL si es la primera imagen
      if (!client.coverUrl) {
        await this.clientAdmin.setCoverUrlIfMissing(client.id, imageUrl);
      }
    } catch (error) {
      console.error('Error updating client after image upload:', error);
      // No fallar el upload si hay problema con cliente
    }
  }

  private sanitizeFileName(value: string): string {
    return String(value ?? '')
      .trim()
      .replace(/\\/g, '-')
      .replace(/\//g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9._-]+/g, '')
      .slice(0, 120);
  }

  private normalizeFolder(value?: string): string {
    const normalized = String(value ?? '')
      .trim()
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9/_-]+/g, '');
    return normalized;
  }

  private formatSizeLabel(bytes: number): string {
    const mb = Number(bytes ?? 0) / 1024 / 1024;
    return `${mb.toFixed(2)} MB`;
  }
}
