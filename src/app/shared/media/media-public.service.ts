import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getRealImageDefinition,
  validateImageIntent,
} from '../../core/data/package-real-images';
import { getStockImageByPath } from '../../core/data/package-stock-images';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
  type Firestore,
} from 'firebase/firestore';
import {
  Observable,
  catchError,
  from,
  map,
  of,
  shareReplay,
  startWith,
} from 'rxjs';

export const MEDIA_PUBLIC_FALLBACK_IMAGE = '/assets/img/default-cover.png';

export interface MediaPublicDoc {
  id: string;
  name?: string;
  url?: string;
  alt?: string;
  folder: string;
  storagePath?: string;
  status?: 'published' | 'draft' | string;
  deletedAt?: string | null;
  order?: number;
  publishedAt?: string;
  updatedAt?: string;
  createdAt?: string;
}

export type MediaPublicStateStatus = 'loading' | 'ready' | 'error' | 'empty';

export interface MediaPublicState {
  folder: string;
  status: MediaPublicStateStatus;
  coverUrl: string;
  galleryUrls: string[];
  items: MediaPublicDoc[];
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class MediaPublicService {
  private readonly app = inject(FirebaseApp);
  private readonly firestore: Firestore = getFirestore(this.app);
  private readonly collectionRef = collection(this.firestore, 'media');

  private readonly galleryDocsCache = new Map<
    string,
    Observable<MediaPublicDoc[]>
  >();
  private readonly coverCache = new Map<string, Observable<string>>();
  private readonly galleryCache = new Map<string, Observable<string[]>>();
  private readonly stateCache = new Map<string, Observable<MediaPublicState>>();
  private readonly realImageCache = new Map<string, Observable<string>>();
  private readonly resolvedStateCache = new Map<
    string,
    Observable<MediaPublicState>
  >();

  resolveImage(url?: string | null): string {
    const normalized = String(url ?? '').trim();
    return normalized || MEDIA_PUBLIC_FALLBACK_IMAGE;
  }

  buildFolder(...segments: Array<string | null | undefined>): string {
    return segments
      .map((segment) => this.normalizeFolderSegment(segment))
      .filter((segment) => segment.length > 0)
      .join('/');
  }

  getCoverByFolder(folder: string): Observable<string> {
    const normalizedFolder = this.normalizeFolder(folder);
    if (!normalizedFolder) {
      return of(MEDIA_PUBLIC_FALLBACK_IMAGE);
    }

    const cached = this.coverCache.get(normalizedFolder);
    if (cached) {
      return cached;
    }

    const cover$ = this.getMediaDocsByFolder(normalizedFolder).pipe(
      map((items) => this.resolveImage(this.pickCover(items)?.url)),
      catchError(() => of(MEDIA_PUBLIC_FALLBACK_IMAGE)),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.coverCache.set(normalizedFolder, cover$);
    return cover$;
  }

  getGalleryByFolder(folder: string): Observable<string[]> {
    const normalizedFolder = this.normalizeFolder(folder);
    if (!normalizedFolder) {
      return of([MEDIA_PUBLIC_FALLBACK_IMAGE]);
    }

    const cached = this.galleryCache.get(normalizedFolder);
    if (cached) {
      return cached;
    }

    const gallery$ = this.getMediaDocsByFolder(normalizedFolder).pipe(
      map((items) => {
        const urls = items
          .map((item) => this.resolveImage(item.url))
          .filter((url, index, list) => list.indexOf(url) === index);
        return urls.length ? urls : [MEDIA_PUBLIC_FALLBACK_IMAGE];
      }),
      catchError(() => of([MEDIA_PUBLIC_FALLBACK_IMAGE])),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.galleryCache.set(normalizedFolder, gallery$);
    return gallery$;
  }

  getMediaStateByFolder(folder: string): Observable<MediaPublicState> {
    const normalizedFolder = this.normalizeFolder(folder);
    if (!normalizedFolder) {
      return of(this.createState('', 'empty'));
    }

    const cached = this.stateCache.get(normalizedFolder);
    if (cached) {
      return cached;
    }

    const state$ = this.getMediaDocsByFolder(normalizedFolder).pipe(
      map((items) => {
        if (!items.length) {
          return this.createState(normalizedFolder, 'empty');
        }

        const galleryUrls = items
          .map((item) => this.resolveImage(item.url))
          .filter((url, index, list) => list.indexOf(url) === index);
        const coverUrl = this.resolveImage(this.pickCover(items)?.url);

        return {
          folder: normalizedFolder,
          status: 'ready' as const,
          coverUrl,
          galleryUrls: galleryUrls.length
            ? galleryUrls
            : [MEDIA_PUBLIC_FALLBACK_IMAGE],
          items,
          error: null,
        };
      }),
      startWith(this.createState(normalizedFolder, 'loading')),
      catchError((error) =>
        of(
          this.createState(
            normalizedFolder,
            'error',
            error instanceof Error
              ? error.message
              : 'No fue posible cargar la media pública.',
          ),
        ),
      ),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.stateCache.set(normalizedFolder, state$);
    return state$;
  }

  getRealImage(path: string): Observable<string> {
    const normalizedPath = this.normalizeFolder(path);
    if (!normalizedPath) {
      return of(MEDIA_PUBLIC_FALLBACK_IMAGE);
    }

    const cached = this.realImageCache.get(normalizedPath);
    if (cached) {
      return cached;
    }

    const assignedImage = this.getAssignedRealImage(normalizedPath);
    const stockImage = getStockImageByPath(normalizedPath);
    const fallbackImage =
      assignedImage?.imageUrl ?? stockImage ?? MEDIA_PUBLIC_FALLBACK_IMAGE;

    const image$ = this.getCoverByFolder(normalizedPath).pipe(
      map((firebaseCover) =>
        firebaseCover && firebaseCover !== MEDIA_PUBLIC_FALLBACK_IMAGE
          ? firebaseCover
          : fallbackImage,
      ),
      catchError(() => of(fallbackImage)),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.realImageCache.set(normalizedPath, image$);
    return image$;
  }

  getResolvedMediaStateByFolder(path: string): Observable<MediaPublicState> {
    const normalizedPath = this.normalizeFolder(path);
    if (!normalizedPath) {
      return of(this.createState('', 'empty'));
    }

    const cached = this.resolvedStateCache.get(normalizedPath);
    if (cached) {
      return cached;
    }

    const assignedImage = this.getAssignedRealImage(normalizedPath);
    const stockImage = getStockImageByPath(normalizedPath);
    const fallbackImage =
      assignedImage?.imageUrl ?? stockImage ?? MEDIA_PUBLIC_FALLBACK_IMAGE;

    const state$ = this.getMediaStateByFolder(normalizedPath).pipe(
      map((state) => {
        const hasFirebaseCover =
          state.coverUrl && state.coverUrl !== MEDIA_PUBLIC_FALLBACK_IMAGE;
        const galleryUrls = this.isFallbackOnlyGallery(state.galleryUrls)
          ? [fallbackImage]
          : state.galleryUrls;

        return {
          ...state,
          coverUrl: hasFirebaseCover ? state.coverUrl : fallbackImage,
          galleryUrls,
        };
      }),
      catchError(() =>
        of({
          ...this.createState(normalizedPath, 'error'),
          coverUrl: fallbackImage,
          galleryUrls: [fallbackImage],
        }),
      ),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.resolvedStateCache.set(normalizedPath, state$);
    return state$;
  }

  createState(
    folder: string,
    status: MediaPublicStateStatus,
    error: string | null = null,
  ): MediaPublicState {
    return {
      folder,
      status,
      coverUrl: MEDIA_PUBLIC_FALLBACK_IMAGE,
      galleryUrls: [MEDIA_PUBLIC_FALLBACK_IMAGE],
      items: [],
      error,
    };
  }

  private getMediaDocsByFolder(folder: string): Observable<MediaPublicDoc[]> {
    const normalizedFolder = this.normalizeFolder(folder);
    if (!normalizedFolder) {
      return of([]);
    }

    const cached = this.galleryDocsCache.get(normalizedFolder);
    if (cached) {
      return cached;
    }

    const mediaQuery = query(
      this.collectionRef,
      where('folder', '==', normalizedFolder),
      where('status', '==', 'published'),
      where('deletedAt', '==', null),
      orderBy('order', 'desc'),
    );

    const docs$ = from(getDocs(mediaQuery)).pipe(
      map((snapshot) =>
        snapshot.docs
          .map((record) =>
            this.mapDoc({
              id: record.id,
              ...record.data(),
            }),
          )
          .filter((record): record is MediaPublicDoc => !!record)
          .sort((left, right) => this.sortDocs(left, right)),
      ),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.galleryDocsCache.set(normalizedFolder, docs$);
    return docs$;
  }

  private mapDoc(record: unknown): MediaPublicDoc | null {
    if (!record || typeof record !== 'object') {
      return null;
    }

    const candidate = record as Record<string, unknown>;
    const folder = this.normalizeFolder(String(candidate['folder'] ?? ''));
    if (!folder) {
      return null;
    }

    return {
      id: String(candidate['id'] ?? '').trim(),
      name: String(candidate['name'] ?? '').trim(),
      url: String(candidate['url'] ?? '').trim(),
      alt: String(candidate['alt'] ?? '').trim(),
      folder,
      storagePath: String(candidate['storagePath'] ?? '').trim(),
      status: String(candidate['status'] ?? '').trim(),
      deletedAt:
        candidate['deletedAt'] == null ? null : String(candidate['deletedAt']),
      order: this.toFiniteNumber(candidate['order']),
      publishedAt: String(candidate['publishedAt'] ?? '').trim(),
      updatedAt: String(candidate['updatedAt'] ?? '').trim(),
      createdAt: String(candidate['createdAt'] ?? '').trim(),
    };
  }

  private pickCover(items: MediaPublicDoc[]): MediaPublicDoc | undefined {
    return [...items].sort((left, right) => this.sortDocs(left, right))[0];
  }

  private getAssignedRealImage(path: string) {
    const assignedImage = getRealImageDefinition(path);
    if (!assignedImage) {
      return null;
    }

    return validateImageIntent(assignedImage.imageUrl, assignedImage.intent)
      ? assignedImage
      : null;
  }

  private isFallbackOnlyGallery(galleryUrls: string[]): boolean {
    return (
      galleryUrls.length === 0 ||
      galleryUrls.every((url) => !url || url === MEDIA_PUBLIC_FALLBACK_IMAGE)
    );
  }

  private sortDocs(left: MediaPublicDoc, right: MediaPublicDoc): number {
    const coverWeight =
      Number(this.isCoverAsset(right)) - Number(this.isCoverAsset(left));
    if (coverWeight !== 0) {
      return coverWeight;
    }

    const orderWeight = (right.order ?? 0) - (left.order ?? 0);
    if (orderWeight !== 0) {
      return orderWeight;
    }

    return String(right.createdAt ?? '').localeCompare(
      String(left.createdAt ?? ''),
    );
  }

  private isCoverAsset(item: MediaPublicDoc): boolean {
    const storagePath = String(item.storagePath ?? '').toLowerCase();
    const name = String(item.name ?? '').toLowerCase();
    return (
      /(^|\/)cover(\.[a-z0-9]+)?$/i.test(storagePath) ||
      /^cover(\.[a-z0-9]+)?$/i.test(name)
    );
  }

  private toFiniteNumber(value: unknown): number | undefined {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  private normalizeFolder(folder: string | null | undefined): string {
    return String(folder ?? '')
      .trim()
      .replace(/^\/+|\/+$/g, '')
      .replace(/\/{2,}/g, '/');
  }

  private normalizeFolderSegment(segment: string | null | undefined): string {
    return String(segment ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, 'y')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
