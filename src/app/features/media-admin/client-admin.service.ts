import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  type Firestore,
  writeBatch,
  serverTimestamp,
  deleteDoc,
  QueryConstraint,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
  type FirebaseStorage,
} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Client, ClientInput, ClientService, ClientCreated } from '../../core/models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientAdminService {
  private readonly app = inject(FirebaseApp);
  private readonly firestore: Firestore = getFirestore(this.app);
  private readonly storage: FirebaseStorage = getStorage(this.app);

  private readonly clientsSubject = new BehaviorSubject<Client[]>([]);
  readonly clients$ = this.clientsSubject.asObservable();

  constructor() {
    this.watchAllClients();
  }

  /** Observa TODOS los clientes (admin) */
  private watchAllClients(): void {
    const q = query(
      collection(this.firestore, 'clients'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const clients = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Client, 'id'>),
        }));
        this.clientsSubject.next(clients);
      },
      (error) => console.error('Error watching clients:', error)
    );
  }

  /** Clientes filtrados por servicio */
  listByService$(service: ClientService): Observable<Client[]> {
    return this.clients$.pipe(
      map((clients) => clients.filter((c) => c.service === service))
    );
  }

  /** Clientes publicados (para portal público) */
  listPublished$(service?: ClientService): Observable<Client[]> {
    return this.clients$.pipe(
      map((clients) =>
        clients.filter(
          (c) =>
            c.status === 'published' && (!service || c.service === service)
        )
      )
    );
  }

  /**
   * Genera slug a partir de nombre
   * "Juan Pablo Gómez" → "juan-pablo-gomez"
   */
  private generateSlug(name: string): string {
    return String(name ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/\s+/g, '-') // Espacios a guiones
      .replace(/[^a-z0-9-]/g, '') // Solo alfanuméricos y guiones
      .replace(/--+/g, '-') // Guiones múltiples a uno
      .replace(/^-+|-+$/g, ''); // Remover guiones al inicio/final
  }

  /**
   * Garantiza unicidad del slug dentro del mismo servicio.
   * Si "juan-pablo" ya existe, intenta "juan-pablo-2", "juan-pablo-3", etc.
   */
  private async ensureUniqueSlug(
    baseSlug: string,
    service: ClientService
  ): Promise<string> {
    const existing = this.clientsSubject.value;
    const inService = existing.filter((c) => c.service === service);
    const slugsInService = new Set(inService.map((c) => c.slug));

    if (!slugsInService.has(baseSlug)) return baseSlug;

    let counter = 2;
    while (slugsInService.has(`${baseSlug}-${counter}`)) {
      counter++;
    }
    return `${baseSlug}-${counter}`;
  }

  /**
   * Construye la ruta en Storage según servicio
   */
  private buildStorageFolder(slug: string, service: ClientService): string {
    switch (service) {
      case 'bodas':
        return `servicios/bodas/clientes/${slug}`;
      case 'prebodas':
        return `servicios/prebodas/clientes/${slug}`;
      case 'quinces':
        return `servicios/quinces/clientes/${slug}`;
      case 'grados':
        return `servicios/grados/clientes/${slug}`;
      default:
        return `servicios/${service}/clientes/${slug}`;
    }
  }

  /**
   * Crea un archivo .keep en Storage para establecer la carpeta
   */
  private async createStorageFolder(folderPath: string): Promise<void> {
    try {
      const keepRef = ref(this.storage, `${folderPath}/.keep`);
      await uploadBytes(keepRef, new Blob([''], { type: 'text/plain' }));
    } catch (error) {
      console.error(`Error creating storage folder ${folderPath}:`, error);
      // No fallar si no se puede crear .keep, seguir adelante
    }
  }

  /**
   * Crea un nuevo cliente y su carpeta en Storage
   */
  async createClient(input: ClientInput): Promise<ClientCreated> {
    const baseSlug = this.generateSlug(input.name);
    const slug = await this.ensureUniqueSlug(baseSlug, input.service);
    const folder = this.buildStorageFolder(slug, input.service);

    // Crear carpeta en Storage
    await this.createStorageFolder(folder);

    // Crear documento en Firestore
    const clientDocRef = doc(collection(this.firestore, 'clients'));
    const now = new Date().toISOString();

    const clientData: Omit<Client, 'id'> = {
      name: input.name,
      slug,
      service: input.service,
      type: input.service === 'grados' ? 'estudiante' : 'cliente',
      eventDate: input.eventDate,
      location: input.location,
      institution: input.institution,
      career: input.career,
      graduationYear: input.graduationYear,
      folder,
      galleryCount: 0,
      status: input.status || 'draft',
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(clientDocRef, clientData);

    return {
      id: clientDocRef.id,
      ...clientData,
      folder,
    };
  }

  /**
   * Actualiza datos de un cliente
   */
  async updateClient(
    clientId: string,
    updates: Partial<ClientInput>
  ): Promise<void> {
    const now = new Date().toISOString();

    const updateData: Partial<ClientInput> & { updatedAt: string } = {
      ...updates,
      updatedAt: now,
    };

    await updateDoc(doc(this.firestore, 'clients', clientId), updateData);
  }

  /**
   * Incrementa el contador de imágenes (llamado por MediaAdminService)
   */
  async incrementGalleryCount(clientId: string): Promise<void> {
    const clientDoc = await this.getClientById(clientId);
    if (!clientDoc) return;

    const newCount = (clientDoc.galleryCount || 0) + 1;
    await updateDoc(doc(this.firestore, 'clients', clientId), {
      galleryCount: newCount,
      updatedAt: new Date().toISOString(),
    });
  }

  /**
   * Asigna cover URL si es la primera imagen
   */
  async setCoverUrlIfMissing(clientId: string, imageUrl: string): Promise<void> {
    const clientDoc = await this.getClientById(clientId);
    if (!clientDoc || clientDoc.coverUrl) return;

    await updateDoc(doc(this.firestore, 'clients', clientId), {
      coverUrl: imageUrl,
      updatedAt: new Date().toISOString(),
    });
  }

  /**
   * Obtiene un cliente por ID
   */
  async getClientById(clientId: string): Promise<Client | null> {
    try {
      const clients = this.clientsSubject.value;
      return clients.find((c) => c.id === clientId) || null;
    } catch (error) {
      console.error('Error getting client:', error);
      return null;
    }
  }

  /**
   * Obtiene un cliente por slug y servicio
   */
  async getClientBySlug(
    slug: string,
    service: ClientService
  ): Promise<Client | null> {
    try {
      const clients = this.clientsSubject.value;
      return (
        clients.find(
          (c) => c.slug === slug && c.service === service
        ) || null
      );
    } catch (error) {
      console.error('Error getting client by slug:', error);
      return null;
    }
  }

  /**
   * Obtiene cliente por carpeta de Storage
   * Útil cuando se sube imagen para detectar cliente
   */
  async getClientByFolder(folder: string): Promise<Client | null> {
    try {
      const clients = this.clientsSubject.value;
      return clients.find((c) => c.folder === folder) || null;
    } catch (error) {
      console.error('Error getting client by folder:', error);
      return null;
    }
  }

  /**
   * Elimina un cliente, sus imágenes en Firestore y todos los archivos en Storage
   */
  async deleteClient(clientId: string): Promise<void> {
    const client = await this.getClientById(clientId);
    if (!client) return;

    // 0) Eliminar registros de media asociados a la carpeta del cliente
    if (client.folder) {
      await this.deleteMediaDocsByFolder(client.folder);
    }

    // 1) Limpiar archivos de Storage recursivamente
    if (client.folder) {
      await this.deleteStorageFolder(client.folder);
    }

    // 2) Eliminar cliente en Firestore
    const batch = writeBatch(this.firestore);
    batch.delete(doc(this.firestore, 'clients', clientId));
    await batch.commit();
  }

  /**
   * Borra documentos en colección media vinculados a una carpeta específica
   */
  private async deleteMediaDocsByFolder(folder: string): Promise<void> {
    const folderQuery = query(
      collection(this.firestore, 'media'),
      where('folder', '==', folder)
    );
    const snap = await getDocs(folderQuery);

    if (snap.empty) {
      return;
    }

    const batch = writeBatch(this.firestore);
    snap.docs.forEach((record: { id: string }) => {
      batch.delete(doc(this.firestore, 'media', record.id));
    });
    await batch.commit();
  }

  /**
   * Borra recursivamente todos los archivos de una carpeta de Storage
   */
  private async deleteStorageFolder(folder: string): Promise<void> {
    try {
      const folderRef = ref(this.storage, folder);
      const { items, prefixes } = await listAll(folderRef);

      const deleteItems = items.map((itemRef) =>
        deleteObject(itemRef).catch(() => {
          // Ignorar errores individuales (p.ej. ya eliminado)
        })
      );
      const deleteSubfolders = prefixes.map((prefix) =>
        this.deleteStorageFolder(prefix.fullPath)
      );

      await Promise.all([...deleteItems, ...deleteSubfolders]);
    } catch {
      // Si la carpeta no existe o sin permisos, continuar de todos modos
    }
  }

  /**
   * Cambia estado de publicación
   */
  async togglePublished(clientId: string, published: boolean): Promise<void> {
    await updateDoc(doc(this.firestore, 'clients', clientId), {
      status: published ? 'published' : 'draft',
      updatedAt: new Date().toISOString(),
    });
  }
}
