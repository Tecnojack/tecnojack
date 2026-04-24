import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  type Firestore,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable, from, map, shareReplay, switchMap } from 'rxjs';
import { Client, ClientService } from '../../../core/models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientPublicService {
  private readonly firestore: Firestore = getFirestore(inject(FirebaseApp));

  private readonly serviceCache = new Map<string, Observable<Client[]>>();
  private readonly slugCache = new Map<string, Observable<Client | null>>();
  private readonly galleryCache = new Map<string, Observable<string[]>>();

  getByService$(service: ClientService): Observable<Client[]> {
    if (this.serviceCache.has(service)) {
      return this.serviceCache.get(service)!;
    }

    const q = query(
      collection(this.firestore, 'clients'),
      where('service', '==', service),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );

    const obs$ = from(getDocs(q)).pipe(
      map((snapshot) =>
        snapshot.docs.map((clientDoc) =>
          this.mapClient({
            id: clientDoc.id,
            ...(clientDoc.data() as Omit<Client, 'id'>),
          }),
        ),
      ),
      shareReplay(1),
    );

    this.serviceCache.set(service, obs$);
    return obs$;
  }

  getByServiceAnyStatus$(service: ClientService): Observable<Client[]> {
    const cacheKey = `${service}::any-status`;
    if (this.serviceCache.has(cacheKey)) {
      return this.serviceCache.get(cacheKey)!;
    }

    const q = query(
      collection(this.firestore, 'clients'),
      where('service', '==', service)
    );

    const obs$ = from(getDocs(q)).pipe(
      map((snapshot) =>
        snapshot.docs
          .map((clientDoc) =>
            this.mapClient({
              id: clientDoc.id,
              ...(clientDoc.data() as Omit<Client, 'id'>),
            }),
          )
          .sort((a, b) =>
            String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? '')),
          ),
      ),
      shareReplay(1),
    );

    this.serviceCache.set(cacheKey, obs$);
    return obs$;
  }

  getBySlug$(slug: string, service: ClientService): Observable<Client | null> {
    const cacheKey = `${service}::${slug}`;
    if (this.slugCache.has(cacheKey)) {
      return this.slugCache.get(cacheKey)!;
    }

    const q = query(
      collection(this.firestore, 'clients'),
      where('slug', '==', slug),
      where('service', '==', service),
      where('status', '==', 'published'),
      limit(1)
    );

    const obs$ = from(getDocs(q)).pipe(
      map((snapshot) => {
        if (snapshot.empty) {
          return null;
        }

        const first = snapshot.docs[0];
        return this.mapClient({
          id: first.id,
          ...(first.data() as Omit<Client, 'id'>),
        });
      }),
      shareReplay(1),
    );

    this.slugCache.set(cacheKey, obs$);
    return obs$;
  }

  getClientGallery$(folder: string): Observable<string[]> {
    const preferredFolder = this.normalizeClientFolder(folder);
    if (this.galleryCache.has(preferredFolder)) {
      return this.galleryCache.get(preferredFolder)!;
    }

    const primaryQuery = query(
      collection(this.firestore, 'media'),
      where('folder', '==', preferredFolder),
      where('status', '==', 'published'),
      where('deletedAt', '==', null),
      orderBy('order', 'desc')
    );

    const obs$ = from(getDocs(primaryQuery)).pipe(
      map((snapshot) =>
        snapshot.docs.map((mediaDoc) => (mediaDoc.data() as { url: string }).url),
      ),
      switchMap((primaryUrls) => {
        if (primaryUrls.length || !this.isGradesClientsFolder(preferredFolder)) {
          return from(Promise.resolve(primaryUrls));
        }

        const legacyFolder = this.toLegacyGradesStudentsFolder(preferredFolder);
        if (!legacyFolder) {
          return from(Promise.resolve(primaryUrls));
        }

        return from(getLegacyGalleryOnce(this.firestore, legacyFolder));
      }),
      shareReplay(1),
    );

    this.galleryCache.set(preferredFolder, obs$);
    return obs$;
  }

  private mapClient(client: Client): Client {
    return {
      ...client,
      folder: this.normalizeClientFolder(client.folder),
    };
  }

  private normalizeClientFolder(folder: string): string {
    const normalized = String(folder ?? '').trim().replace(/\\/g, '/');
    return this.isGradesStudentsFolder(normalized)
      ? normalized.replace('/grados/estudiantes/', '/grados/clientes/')
      : normalized;
  }

  private isGradesStudentsFolder(folder: string): boolean {
    return folder.includes('/grados/estudiantes/');
  }

  private isGradesClientsFolder(folder: string): boolean {
    return folder.includes('/grados/clientes/');
  }

  private toLegacyGradesStudentsFolder(folder: string): string | null {
    if (!this.isGradesClientsFolder(folder)) {
      return null;
    }

    return folder.replace('/grados/clientes/', '/grados/estudiantes/');
  }
}

function getLegacyGalleryOnce(
  firestore: Firestore,
  folder: string,
): Promise<string[]> {
  const legacyQuery = query(
    collection(firestore, 'media'),
    where('folder', '==', folder),
    where('status', '==', 'published'),
    where('deletedAt', '==', null),
    orderBy('order', 'desc'),
  );

  return getDocs(legacyQuery).then((snapshot) =>
    snapshot.docs.map((mediaDoc) => (mediaDoc.data() as { url: string }).url),
  );
}
