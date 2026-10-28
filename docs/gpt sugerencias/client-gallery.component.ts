import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, computed, HostListener, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faDownload,
  faHeart,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { GalleryRepository } from './data-access/gallery.repository';
import { GalleryDownloadService } from './data-access/gallery-download.service';

interface ClientPhoto { id: string; url: string; collection: string; }

const DATA = {
  title: 'Boda Marcela & Andrés',
  subtitle: 'Wedding Collection',
  date: '18 · 07 · 2026',
  cover: 'https://images.unsplash.com/photo-1541602765605-c21290830624?auto=format&fit=crop&w=1600&q=80',
  collections: [
    { id: 'all', name: 'Todas' },
    { id: 'c1', name: 'Getting Ready' },
    { id: 'c2', name: 'Ceremonia' },
    { id: 'c3', name: 'Sesión de novios' },
    { id: 'c4', name: 'Familia' },
    { id: 'c5', name: 'Recepción' },
    { id: 'c6', name: 'Fiesta' }
  ]
};

@Component({
  selector: 'tj-client-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './client-gallery.component.html',
  styleUrl: './client-gallery.component.scss'
})
export class ClientGalleryComponent {
  readonly DATA = DATA;
  readonly icons = {
    back: faArrowLeft,
    chevronLeft: faChevronLeft,
    chevronRight: faChevronRight,
    check: faCheck,
    download: faDownload,
    heart: faHeart,
    close: faXmark
  };

  readonly activeCollection = signal('all');
  readonly favorites = signal<string[]>([]);
  readonly selections = signal<string[]>([]);
  readonly showLightbox = signal(false);
  readonly lightboxIndex = signal(0);
  readonly phase = signal<'cover'|'gallery'|'submitted'>('cover');
  readonly previewDevice = signal<'desktop' | 'tablet' | 'mobile'>('desktop');
  readonly isPreview = computed(() => this.router.url.includes('/preview/'));
  readonly showFavoritesOnly = signal(false);
  readonly showSelectionMode = signal(false);
  readonly showReview = signal(false);
  readonly showSubmit = signal(false);
  readonly submitted = signal(false);
  readonly passwordInput = signal('');
  readonly accessGranted = signal(false);
  readonly accessError = signal(false);
  readonly accessGallery = computed(() => this.repository.gallery(this.route.snapshot.paramMap.get('id')));
  readonly isExpired = computed(() => { const expiry = this.accessGallery().settings.expiresAt; return this.accessGallery().status === 'Expired' || (!!expiry && new Date(expiry).getTime() < Date.now()); });
  readonly showDownload = signal<string | null>(null);
  readonly downloadReady = signal(false);
  readonly downloadJob = computed(() => this.downloadService.latest(this.route.snapshot.paramMap.get('id') ?? 'gal-001'));

  readonly photos = signal<ClientPhoto[]>([
    { id: 'p1', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', collection: 'c1' },
    { id: 'p2', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', collection: 'c2' },
    { id: 'p3', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80', collection: 'c3' },
    { id: 'p4', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80', collection: 'c4' },
    { id: 'p5', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80', collection: 'c5' },
    { id: 'p6', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80', collection: 'c6' }
  ]);

  readonly visiblePhotos = computed(() => {
    const active = this.activeCollection();
    const base = active === 'all' ? this.photos() : this.photos().filter((photo) => photo.collection === active);
    return this.showFavoritesOnly() ? base.filter((photo) => this.favorites().includes(photo.id)) : base;
  });

  readonly currentPhoto = computed(() => this.visiblePhotos()[this.lightboxIndex()] ?? this.visiblePhotos()[0] ?? null);
  readonly selectedPhotos = computed(() => this.photos().filter((photo) => this.selections().includes(photo.id)));
  readonly activeCollectionTitle = computed(
    () => this.DATA.collections.find((collection) => collection.id === this.activeCollection())?.name ?? 'Todas'
  );

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly repository: GalleryRepository, private readonly downloadService: GalleryDownloadService) {
    const gallery = this.repository.gallery(this.route.snapshot.paramMap.get('id'));
    this.DATA = { ...DATA, title: gallery.title, subtitle: gallery.subtitle, date: gallery.date, cover: gallery.cover, collections: [{ id: 'all', name: 'Todas' }, ...gallery.collections.map(collection => ({ id: collection.id, name: collection.name }))] };
  }

  back(): void {
    void this.router.navigate(['/app/galleries/builder', this.route.snapshot.paramMap.get('id') ?? 'gal-001']);
  }

  openGallery(): void {
    if (this.isExpired()) return;
    if (this.accessGallery().settings.access === 'Password protected' && !this.accessGranted()) return;
    this.phase.set('gallery');
  }

  enterPassword(): void {
    const expected = this.accessGallery().settings.password || '';
    if (this.passwordInput() && this.passwordInput() === expected) { this.accessGranted.set(true); this.accessError.set(false); this.phase.set('gallery'); }
    else this.accessError.set(true);
  }

  openPhoto(index: number): void {
    this.lightboxIndex.set(index);
    this.showLightbox.set(true);
  }

  toggleFavorite(id: string): void {
    this.favorites.update((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  toggleSelection(id: string): void {
    this.selections.update((items) => {
      if (items.includes(id)) return items.filter((item) => item !== id);
      return items.length >= 40 ? items : [...items, id];
    });
  }

  prev(): void {
    const items = this.visiblePhotos();
    this.lightboxIndex.set((this.lightboxIndex() - 1 + items.length) % items.length);
  }

  next(): void {
    const items = this.visiblePhotos();
    this.lightboxIndex.set((this.lightboxIndex() + 1) % items.length);
  }

  startDownload(scope: 'gallery' | 'favorites' | 'selection' | 'photo' | 'collection' = 'gallery'): void {
    this.downloadService.start(this.route.snapshot.paramMap.get('id') ?? 'gal-001', scope);
    this.downloadReady.set(false);
  }

  confirmSubmission(): void {
    if (this.selections().length < 40) return;
    this.repository.submitSelection(this.route.snapshot.paramMap.get('id') ?? 'gal-001', this.selections());
    this.showSubmit.set(false);
    this.phase.set('submitted');
  }

  isFavorite(id: string): boolean { return this.favorites().includes(id); }
  isSelected(id: string): boolean { return this.selections().includes(id); }

  @HostListener('document:keydown.escape') closeWithEscape(): void { this.showLightbox.set(false); this.showReview.set(false); this.showSubmit.set(false); this.showDownload.set(null); }
}
