import { Injectable, inject } from '@angular/core';
import { Firestore as AngularFirestore } from '@angular/fire/firestore';
import { doc, getDoc, type Firestore as FirebaseFirestore } from 'firebase/firestore';
import { Observable, catchError, from, map, of, shareReplay } from 'rxjs';
import { Wedding } from '../models/wedding.model';

@Injectable({ providedIn: 'root' })
export class WeddingService {
  private readonly firestore = inject<FirebaseFirestore>(AngularFirestore);
  private readonly cache = new Map<string, Observable<Wedding | null>>();

  getWeddingBySlug(slug: string): Observable<Wedding | null> {
    const normalized = this.slugify(slug);
    const existing = this.cache.get(normalized);
    if (existing) {
      return existing;
    }

    const request$ = from(getDoc(doc(this.firestore, 'weddings', normalized))).pipe(
      map((snapshot) => {
        if (!snapshot.exists()) {
          return null;
        }

        return this.mapWedding(normalized, snapshot.data() as Record<string, unknown>);
      }),
      catchError(() => of(null)),
      shareReplay({ bufferSize: 1, refCount: false })
    );

    this.cache.set(normalized, request$);
    return request$;
  }

  private mapWedding(slug: string, data: Record<string, unknown>): Wedding {
    const location = this.asRecord(data['location']);
    const dressCode = this.asRecord(data['dressCode']);

    return {
      slug: String(data['slug'] ?? slug).trim() || slug,
      theme: String(data['theme'] ?? '').trim() || 'travel',
      names: String(data['names'] ?? '').trim(),
      date: String(data['date'] ?? '').trim(),
      rsvpUrl: String(data['rsvpUrl'] ?? '').trim() || undefined,
      rsvpDeadline: String(data['rsvpDeadline'] ?? '').trim() || undefined,
      location: {
        name: String(location['name'] ?? '').trim(),
        mapsUrl: String(location['mapsUrl'] ?? '').trim()
      },
      dressCode: {
        description: String(dressCode['description'] ?? '').trim(),
        womenNote: String(dressCode['womenNote'] ?? '').trim() || undefined,
        reservedColors: this.asStringArray(dressCode['reservedColors'])
      },
      pinterestUrl: String(data['pinterestUrl'] ?? '').trim(),
      giftNote: String(data['giftNote'] ?? '').trim(),
      exclusiveNote: String(data['exclusiveNote'] ?? '').trim()
    };
  }

  private asRecord(value: unknown): Record<string, unknown> {
    return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {};
  }

  private asStringArray(value: unknown): string[] {
    return Array.isArray(value) ? value.map((item) => String(item ?? '').trim()).filter(Boolean) : [];
  }

  private slugify(value: string): string {
    const normalized = String(value ?? '')
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
}
