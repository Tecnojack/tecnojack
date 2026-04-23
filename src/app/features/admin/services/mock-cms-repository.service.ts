import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { cloneAdminCmsSeed } from '../data/admin-cms.seed';
import {
  CmsCollectionKey,
  CmsDatabaseState,
  CmsEntityMap,
  CmsEntityRecord,
  CmsEntityStatus,
  CmsPackage,
  CmsService
} from '../models/cms.models';
import { LocalStorageCmsPersistenceService } from './local-storage-cms-persistence.service';

type EntityRecord = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class MockCmsRepositoryService {
  private readonly persistence = inject(LocalStorageCmsPersistenceService);
  private readonly rawStateSubject = new BehaviorSubject<CmsDatabaseState>(this.loadState());

  readonly rawState$ = this.rawStateSubject.asObservable();
  readonly state$ = this.rawState$.pipe(map((state) => this.stripDeleted(state)));

  selectCollection<K extends CmsCollectionKey>(collection: K): Observable<CmsEntityMap[K][]> {
    return this.state$.pipe(map((state) => state[collection] as CmsEntityMap[K][]));
  }

  selectPublishedCollection<K extends CmsCollectionKey>(collection: K): Observable<CmsEntityMap[K][]> {
    return this.selectCollection(collection).pipe(
      map((items) => items.filter((item) => item.status === 'published' && item.active))
    );
  }

  getRawSnapshot(): CmsDatabaseState {
    return this.rawStateSubject.value;
  }

  getSnapshot(): CmsDatabaseState {
    return this.stripDeleted(this.rawStateSubject.value);
  }

  getRawCollectionSnapshot<K extends CmsCollectionKey>(collection: K): CmsEntityMap[K][] {
    return [...(this.rawStateSubject.value[collection] as CmsEntityMap[K][])];
  }

  getCollectionSnapshot<K extends CmsCollectionKey>(collection: K): CmsEntityMap[K][] {
    return [...(this.getSnapshot()[collection] as CmsEntityMap[K][])];
  }

  create<K extends CmsCollectionKey>(collection: K, payload: Partial<CmsEntityMap[K]>): CmsEntityMap[K] {
    const state = this.getRawSnapshot();
    const currentCollection = this.getRawCollectionSnapshot(collection);
    const now = new Date().toISOString();
    const created = this.prepareEntityForWrite(collection, {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: currentCollection.length + 1,
      createdAt: now,
      updatedAt: now,
      ...payload,
      id: String(payload.id ?? this.generateId(collection, String(payload.name ?? collection))),
      name: String(payload.name ?? 'Nuevo registro')
    } as CmsEntityMap[K], state, null);

    this.commit({
      ...state,
      [collection]: this.sortCollection([...currentCollection, created])
    } as CmsDatabaseState);

    return created;
  }

  update<K extends CmsCollectionKey>(collection: K, id: string, payload: Partial<CmsEntityMap[K]>): void {
    const state = this.getRawSnapshot();
    const currentCollection = this.getRawCollectionSnapshot(collection);
    const current = currentCollection.find((item) => item.id === id);
    if (!current) {
      throw new Error(`No existe el registro ${id} en ${collection}.`);
    }

    const nextEntity = this.prepareEntityForWrite(collection, {
      ...current,
      ...payload,
      id,
      updatedAt: new Date().toISOString()
    } as CmsEntityMap[K], state, id);

    const nextCollection = currentCollection.map((item) => (item.id === id ? nextEntity : item));
    this.commit({
      ...state,
      [collection]: this.sortCollection(nextCollection)
    } as CmsDatabaseState);
  }

  softDelete<K extends CmsCollectionKey>(collection: K, id: string): void {
    const current = this.getRawCollectionSnapshot(collection).find((item) => item.id === id);
    if (!current) {
      return;
    }

    this.update(collection, id, {
      status: 'archived',
      deletedAt: new Date().toISOString(),
      publishedAt: current.status === 'published' ? current.publishedAt ?? new Date().toISOString() : null,
      active: false
    } as Partial<CmsEntityMap[K]>);
  }

  restore<K extends CmsCollectionKey>(collection: K, id: string): void {
    this.update(collection, id, {
      deletedAt: null,
      status: 'draft',
      publishedAt: null,
      active: true
    } as Partial<CmsEntityMap[K]>);
  }

  duplicate<K extends CmsCollectionKey>(collection: K, id: string): CmsEntityMap[K] | undefined {
    const current = this.getRawCollectionSnapshot(collection).find((item) => item.id === id);
    if (!current) {
      return undefined;
    }

    const record = current as unknown as EntityRecord;
    const duplicated = { ...record } as Partial<CmsEntityMap[K]>;
    delete duplicated['id'];
    duplicated['name' as keyof CmsEntityMap[K]] = `${current.name} copia` as CmsEntityMap[K][keyof CmsEntityMap[K]];

    if ('slug' in record) {
      duplicated['slug' as keyof CmsEntityMap[K]] = `${String(record['slug'] ?? '')}-copy` as CmsEntityMap[K][keyof CmsEntityMap[K]];
    }

    duplicated['status' as keyof CmsEntityMap[K]] = 'draft' as CmsEntityMap[K][keyof CmsEntityMap[K]];
    duplicated['publishedAt' as keyof CmsEntityMap[K]] = null as CmsEntityMap[K][keyof CmsEntityMap[K]];
    duplicated['deletedAt' as keyof CmsEntityMap[K]] = null as CmsEntityMap[K][keyof CmsEntityMap[K]];
    duplicated['order' as keyof CmsEntityMap[K]] = (this.getRawCollectionSnapshot(collection).length + 1) as CmsEntityMap[K][keyof CmsEntityMap[K]];

    return this.create(collection, duplicated);
  }

  toggleActive<K extends CmsCollectionKey>(collection: K, id: string): void {
    const current = this.getRawCollectionSnapshot(collection).find((item) => item.id === id);
    if (!current) {
      return;
    }

    this.update(collection, id, { active: !current.active } as Partial<CmsEntityMap[K]>);
  }

  updateStatus<K extends CmsCollectionKey>(collection: K, id: string, status: CmsEntityStatus): void {
    const publishedAt = status === 'published' ? new Date().toISOString() : null;
    this.update(collection, id, {
      status,
      publishedAt,
      active: status !== 'archived'
    } as Partial<CmsEntityMap[K]>);
  }

  publish<K extends CmsCollectionKey>(collection: K, id: string): void {
    this.updateStatus(collection, id, 'published');
  }

  reorder<K extends CmsCollectionKey>(collection: K, orderedIds: string[]): void {
    const state = this.getRawSnapshot();
    const currentCollection = this.getRawCollectionSnapshot(collection);
    const orderedMap = new Map(orderedIds.map((id, index) => [id, index + 1]));
    const nextCollection = currentCollection.map((item) => ({
      ...item,
      order: orderedMap.get(item.id) ?? item.order,
      updatedAt: new Date().toISOString()
    })) as CmsEntityMap[K][];

    this.commit({
      ...state,
      [collection]: this.sortCollection(nextCollection)
    } as CmsDatabaseState);
  }

  reset(): void {
    this.commit(cloneAdminCmsSeed());
  }

  private loadState(): CmsDatabaseState {
    const raw = this.persistence.load();
    return this.normalizeState(raw);
  }

  private normalizeState(raw: unknown): CmsDatabaseState {
    const seed = cloneAdminCmsSeed();
    if (!raw || typeof raw !== 'object') {
      return seed;
    }

    const source = raw as Partial<Record<CmsCollectionKey, unknown>>;
    const media = this.normalizeCollection('media', source.media, seed.media, seed) as CmsDatabaseState['media'];
    const state = {
      generalSettings: this.normalizeCollection('generalSettings', source.generalSettings, seed.generalSettings, { ...seed, media }),
      categories: this.normalizeCollection('categories', source.categories, seed.categories, { ...seed, media }),
      pages: this.normalizeCollection('pages', source.pages, seed.pages, { ...seed, media }),
      pageSnapshots: this.normalizeCollection('pageSnapshots', source.pageSnapshots, seed.pageSnapshots, { ...seed, media }),
      sections: this.normalizeCollection('sections', source.sections, seed.sections, { ...seed, media }),
      sectionsData: this.normalizeCollection('sectionsData', source.sectionsData, seed.sectionsData, { ...seed, media }),
      services: this.normalizeCollection('services', source.services, seed.services, { ...seed, media }),
      additionalServices: this.normalizeCollection('additionalServices', source.additionalServices, seed.additionalServices, { ...seed, media }),
      packages: this.normalizeCollection('packages', source.packages, seed.packages, { ...seed, media }),
      packageFeatures: this.normalizeCollection('packageFeatures', source.packageFeatures, seed.packageFeatures, { ...seed, media }),
      galleryItems: this.normalizeCollection('galleryItems', source.galleryItems, seed.galleryItems, { ...seed, media }),
      stories: this.normalizeCollection('stories', source.stories, seed.stories, { ...seed, media }),
      videoCategories: this.normalizeCollection('videoCategories', source.videoCategories, seed.videoCategories, { ...seed, media }),
      videos: this.normalizeCollection('videos', source.videos, seed.videos, { ...seed, media }),
      media
    } satisfies CmsDatabaseState;

    return state;
  }

  private normalizeCollection<K extends CmsCollectionKey>(
    collection: K,
    rawCollection: unknown,
    fallback: CmsEntityMap[K][],
    seedState: CmsDatabaseState
  ): CmsEntityMap[K][] {
    if (!Array.isArray(rawCollection)) {
      return fallback;
    }

    return rawCollection.map((item, index) => this.normalizeLegacyEntity(collection, item as unknown as EntityRecord, fallback[index], seedState));
  }

  private normalizeLegacyEntity<K extends CmsCollectionKey>(
    collection: K,
    item: EntityRecord,
    fallback: CmsEntityMap[K] | undefined,
    seedState: CmsDatabaseState
  ): CmsEntityMap[K] {
    const fallbackRecord = fallback as unknown as EntityRecord | undefined;
    const status = this.normalizeStatus(item, fallback);
    const mediaLookup = new Map(seedState.media.map((media) => [media.url, media.id]));
    const base = {
      ...(fallback ?? {}),
      ...item,
      active: Boolean(item['active'] ?? fallback?.active ?? true),
      status,
      publishedAt: status === 'published' ? String(item['publishedAt'] ?? fallback?.publishedAt ?? item['updatedAt'] ?? new Date().toISOString()) : null,
      deletedAt: item['deletedAt'] ? String(item['deletedAt']) : null,
      order: Number(item['order'] ?? fallback?.order ?? 1),
      createdAt: String(item['createdAt'] ?? fallback?.createdAt ?? new Date().toISOString()),
      updatedAt: String(item['updatedAt'] ?? fallback?.updatedAt ?? new Date().toISOString())
    } as unknown as EntityRecord;

    if (collection === 'services') {
      base['mediaId'] = this.resolveMediaId(item, fallbackRecord, mediaLookup, ['imageUrl']);
      base['categoryIds'] = this.normalizeStringArray(item['categoryIds'] ?? fallbackRecord?.['categoryIds']);
    }

    if (collection === 'packages') {
      base['mediaId'] = this.resolveMediaId(item, fallbackRecord, mediaLookup, ['coverImageUrl']);
      base['categoryIds'] = this.normalizeCategoryIds(item, fallbackRecord, 'package', seedState);
    }

    if (collection === 'packageFeatures') {
      base['categoryIds'] = this.normalizeCategoryIds(item, fallbackRecord, 'package', seedState);
    }

    if (collection === 'galleryItems') {
      base['mediaId'] = this.resolveMediaId(item, fallbackRecord, mediaLookup, ['imageUrl']);
      base['categoryIds'] = this.normalizeCategoryIds(item, fallbackRecord, 'package', seedState);
    }

    if (collection === 'stories') {
      base['mediaId'] = this.resolveMediaId(item, fallbackRecord, mediaLookup, ['coverImageUrl', 'imageUrls']);
      base['mediaIds'] = this.normalizeMediaIds(item, fallbackRecord, mediaLookup, ['imageUrls']);
      base['categoryIds'] = this.normalizeCategoryIds(item, fallbackRecord, 'package', seedState);
    }

    if (collection === 'videoCategories') {
      base['mediaId'] = this.resolveMediaId(item, fallbackRecord, mediaLookup, ['coverImageUrl']);
    }

    if (collection === 'videos') {
      base['mediaId'] = this.resolveMediaId(item, fallbackRecord, mediaLookup, ['thumbnailUrl']);
      base['categoryIds'] = this.normalizeStringArray(item['categoryIds'] ?? fallbackRecord?.['categoryIds']);
    }

    if (collection === 'generalSettings') {
      base['featureFlags'] = {
        enableVideos: Boolean((item['featureFlags'] as EntityRecord | undefined)?.['enableVideos'] ?? true),
        enableStories: Boolean((item['featureFlags'] as EntityRecord | undefined)?.['enableStories'] ?? true),
        enableRSVP: Boolean((item['featureFlags'] as EntityRecord | undefined)?.['enableRSVP'] ?? true)
      };
    }

    return base as unknown as CmsEntityMap[K];
  }

  private normalizeStatus(item: EntityRecord, fallback?: CmsEntityRecord): CmsEntityStatus {
    const status = String(item['status'] ?? fallback?.status ?? '').trim();
    if (status === 'draft' || status === 'published' || status === 'archived') {
      return status;
    }

    return item['active'] === false ? 'draft' : 'published';
  }

  private normalizeCategoryIds(
    item: EntityRecord,
    fallback: EntityRecord | undefined,
    type: 'service' | 'package' | 'video',
    state: CmsDatabaseState
  ): string[] {
    const explicit = this.normalizeStringArray(item['categoryIds'] ?? fallback?.['categoryIds']);
    if (explicit.length) {
      return explicit;
    }

    const legacy = String(item['category'] ?? fallback?.['category'] ?? '').trim();
    if (!legacy) {
      return [];
    }

    const match = state.categories.find((category) => category.type === type && category.slug === legacy);
    return match ? [match.id] : [];
  }

  private normalizeMediaIds(
    item: EntityRecord,
    fallback: EntityRecord | undefined,
    mediaLookup: Map<string, string>,
    legacyKeys: string[]
  ): string[] {
    const explicit = this.normalizeStringArray(item['mediaIds'] ?? fallback?.['mediaIds']);
    if (explicit.length) {
      return explicit;
    }

    const urls = legacyKeys.flatMap((key) => {
      const value = item[key] ?? fallback?.[key];
      return Array.isArray(value) ? value.map((entry) => String(entry)) : typeof value === 'string' && value ? [value] : [];
    });

    return Array.from(new Set(urls.map((url) => mediaLookup.get(url) ?? '').filter(Boolean)));
  }

  private resolveMediaId(
    item: EntityRecord,
    fallback: EntityRecord | undefined,
    mediaLookup: Map<string, string>,
    legacyKeys: string[]
  ): string {
    const explicit = String(item['mediaId'] ?? fallback?.['mediaId'] ?? '').trim();
    if (explicit) {
      return explicit;
    }

    for (const key of legacyKeys) {
      const value = item[key] ?? fallback?.[key];
      if (typeof value === 'string' && value) {
        return mediaLookup.get(value) ?? '';
      }

      if (Array.isArray(value)) {
        const match = value.map((entry) => mediaLookup.get(String(entry)) ?? '').find(Boolean);
        if (match) {
          return match;
        }
      }
    }

    return '';
  }

  private normalizeStringArray(value: unknown): string[] {
    return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
  }

  private prepareEntityForWrite<K extends CmsCollectionKey>(
    collection: K,
    entity: CmsEntityMap[K],
    state: CmsDatabaseState,
    currentId: string | null
  ): CmsEntityMap[K] {
    const normalized = { ...entity } as unknown as EntityRecord;
    const status = this.normalizeWriteStatus(normalized);
    normalized['status'] = status;
    normalized['publishedAt'] = status === 'published' ? String(normalized['publishedAt'] ?? new Date().toISOString()) : null;
    normalized['deletedAt'] = normalized['deletedAt'] ? String(normalized['deletedAt']) : null;
    normalized['order'] = Number(normalized['order'] ?? 1);
    normalized['active'] = Boolean(normalized['active'] ?? true);

    this.validateBusinessRules(collection, normalized, state, currentId);
    return normalized as unknown as CmsEntityMap[K];
  }

  private normalizeWriteStatus(entity: EntityRecord): CmsEntityStatus {
    const raw = String(entity['status'] ?? 'draft').trim();
    if (raw === 'draft' || raw === 'published' || raw === 'archived') {
      return raw;
    }

    return 'draft';
  }

  private validateBusinessRules(
    collection: CmsCollectionKey,
    entity: EntityRecord,
    state: CmsDatabaseState,
    currentId: string | null
  ): void {
    const errors: string[] = [];
    const name = String(entity['name'] ?? '').trim();
    if (!name) {
      errors.push('El nombre es obligatorio.');
    }

    if (collection === 'services') {
      this.ensureUniqueSlug(state.services, entity, currentId, errors, 'servicio');
    }

    if (collection === 'packages') {
      this.ensureUniqueSlug(state.packages, entity, currentId, errors, 'paquete');
      if (this.normalizeStringArray(entity['serviceIds']).length < 1) {
        errors.push('El paquete debe tener al menos un servicio vinculado.');
      }
      if (this.normalizeStringArray(entity['featureIds']).length < 1) {
        errors.push('El paquete debe tener al menos un feature vinculado.');
      }
    }

    if (collection === 'videos' && !String(entity['videoId'] ?? '').trim()) {
      errors.push('El video debe tener videoId.');
    }

    if (collection === 'categories') {
      const slug = String(entity['slug'] ?? '').trim();
      const type = String(entity['type'] ?? '').trim();
      const duplicated = state.categories.find((item) => item.id !== currentId && item.slug === slug && item.type === type);
      if (duplicated) {
        errors.push('Ya existe una categoría con el mismo slug y tipo.');
      }
    }

    if (collection === 'pageSnapshots' && !String(entity['slug'] ?? '').trim()) {
      errors.push('El snapshot debe tener slug.');
    }

    if (errors.length) {
      throw new Error(errors.join(' '));
    }
  }

  private ensureUniqueSlug<T extends CmsService | CmsPackage>(
    collection: T[],
    entity: EntityRecord,
    currentId: string | null,
    errors: string[],
    label: string
  ): void {
    const slug = String(entity['slug'] ?? '').trim();
    if (!slug) {
      errors.push(`El ${label} debe tener slug.`);
      return;
    }

    const duplicated = collection.find((item) => item.id !== currentId && item.slug === slug);
    if (duplicated) {
      errors.push(`Ya existe otro ${label} con el slug ${slug}.`);
    }
  }

  private stripDeleted(state: CmsDatabaseState): CmsDatabaseState {
    return Object.fromEntries(
      Object.entries(state).map(([key, items]) => [
        key,
        Array.isArray(items) ? items.filter((item) => !item.deletedAt) : items
      ])
    ) as CmsDatabaseState;
  }

  private commit(state: CmsDatabaseState): void {
    this.rawStateSubject.next(state);
    this.persistence.save(state);
  }

  private sortCollection<T extends CmsEntityRecord>(collection: T[]): T[] {
    return [...collection].sort((left, right) => left.order - right.order || left.name.localeCompare(right.name));
  }

  private generateId(collection: CmsCollectionKey, seed: string): string {
    const safeSeed = String(seed ?? 'item')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `${collection}-${safeSeed}-${Date.now().toString(36)}`;
  }
}
