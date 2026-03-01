import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Wedding } from '../models/wedding.model';

@Injectable({ providedIn: 'root' })
export class WeddingService {
  private readonly http = inject(HttpClient);
  private readonly weddings$ = this.http
    .get<Wedding[]>('assets/data/weddings.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  getWeddingBySlug(slug: string): Observable<Wedding | null> {
    const normalized = slug.trim().toLowerCase();
    return this.weddings$.pipe(
      map((items) => items.find((w) => w.slug.toLowerCase() === normalized) ?? null)
    );
  }
}
