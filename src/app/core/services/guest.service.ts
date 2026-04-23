import { Injectable, inject } from '@angular/core';
import { Firestore as AngularFirestore } from '@angular/fire/firestore';
import { doc, getDoc, type Firestore as FirebaseFirestore } from 'firebase/firestore';
import { Observable, catchError, from, map, of, shareReplay } from 'rxjs';
import { Guest } from '../models/guest.model';

@Injectable({ providedIn: 'root' })
export class GuestService {
  private readonly firestore = inject<FirebaseFirestore>(AngularFirestore);
  private readonly cache = new Map<string, Observable<Guest | null>>();

  private slugify(value: string): string {
    const normalized = (value ?? '')
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

  getGuestBySlug(weddingSlug: string, guestSlug: string): Observable<Guest | null> {
    const normalizedWedding = this.slugify(weddingSlug);
    const normalizedGuest = this.slugify(guestSlug);
    const key = `${normalizedWedding}:${normalizedGuest}`;
    const existing = this.cache.get(key);
    if (existing) {
      return existing;
    }

    const request$ = from(getDoc(doc(this.firestore, 'weddings', normalizedWedding, 'guests', normalizedGuest))).pipe(
      map((snapshot) => {
        if (!snapshot.exists()) {
          return null;
        }

        const data = snapshot.data() as Record<string, unknown>;
        return {
          slug: String(data['slug'] ?? normalizedGuest).trim() || normalizedGuest,
          name: String(data['name'] ?? '').trim(),
          allowedGuests: Math.max(1, Number(data['allowedGuests'] ?? 0) || 1),
          customMessage: String(data['customMessage'] ?? '').trim() || 'Nos encantaría que nos acompañes en este viaje.',
          childrenCount:
            typeof data['childrenCount'] === 'number' && data['childrenCount'] > 0
              ? Number(data['childrenCount'])
              : undefined
        };
      }),
      catchError(() => of(null)),
      shareReplay({ bufferSize: 1, refCount: false })
    );

    this.cache.set(key, request$);
    return request$;
  }
}
