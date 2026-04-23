import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Firestore
} from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface MediaAdminCmsServiceDoc {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  order: number;
}

export interface MediaAdminCmsPackageDoc {
  id: string;
  name: string;
  mediaId: string;
  serviceIds: string[];
  active: boolean;
  order: number;
}

@Injectable({ providedIn: 'root' })
export class MediaAdminCmsService {
  private readonly app = inject(FirebaseApp);
  private readonly firestore: Firestore = getFirestore(this.app);

  readonly services$: Observable<MediaAdminCmsServiceDoc[]> = new Observable<MediaAdminCmsServiceDoc[]>((subscriber) => {
    const q = query(collection(this.firestore, 'services'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const services = snapshot.docs
          .map((record) => {
            const data = record.data() as Record<string, unknown>;
            return {
              id: record.id,
              name: String(data['name'] ?? ''),
              slug: String(data['slug'] ?? ''),
              active: Boolean(data['active'] ?? true),
              order: Number(data['order'] ?? 0)
            } satisfies MediaAdminCmsServiceDoc;
          })
          .filter((item) => item.slug);

        services.sort((a, b) => (b.order ?? 0) - (a.order ?? 0) || a.name.localeCompare(b.name));
        subscriber.next(services);
      },
      (error) => subscriber.error(error)
    );

    return unsubscribe;
  });

  packagesByServiceId$(serviceId: string): Observable<MediaAdminCmsPackageDoc[]> {
    const trimmed = String(serviceId ?? '').trim();
    if (!trimmed) {
      return new Observable<MediaAdminCmsPackageDoc[]>((subscriber) => {
        subscriber.next([]);
        subscriber.complete();
      });
    }

    return new Observable<MediaAdminCmsPackageDoc[]>((subscriber) => {
      const q = query(collection(this.firestore, 'packages'), where('serviceIds', 'array-contains', trimmed));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const packages = snapshot.docs
            .map((record) => {
              const data = record.data() as Record<string, unknown>;
              return {
                id: record.id,
                name: String(data['name'] ?? ''),
                mediaId: String(data['mediaId'] ?? ''),
                serviceIds: Array.isArray(data['serviceIds']) ? data['serviceIds'].map((v) => String(v)) : [],
                active: Boolean(data['active'] ?? true),
                order: Number(data['order'] ?? 0)
              } satisfies MediaAdminCmsPackageDoc;
            })
            .filter((item) => item.name);

          packages.sort((a, b) => (b.order ?? 0) - (a.order ?? 0) || a.name.localeCompare(b.name));
          subscriber.next(packages);
        },
        (error) => subscriber.error(error)
      );

      return unsubscribe;
    });
  }

  async setPackageMediaId(packageId: string, mediaId: string): Promise<void> {
    const pkgId = String(packageId ?? '').trim();
    if (!pkgId) return;

    await updateDoc(doc(this.firestore, 'packages', pkgId), {
      mediaId: String(mediaId ?? '').trim(),
      updatedAt: serverTimestamp()
    });
  }
}
