import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, catchError, map, of } from 'rxjs';
import { Firestore as AngularFirestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection as firestoreCollection,
  doc as firestoreDoc,
  onSnapshot,
  updateDoc,
  type Firestore as FirebaseFirestore
} from 'firebase/firestore';
import {
  CMS_COLLECTION_KEYS,
  CmsAdditionalService,
  CmsCategory,
  CmsCollectionKey,
  CmsDatabaseState,
  CmsEntityBase,
  CmsEntityMap,
  CmsEntityStatus,
  CmsGalleryItem,
  CmsGeneralSettings,
  CmsMedia,
  CmsPackage,
  CmsPackageFeature,
  CmsPage,
  CmsPageSnapshot,
  CmsSection,
  CmsSectionData,
  CmsService,
  CmsStory,
  CmsVideo,
  CmsVideoCategory
} from '../models/cms.models';
import {
  FirestoreCmsAdapter,
  firebaseAdditionalServiceAdapter,
  firebaseCategoryAdapter,
  firebaseGalleryItemAdapter,
  firebaseGeneralSettingsAdapter,
  firebaseMediaAdapter,
  firebasePackageAdapter,
  firebasePackageFeatureAdapter,
  firebasePageAdapter,
  firebasePageSnapshotAdapter,
  firebaseSectionAdapter,
  firebaseSectionDataAdapter,
  firebaseServiceAdapter,
  firebaseStoryAdapter,
  firebaseVideoAdapter,
  firebaseVideoCategoryAdapter
} from '../adapters/firebase-cms-document.adapters';
import { MockCmsDatabaseRepositoryService } from '../mock/mock-cms-database-repository.service';
import { CategoriesRepository, CATEGORIES_REPOSITORY } from '../repositories/categories-repository';
import { CmsDatabaseRepository, CMS_FIREBASE_COLLECTIONS } from '../repositories/cms-database-repository';
import { MediaRepository, MEDIA_REPOSITORY } from '../repositories/media-repository';
import { PageSnapshotsRepository, PAGE_SNAPSHOTS_REPOSITORY } from '../repositories/page-snapshots-repository';
import { PackagesRepository, PACKAGES_REPOSITORY } from '../repositories/packages-repository';
import { PagesRepository, PAGES_REPOSITORY } from '../repositories/pages-repository';
import { SectionsDataRepository, SECTIONS_DATA_REPOSITORY } from '../repositories/sections-data-repository';
import { SectionsRepository, SECTIONS_REPOSITORY } from '../repositories/sections-repository';
import { ServicesRepository, SERVICES_REPOSITORY } from '../repositories/services-repository';

type FirebaseCollectionKey = CmsCollectionKey;
type FirebaseEntityMap = CmsEntityMap;
type FirestoreEntityRecord = Record<string, unknown> & { id: string };

@Injectable({ providedIn: 'root' })
export class FirebaseCmsDatabaseRepositoryService implements CmsDatabaseRepository, OnDestroy {
  private readonly firestore = inject<FirebaseFirestore>(AngularFirestore);
  private readonly mockRepository = inject(MockCmsDatabaseRepositoryService);
  private readonly categoriesRepository = inject<CategoriesRepository>(CATEGORIES_REPOSITORY);
  private readonly pagesRepository = inject<PagesRepository>(PAGES_REPOSITORY);
  private readonly pageSnapshotsRepository = inject<PageSnapshotsRepository>(PAGE_SNAPSHOTS_REPOSITORY);
  private readonly sectionsRepository = inject<SectionsRepository>(SECTIONS_REPOSITORY);
  private readonly sectionsDataRepository = inject<SectionsDataRepository>(SECTIONS_DATA_REPOSITORY);
  private readonly servicesRepository = inject<ServicesRepository>(SERVICES_REPOSITORY);
  private readonly packagesRepository = inject<PackagesRepository>(PACKAGES_REPOSITORY);
  private readonly mediaRepository = inject<MediaRepository>(MEDIA_REPOSITORY);
  private readonly firebaseCollections = new Set(inject(CMS_FIREBASE_COLLECTIONS));
  private readonly subscriptions = new Subscription();
  private readonly rawStateSubject = new BehaviorSubject<CmsDatabaseState>(this.buildInitialState());

  readonly state$ = this.rawStateSubject.asObservable().pipe(map((state) => this.stripDeleted(state)));

  constructor() {
    this.subscriptions.add(
      this.mockRepository.rawState$.subscribe((state) => {
        const current = this.rawStateSubject.value;
        const nextState = { ...state } as CmsDatabaseState;

        for (const collection of CMS_COLLECTION_KEYS) {
          if (this.isFirebaseCollection(collection)) {
            this.setCollectionState(nextState, collection, current[collection]);
          }
        }

        this.rawStateSubject.next(nextState);
      })
    );

    for (const collection of CMS_COLLECTION_KEYS) {
      this.bindFirebaseCollection(collection, this.buildFirebaseCollectionStream(collection));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  selectCollection<K extends CmsCollectionKey>(collection: K): Observable<CmsEntityMap[K][]> {
    return this.state$.pipe(map((state) => [...state[collection]] as CmsEntityMap[K][]));
  }

  selectPublishedCollection<K extends CmsCollectionKey>(collection: K): Observable<CmsEntityMap[K][]> {
    return this.selectCollection(collection).pipe(
      map((items) => items.filter((item) => item.status === 'published' && item.active))
    );
  }

  getSnapshot(): CmsDatabaseState {
    return this.stripDeleted(this.rawStateSubject.value);
  }

  getCollectionSnapshot<K extends CmsCollectionKey>(collection: K): CmsEntityMap[K][] {
    return [...this.getSnapshot()[collection]] as CmsEntityMap[K][];
  }

  async create<K extends CmsCollectionKey>(collection: K, payload: Partial<CmsEntityMap[K]>): Promise<CmsEntityMap[K]> {
    if (!this.isFirebaseCollection(collection)) {
      return this.mockRepository.create(collection, payload);
    }

    if (collection === 'generalSettings') {
      return this.createGenericFirebaseEntity(
        collection,
        this.prepareGeneralSettingsCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsGeneralSettings>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'categories') {
      return this.categoriesRepository.create(
        this.prepareCategoryCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsCategory>))
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'pages') {
      return this.pagesRepository.create(
        this.preparePageCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsPage>))
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'pageSnapshots') {
      return this.pageSnapshotsRepository.create(
        this.preparePageSnapshotCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsPageSnapshot>))
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'sections') {
      return this.sectionsRepository.create(
        this.prepareSectionCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsSection>))
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'sectionsData') {
      return this.sectionsDataRepository.create(
        this.prepareSectionDataCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsSectionData>))
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'services') {
      return this.servicesRepository.create(
        this.prepareServiceCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsService>))
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'packages') {
      return this.packagesRepository.create(
        this.preparePackageCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsPackage>))
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'additionalServices') {
      return this.createGenericFirebaseEntity(
        collection,
        this.prepareAdditionalServiceCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsAdditionalService>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'packageFeatures') {
      return this.createGenericFirebaseEntity(
        collection,
        this.preparePackageFeatureCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsPackageFeature>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'galleryItems') {
      return this.createGenericFirebaseEntity(
        collection,
        this.prepareGalleryItemCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsGalleryItem>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'stories') {
      return this.createGenericFirebaseEntity(
        collection,
        this.prepareStoryCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsStory>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'videoCategories') {
      return this.createGenericFirebaseEntity(
        collection,
        this.prepareVideoCategoryCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsVideoCategory>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<CmsEntityMap[K]>;
    }

    if (collection === 'videos') {
      return this.createGenericFirebaseEntity(
        collection,
        this.prepareVideoCreatePayload(this.stripLegacyMediaFields(payload as Partial<CmsVideo>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<CmsEntityMap[K]>;
    }

    return this.mediaRepository.create(this.prepareMediaCreatePayload(payload as Partial<CmsMedia>)) as Promise<CmsEntityMap[K]>;
  }

  async update<K extends CmsCollectionKey>(collection: K, id: string, payload: Partial<CmsEntityMap[K]>): Promise<void> {
    if (!this.isFirebaseCollection(collection)) {
      return this.mockRepository.update(collection, id, payload);
    }

    if (collection === 'generalSettings') {
      return this.updateGenericFirebaseEntity(
        collection,
        id,
        this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsGeneralSettings>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<void>;
    }

    if (collection === 'categories') {
      return this.categoriesRepository.update(id, this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsCategory>)));
    }

    if (collection === 'pages') {
      return this.pagesRepository.update(id, this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsPage>)));
    }

    if (collection === 'pageSnapshots') {
      return this.pageSnapshotsRepository.update(
        id,
        this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsPageSnapshot>))
      );
    }

    if (collection === 'sections') {
      return this.sectionsRepository.update(id, this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsSection>)));
    }

    if (collection === 'sectionsData') {
      return this.sectionsDataRepository.update(
        id,
        this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsSectionData>))
      );
    }

    if (collection === 'services') {
      return this.servicesRepository.update(id, this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsService>)));
    }

    if (collection === 'packages') {
      return this.packagesRepository.update(id, this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsPackage>)));
    }

    if (collection === 'additionalServices') {
      return this.updateGenericFirebaseEntity(
        collection,
        id,
        this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsAdditionalService>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<void>;
    }

    if (collection === 'packageFeatures') {
      return this.updateGenericFirebaseEntity(
        collection,
        id,
        this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsPackageFeature>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<void>;
    }

    if (collection === 'galleryItems') {
      return this.updateGenericFirebaseEntity(
        collection,
        id,
        this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsGalleryItem>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<void>;
    }

    if (collection === 'stories') {
      return this.updateGenericFirebaseEntity(
        collection,
        id,
        this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsStory>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<void>;
    }

    if (collection === 'videoCategories') {
      return this.updateGenericFirebaseEntity(
        collection,
        id,
        this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsVideoCategory>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<void>;
    }

    if (collection === 'videos') {
      return this.updateGenericFirebaseEntity(
        collection,
        id,
        this.prepareUpdatePayload(this.stripLegacyMediaFields(payload as Partial<CmsVideo>)) as Partial<FirebaseEntityMap[K]>
      ) as Promise<void>;
    }

    return this.mediaRepository.update(id, this.prepareUpdatePayload(payload as Partial<CmsMedia>));
  }

  async delete<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    const current = this.getCollectionSnapshot(collection).find((item) => item.id === id);
    if (!current) {
      return;
    }

    return this.update(collection, id, {
      status: 'archived',
      deletedAt: new Date().toISOString(),
      active: false,
      publishedAt: current.status === 'published' ? current.publishedAt ?? new Date().toISOString() : null
    } as Partial<CmsEntityMap[K]>);
  }

  async restore<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    return this.update(collection, id, {
      deletedAt: null,
      status: 'draft',
      publishedAt: null,
      active: true
    } as Partial<CmsEntityMap[K]>);
  }

  async duplicate<K extends CmsCollectionKey>(collection: K, id: string): Promise<CmsEntityMap[K] | undefined> {
    const current = this.getCollectionSnapshot(collection).find((item) => item.id === id);
    if (!current) {
      return undefined;
    }

    const duplicatedRecord = current as unknown as Record<string, unknown>;
    const duplicated = {
      ...duplicatedRecord,
      name: `${current.name} copia`,
      ...(typeof duplicatedRecord['slug'] === 'string'
        ? { slug: `${String(duplicatedRecord['slug'])}-copy` }
        : {}),
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot(collection).length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    delete (duplicated as Record<string, unknown>)['id'];

    return this.create(collection, duplicated as Partial<CmsEntityMap[K]>);
  }

  async toggleActive<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    const current = this.getCollectionSnapshot(collection).find((item) => item.id === id);
    if (!current) {
      return;
    }

    return this.update(collection, id, { active: !current.active } as Partial<CmsEntityMap[K]>);
  }

  async updateStatus<K extends CmsCollectionKey>(collection: K, id: string, status: CmsEntityStatus): Promise<void> {
    return this.update(collection, id, {
      status,
      publishedAt: status === 'published' ? new Date().toISOString() : null,
      active: status !== 'archived'
    } as Partial<CmsEntityMap[K]>);
  }

  async publish<K extends CmsCollectionKey>(collection: K, id: string): Promise<void> {
    return this.updateStatus(collection, id, 'published');
  }

  async reorder<K extends CmsCollectionKey>(collection: K, orderedIds: string[]): Promise<void> {
    if (!this.isFirebaseCollection(collection)) {
      return this.mockRepository.reorder(collection, orderedIds);
    }

    await Promise.all(
      orderedIds.map((id, index) =>
        this.update(collection, id, {
          order: index + 1,
          updatedAt: new Date().toISOString()
        } as Partial<CmsEntityMap[K]>)
      )
    );
  }

  async reset(): Promise<void> {
    this.rawStateSubject.next(this.buildInitialState());
  }

  private bindFirebaseCollection<K extends FirebaseCollectionKey>(
    collection: K,
    stream: Observable<FirebaseEntityMap[K][]>
  ): void {
    if (!this.isFirebaseCollection(collection)) {
      return;
    }

    this.subscriptions.add(
      stream.subscribe((items) => {
        const current = this.rawStateSubject.value;
        const nextState = { ...current } as CmsDatabaseState;
        this.setCollectionState(nextState, collection, [...items]);
        this.rawStateSubject.next(nextState);
      })
    );
  }

  private buildFirebaseCollectionStream<K extends FirebaseCollectionKey>(collectionKey: K): Observable<FirebaseEntityMap[K][]> {
    const adapter = this.getFirebaseAdapter(collectionKey);

    return new Observable<FirebaseEntityMap[K][]>((subscriber) =>
      onSnapshot(
        firestoreCollection(this.firestore, collectionKey),
        (snapshot) => {
          subscriber.next(
            snapshot.docs.map((record) =>
              adapter.fromFirestore({
                id: record.id,
                ...(record.data() as Record<string, unknown>)
              } as FirestoreEntityRecord)
            ) as FirebaseEntityMap[K][]
          );
        },
        (error) => subscriber.error(error)
      )
    ).pipe(
      map((records) =>
        records
          .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name))
      ),
      catchError((error) => {
        console.error(`[Firebase CMS] No se pudo leer la colección ${collectionKey}.`, error);
        return of([] as FirebaseEntityMap[K][]);
      })
    );
  }

  private async createGenericFirebaseEntity<K extends FirebaseCollectionKey>(
    collectionKey: K,
    payload: Partial<FirebaseEntityMap[K]>
  ): Promise<FirebaseEntityMap[K]> {
    const adapter = this.getFirebaseAdapter(collectionKey);
    const reference = await addDoc(
      firestoreCollection(this.firestore, collectionKey),
      adapter.toFirestore(payload, { create: true })
    );

    return adapter.fromFirestore({ id: reference.id, ...(payload as Record<string, unknown>) } as FirestoreEntityRecord);
  }

  private async updateGenericFirebaseEntity<K extends FirebaseCollectionKey>(
    collectionKey: K,
    id: string,
    payload: Partial<FirebaseEntityMap[K]>
  ): Promise<void> {
    const adapter = this.getFirebaseAdapter(collectionKey);
    await updateDoc(firestoreDoc(this.firestore, collectionKey, id), adapter.toFirestore(payload));
  }

  private buildInitialState(): CmsDatabaseState {
    const mockState = this.mockRepository.getRawSnapshot();
    const emptyState = this.buildEmptyState();
    const nextState = { ...mockState } as CmsDatabaseState;

    for (const collection of CMS_COLLECTION_KEYS) {
      if (this.isFirebaseCollection(collection)) {
        this.setCollectionState(nextState, collection, emptyState[collection]);
      }
    }

    return nextState;
  }

  private setCollectionState<K extends CmsCollectionKey>(state: CmsDatabaseState, collection: K, value: CmsEntityMap[K][]): void {
    (state as Record<CmsCollectionKey, CmsEntityMap[CmsCollectionKey][]>)[collection] =
      value as CmsEntityMap[CmsCollectionKey][];
  }

  private buildEmptyState(): CmsDatabaseState {
    return {
      generalSettings: [],
      categories: [],
      pages: [],
      pageSnapshots: [],
      sections: [],
      sectionsData: [],
      services: [],
      additionalServices: [],
      packages: [],
      packageFeatures: [],
      galleryItems: [],
      stories: [],
      videoCategories: [],
      videos: [],
      media: []
    };
  }

  private isFirebaseCollection(collection: CmsCollectionKey): collection is FirebaseCollectionKey {
    return this.firebaseCollections.has(collection);
  }

  private getFirebaseAdapter<K extends FirebaseCollectionKey>(collectionKey: K): FirestoreCmsAdapter<FirebaseEntityMap[K]> {
    switch (collectionKey) {
      case 'generalSettings':
        return firebaseGeneralSettingsAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'categories':
        return firebaseCategoryAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'pages':
        return firebasePageAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'pageSnapshots':
        return firebasePageSnapshotAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'sections':
        return firebaseSectionAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'sectionsData':
        return firebaseSectionDataAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'services':
        return firebaseServiceAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'additionalServices':
        return firebaseAdditionalServiceAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'packages':
        return firebasePackageAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'packageFeatures':
        return firebasePackageFeatureAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'galleryItems':
        return firebaseGalleryItemAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'stories':
        return firebaseStoryAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'videoCategories':
        return firebaseVideoCategoryAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'videos':
        return firebaseVideoAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      case 'media':
        return firebaseMediaAdapter as FirestoreCmsAdapter<FirebaseEntityMap[K]>;
      default:
        throw new Error(`[Firebase CMS] No existe adapter para la colección ${collectionKey}.`);
    }
  }

  private prepareGeneralSettingsCreatePayload(payload: Partial<CmsGeneralSettings>): Partial<CmsGeneralSettings> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'published',
      publishedAt: now,
      deletedAt: null,
      order: this.getCollectionSnapshot('generalSettings').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Configuración principal'),
      siteName: '',
      siteTagline: '',
      defaultTitle: '',
      defaultDescription: '',
      footerText: '',
      whatsappPhone: '',
      whatsappMessage: '',
      instagram: '',
      facebook: '',
      tiktok: '',
      youtube: '',
      featureFlags: { enableVideos: true, enableStories: true, enableRSVP: true },
      ...payload
    };
  }

  private prepareServiceCreatePayload(payload: Partial<CmsService>): Partial<CmsService> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft' as const,
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('services').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nuevo registro'),
      slug: '',
      description: '',
      mediaId: '',
      href: '',
      ctaLabel: 'Ver más',
      points: [],
      pageIds: [],
      sectionIds: [],
      categoryIds: [],
      ...payload
    };
  }

  private prepareCategoryCreatePayload(payload: Partial<CmsCategory>): Partial<CmsCategory> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('categories').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nueva categoria'),
      slug: '',
      type: 'service',
      ...payload
    };
  }

  private preparePageCreatePayload(payload: Partial<CmsPage>): Partial<CmsPage> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('pages').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nueva pagina'),
      slug: '',
      routePath: '',
      pageType: 'custom',
      description: '',
      metaTitle: '',
      metaDescription: '',
      sectionIds: [],
      ...payload
    };
  }

  private preparePageSnapshotCreatePayload(payload: Partial<CmsPageSnapshot>): Partial<CmsPageSnapshot> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('pageSnapshots').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nuevo snapshot'),
      slug: '',
      pageId: '',
      data: {},
      builtAt: null,
      ...payload
    };
  }

  private prepareSectionCreatePayload(payload: Partial<CmsSection>): Partial<CmsSection> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('sections').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nueva seccion'),
      pageId: '',
      type: 'custom',
      enabled: true,
      sectionDataId: '',
      entityCollection: '',
      entityIds: [],
      ...payload
    };
  }

  private prepareSectionDataCreatePayload(payload: Partial<CmsSectionData>): Partial<CmsSectionData> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('sectionsData').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nuevo contenido'),
      pageId: '',
      sectionType: 'custom',
      title: '',
      subtitle: '',
      body: '',
      mediaIds: [],
      data: {
        layout: 'grid',
        columns: 1,
        showCTA: false,
        style: 'light'
      },
      ...payload
    };
  }

  private preparePackageCreatePayload(payload: Partial<CmsPackage>): Partial<CmsPackage> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('packages').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nuevo registro'),
      slug: '',
      categoryIds: [],
      packageTypeLabel: '',
      summary: '',
      mediaId: '',
      priceLabel: '',
      basePrice: 0,
      priceLines: [],
      featured: false,
      serviceIds: [],
      additionalServiceIds: [],
      featureIds: [],
      pageIds: [],
      sectionIds: [],
      notes: [],
      advancedData: {},
      ...payload
    };
  }

  private prepareAdditionalServiceCreatePayload(payload: Partial<CmsAdditionalService>): Partial<CmsAdditionalService> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('additionalServices').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nuevo servicio adicional'),
      priceLabel: '',
      basePrice: 0,
      description: '',
      serviceIds: [],
      ...payload
    };
  }

  private preparePackageFeatureCreatePayload(payload: Partial<CmsPackageFeature>): Partial<CmsPackageFeature> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('packageFeatures').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nuevo feature'),
      description: '',
      categoryIds: [],
      value: '',
      ...payload
    };
  }

  private prepareGalleryItemCreatePayload(payload: Partial<CmsGalleryItem>): Partial<CmsGalleryItem> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('galleryItems').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nuevo item de galería'),
      title: '',
      categoryIds: [],
      alt: '',
      mediaId: '',
      variant: 'default',
      tags: [],
      pageIds: [],
      sectionIds: [],
      ...payload
    };
  }

  private prepareStoryCreatePayload(payload: Partial<CmsStory>): Partial<CmsStory> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('stories').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nueva historia'),
      categoryIds: [],
      clientName: '',
      location: '',
      subtitle: '',
      mediaId: '',
      mediaIds: [],
      pageIds: [],
      sectionIds: [],
      ...payload
    };
  }

  private prepareVideoCategoryCreatePayload(payload: Partial<CmsVideoCategory>): Partial<CmsVideoCategory> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('videoCategories').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nueva categoría de video'),
      key: '',
      summary: '',
      playlistId: '',
      playlistUrl: '',
      mediaId: '',
      videoIds: [],
      ...payload
    };
  }

  private prepareVideoCreatePayload(payload: Partial<CmsVideo>): Partial<CmsVideo> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('videos').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nuevo video'),
      videoId: '',
      description: '',
      duration: '',
      format: '',
      mediaId: '',
      categoryIds: [],
      featuredOnLanding: false,
      ...payload
    };
  }

  private prepareMediaCreatePayload(payload: Partial<CmsMedia>): Partial<CmsMedia> {
    const now = new Date().toISOString();
    return {
      active: true,
      status: 'draft',
      publishedAt: null,
      deletedAt: null,
      order: this.getCollectionSnapshot('media').length + 1,
      createdAt: now,
      updatedAt: now,
      name: String(payload.name ?? 'Nuevo registro'),
      mediaType: 'image',
      url: '',
      alt: '',
      folder: 'cms',
      mimeType: '',
      sizeLabel: '',
      isMockUpload: false,
      ...payload
    };
  }

  private prepareUpdatePayload<TEntity extends CmsEntityBase>(payload: Partial<TEntity>): Partial<TEntity> {
    return {
      ...payload,
      updatedAt: new Date().toISOString()
    };
  }

  private stripLegacyMediaFields<TEntity extends object>(payload: Partial<TEntity>): Partial<TEntity> {
    const next = { ...(payload as Record<string, unknown>) };
    delete next['imageUrl'];
    delete next['coverImageUrl'];
    delete next['imageUrls'];
    delete next['thumbnailUrl'];
    delete next['thumbnailUrls'];
    delete next['heroImageUrl'];
    return next as Partial<TEntity>;
  }

  private stripDeleted(state: CmsDatabaseState): CmsDatabaseState {
    return {
      generalSettings: state.generalSettings.filter((item) => !item.deletedAt),
      categories: state.categories.filter((item) => !item.deletedAt),
      pages: state.pages.filter((item) => !item.deletedAt),
      pageSnapshots: state.pageSnapshots.filter((item) => !item.deletedAt),
      sections: state.sections.filter((item) => !item.deletedAt),
      sectionsData: state.sectionsData.filter((item) => !item.deletedAt),
      services: state.services.filter((item) => !item.deletedAt),
      additionalServices: state.additionalServices.filter((item) => !item.deletedAt),
      packages: state.packages.filter((item) => !item.deletedAt),
      packageFeatures: state.packageFeatures.filter((item) => !item.deletedAt),
      galleryItems: state.galleryItems.filter((item) => !item.deletedAt),
      stories: state.stories.filter((item) => !item.deletedAt),
      videoCategories: state.videoCategories.filter((item) => !item.deletedAt),
      videos: state.videos.filter((item) => !item.deletedAt),
      media: state.media.filter((item) => !item.deletedAt)
    };
  }
}
