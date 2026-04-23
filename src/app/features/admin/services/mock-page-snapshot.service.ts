import { Injectable, inject } from '@angular/core';
import { CmsPageSnapshot } from '../models/cms.models';
import { MockCmsStoreService } from './mock-cms-store.service';

@Injectable({ providedIn: 'root' })
export class MockPageSnapshotService {
  private readonly store = inject(MockCmsStoreService);

  list(): CmsPageSnapshot[] {
    return this.store.getCollectionSnapshot('pageSnapshots');
  }

  getBySlug(slug: string): CmsPageSnapshot | null {
    const normalized = slug.trim().toLowerCase();
    return this.list().find((item) => item.slug.toLowerCase() === normalized) ?? null;
  }

  async ensureSkeleton(pageId: string, slug: string): Promise<CmsPageSnapshot> {
    const existing = this.getBySlug(slug);
    if (existing) {
      return existing;
    }

    return this.store.create('pageSnapshots', {
      name: `Snapshot ${slug}`,
      slug,
      pageId,
      data: {},
      builtAt: null,
      status: 'draft',
      publishedAt: null
    });
  }
}
