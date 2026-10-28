import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowUpRightFromSquare,
  faCamera,
  faEye,
  faLock,
  faPlus,
  faSearch,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import { GalleryRepository } from './data-access/gallery.repository';

type GalleryStatus = 'Publicada' | 'Borrador' | 'Selección requerida' | 'Entregada' | 'Archived';
type GalleryType = 'Wedding' | 'Corporate' | 'Music' | 'Quinceañera';

interface GalleryRecord {
  id: string;
  title: string;
  client: string;
  type: GalleryType;
  date: string;
  photos: number;
  collections: number;
  views: number;
  status: GalleryStatus;
  event: string;
  location: string;
  cover: string;
  description: string;
  visibility: 'Privada' | 'Pública';
  publishedAt?: string;
  albums: Array<{ name: string; photos: number; locked?: boolean }>;
  highlights: string[];
}

interface NewGalleryForm {
  title: string;
  client: string;
  event: string;
  type: GalleryType;
  description: string;
  location: string;
  access: 'Private link' | 'Password protected' | 'Client account' | 'Public';
  password: string;
  expiry: string;
  allowDownloads: boolean;
  allowFavorites: boolean;
  allowSelections: boolean;
}

@Component({
  selector: 'tj-galleries-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './galleries-manager.component.html',
  styleUrl: './galleries-manager.component.scss'
})
export class GalleriesManagerComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly repository: GalleryRepository
  ) {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      if (params.get('create') === '1') {
        this.openCreate();
        void this.router.navigate([], { relativeTo: this.route, queryParams: {}, queryParamsHandling: '' });
      }
    });
  }
  readonly icons = {
    camera: faCamera,
    eye: faEye,
    lock: faLock,
    plus: faPlus,
    search: faSearch,
    share: faShareAlt,
    open: faArrowUpRightFromSquare
  };

  private readonly albumPreviewImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=160&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=160&q=80',
    'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=160&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=160&q=80',
    'https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21b?auto=format&fit=crop&w=160&q=80'
  ];

  getAlbumPreview(item: GalleryRecord, index: number): string {
    return this.albumPreviewImages[(index + item.id.length) % this.albumPreviewImages.length];
  }

  readonly search = signal('');
  readonly statusFilter = signal<'all' | GalleryStatus>('all');
  readonly selectedId = signal<string>('gal-001');
  readonly createOpen = signal(false);
  readonly activeMenu = signal<string | null>(null);
  readonly createStep = signal(1);
  readonly newGallery = signal<NewGalleryForm>({
    title: '',
    client: '',
    event: '',
    type: 'Wedding',
    description: '',
    location: '',
    access: 'Private link',
    password: '',
    expiry: '',
    allowDownloads: true,
    allowFavorites: true,
    allowSelections: true
  });
  readonly createCollections = signal([
    { id: 'new-c1', name: 'Getting Ready' },
    { id: 'new-c2', name: 'Ceremonia' },
    { id: 'new-c3', name: 'Recepción' }
  ]);
  readonly newCollectionName = signal('');

  readonly galleries = signal<GalleryRecord[]>([
    {
      id: 'gal-001',
      title: 'Boda Marcela & Andrés',
      client: 'Laura Martínez',
      type: 'Wedding',
      date: '18 Jul 2026',
      photos: 247,
      collections: 6,
      views: 84,
      status: 'Publicada',
      event: 'Boda hotel Intercontinental',
      location: 'Medellín, Colombia',
      cover: 'https://images.unsplash.com/photo-1541602765605-c21290830624?auto=format&fit=crop&w=1200&q=80',
      description: 'galería privada con Selección final curada, lista para compartir con los invitados y descargar en alta calidad.',
      visibility: 'Pública',
      publishedAt: '20 Jul 2026',
      albums: [
        { name: 'Preparativos', photos: 42, locked: false },
        { name: 'Ceremonia', photos: 61, locked: false },
        { name: 'Recepción', photos: 88, locked: false },
        { name: 'Edición premium', photos: 56, locked: true }
      ],
      highlights: ['Entrega elegante', 'Acceso por link', 'Marca de agua opcional']
    },
    {
      id: 'gal-002',
      title: 'Nike Launch - Lanzamiento',
      client: 'Nike Colombia',
      type: 'Corporate',
      date: '28 Jun 2026',
      photos: 247,
      collections: 3,
      views: 342,
      status: 'Entregada',
      event: 'Lanzamiento de marca',
      location: 'Bogotá, Colombia',
      cover: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
      description: 'Cobertura corporativa con foco en narrativa de marca, prensa y assets de difusión para equipo interno.',
      visibility: 'Privada',
      publishedAt: '29 Jun 2026',
      albums: [
        { name: 'Lobby & activación', photos: 51 },
        { name: 'Producto', photos: 74 },
        { name: 'Equipo', photos: 37, locked: true }
      ],
      highlights: ['Entrega al cliente', 'Selección por álbum', 'Acceso restringido']
    },
    {
      id: 'gal-003',
      title: 'Video Maluma - Behind The Scenes',
      client: 'Sony Music Colombia',
      type: 'Music',
      date: '15 Jun 2026',
      photos: 89,
      collections: 2,
      views: 0,
      status: 'Borrador',
      event: 'Grabación audiovisual',
      location: 'Medellín, Colombia',
      cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
      description: 'Sesión aún en edición y selección de tomas. Preparada para revisión interna antes de publicar.',
      visibility: 'Privada',
      albums: [
        { name: 'Sesión principal', photos: 49 },
        { name: 'B-roll', photos: 40, locked: true }
      ],
      highlights: ['Pendiente de aprobación', 'Sin publicación', 'Revisión creativa']
    },
    {
      id: 'gal-004',
      title: 'Quinceañera Isabella Cano',
      client: 'Familia Cano',
      type: 'Quinceañera',
      date: '14 Ago 2026',
      photos: 153,
      collections: 2,
      views: 21,
      status: 'Selección requerida',
      event: 'Quince años Isabella',
      location: 'Rionegro, Antioquia',
      cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      description: 'El cliente debe elegir su Selección final para poder publicar la galería completa.',
      visibility: 'Privada',
      albums: [
        { name: 'Sesión exterior', photos: 64 },
        { name: 'Fiesta', photos: 89, locked: true }
      ],
      highlights: ['Selección pendiente', 'Acceso privado', 'Listo para entregar']
    }
  ]);

  readonly filteredGalleries = computed(() => {
    const search = this.normalize(this.search());
    const status = this.statusFilter();
    return this.galleries().filter((gallery) => {
      const matchesStatus = status === 'all' || gallery.status === status;
      const haystack = this.normalize([
        gallery.title,
        gallery.client,
        gallery.event,
        gallery.location,
        gallery.type,
        gallery.status
      ].join(' '));
      return matchesStatus && (!search || haystack.includes(search));
    });
  });

  readonly selectedGallery = computed(
    () => this.galleries().find((gallery) => gallery.id === this.selectedId()) ?? this.filteredGalleries()[0] ?? null
  );

  readonly stats = computed(() => {
    const items = this.galleries();
    return {
      total: items.length,
      published: items.filter((item) => item.status === 'Publicada').length,
      pending: items.filter((item) => item.status === 'Selección requerida').length,
      photos: items.reduce((sum, item) => sum + item.photos, 0)
    };
  });

  selectGallery(id: string): void {
    this.selectedId.set(id);
  }

  trackByGalleryId(_: number, gallery: GalleryRecord): string {
    return gallery.id;
  }

  openSelected(): void {
    const selected = this.selectedGallery();
    if (selected) {
      void this.router.navigate(['/app/galleries/builder', selected.id]);
    }
  }

  openBuilder(id: string): void {
    void this.router.navigate(['/app/galleries/builder', id]);
  }

  openClient(id: string): void {
    void this.router.navigate(['/app/galleries/client', id]);
  }
  toggleMenu(id: string): void { this.activeMenu.update(current => current === id ? null : id); }
  duplicateGallery(id: string): void { const copy = this.repository.duplicate(id); this.activeMenu.set(null); this.selectedId.set(copy.id); }
  archiveGallery(id: string): void { if (window.confirm('¿Archivar esta galería?')) { this.repository.archive(id); this.activeMenu.set(null); } }
  restoreGallery(id: string): void { this.repository.restore(id); this.activeMenu.set(null); }
  async copyGalleryLink(id: string): Promise<void> { const gallery = this.repository.gallery(id); await navigator.clipboard?.writeText(`${window.location.origin}/gallery/${gallery.token}`); this.activeMenu.set(null); }

  openCreate(): void {
    this.createOpen.set(true);
    this.createStep.set(1);
  }

  closeCreate(): void {
    this.createOpen.set(false);
    this.createStep.set(1);
  }

  updateNewGallery<K extends keyof NewGalleryForm>(key: K, value: NewGalleryForm[K]): void {
    this.newGallery.update((current) => ({ ...current, [key]: value }));
  }

  createGallery(): void {
    const form = this.newGallery();
    if (!form.title.trim() || !form.client.trim()) return;
    const id = `gal-${String(this.galleries().length + 1).padStart(3, '0')}`;
    const created = this.repository.create({
      title: form.title.trim(), client: form.client.trim(), event: form.event.trim() || 'Nueva galería', type: form.type,
      description: form.description.trim(), location: form.location.trim() || 'Medellín, Colombia',
      settings: { access: form.access, password: form.password, expiresAt: form.expiry, allowDownloads: form.allowDownloads, allowFavorites: form.allowFavorites, allowSelections: form.allowSelections },
      collections: this.createCollections().map((collection, order) => ({ id: collection.id, name: collection.name, count: 0, order, visible: true }))
    });
    const item: GalleryRecord = {
      id,
      title: form.title.trim(),
      client: form.client.trim(),
      type: form.type,
      date: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
      photos: 0,
      collections: 0,
      views: 0,
      status: 'Borrador',
      event: form.event.trim() || 'Nueva galería',
      location: form.location.trim() || 'Medellín, Colombia',
      cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      description: form.description.trim() || 'galería creada localmente desde el mÃ³dulo para continuar la producciÃ³n.',
      visibility: 'Privada',
      albums: [],
      highlights: ['Borrador local', 'Pendiente de fotos', 'Lista para organizar']
    };
    this.galleries.set([item, ...this.galleries()]);
    this.selectedId.set(created.id);
    this.createOpen.set(false);
    this.newGallery.set({
      title: '',
      client: '',
      event: '',
      type: 'Wedding',
      description: '',
      location: '',
      access: 'Private link',
      password: '',
      expiry: '',
      allowDownloads: true,
      allowFavorites: true,
      allowSelections: true
    });
    void this.router.navigate(['/app/galleries/builder', created.id]);
  }

  nextCreateStep(): void {
    this.createStep.update((step) => Math.min(step + 1, 4));
  }

  prevCreateStep(): void {
    this.createStep.update((step) => Math.max(step - 1, 1));
  }

  addCreateCollection(): void {
    const name = this.newCollectionName().trim();
    if (!name) return;
    this.createCollections.update((items) => [...items, { id: `new-${Date.now()}`, name }]);
    this.newCollectionName.set('');
  }

  removeCreateCollection(id: string): void {
    this.createCollections.update((items) => items.filter((item) => item.id !== id));
  }

  submitCreateWizard(): void {
    this.createGallery();
  }

  setStatusFilter(value: 'all' | GalleryStatus): void {
    this.statusFilter.set(value);
  }

  toggleVisibility(): void {
    const current = this.selectedGallery();
    if (!current) return;

    const updated: GalleryRecord[] = this.galleries().map((gallery) =>
      gallery.id === current.id
        ? {
            ...gallery,
            visibility: gallery.visibility === 'Pública' ? 'Privada' : 'Pública',
            status: gallery.visibility === 'Pública' ? 'Borrador' : 'Publicada'
          }
        : gallery
    );
    this.galleries.set(updated);
  }

  private normalize(value: string): string {
    return String(value ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}

