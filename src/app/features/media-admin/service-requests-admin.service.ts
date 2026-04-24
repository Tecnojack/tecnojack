import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  orderBy,
  query,
  onSnapshot,
  type Firestore,
} from 'firebase/firestore';
import { Observable } from 'rxjs';

import {
  ServiceRequestDocument,
  ServiceRequestStatus,
} from '../../services/service-request.service';

export type ServiceRequestViewModel = ServiceRequestDocument & {
  effectiveDate: string;
};

@Injectable({ providedIn: 'root' })
export class ServiceRequestsAdminService {
  private readonly app = inject(FirebaseApp);
  private readonly firestore: Firestore = getFirestore(this.app);

  readonly requests$: Observable<ServiceRequestDocument[]> = new Observable((subscriber) => {
    const q = query(
      collection(this.firestore, 'service_requests'),
      orderBy('createdAt', 'desc'),
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) =>
        subscriber.next(
          snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceRequestDocument)),
        ),
      (error) => {
        console.error('[ServiceRequestsAdmin] Firestore error', error);
        subscriber.next([]);
      },
    );
    return unsubscribe;
  });

  async updateStatus(id: string, status: ServiceRequestStatus): Promise<void> {
    const requestRef = doc(this.firestore, 'service_requests', id);
    await updateDoc(requestRef, {
      status,
      updatedAt: new Date().toISOString(),
    });
  }
}
