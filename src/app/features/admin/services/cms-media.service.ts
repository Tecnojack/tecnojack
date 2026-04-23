import { Injectable, inject } from '@angular/core';
import { MockCmsStoreService } from './mock-cms-store.service';

@Injectable({ providedIn: 'root' })
export class CmsMediaService {
  readonly fallbackUrl = 'assets/images/placeholders/default-media.svg';

  private readonly store = inject(MockCmsStoreService);

  resolveUrl(mediaId?: string | null, withFallback = true): string {
    if (!mediaId) {
      return withFallback ? this.fallbackUrl : '';
    }

    const resolved = this.store.getSnapshot().media.find((item) => item.id === mediaId)?.url ?? '';
    return resolved || (withFallback ? this.fallbackUrl : '');
  }

  resolveUrls(mediaIds: string[] | undefined | null, withFallback = true): string[] {
    return Array.isArray(mediaIds)
      ? mediaIds.map((mediaId) => this.resolveUrl(mediaId, withFallback)).filter(Boolean)
      : [];
  }

  ensureUrl(url?: string | null): string {
    const normalized = String(url ?? '').trim();
    return normalized || this.fallbackUrl;
  }
}
