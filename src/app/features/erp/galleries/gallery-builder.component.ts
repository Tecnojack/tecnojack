import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faCheck,
  faCopy,
  faDownload,
  faEye,
  faFolderOpen,
  faGlobe,
  faPlus,
  faRefresh,
  faShareAlt,
  faTrash,
  faUpload,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { GalleryRepository } from './data-access/gallery.repository';
import { GalleryUploadService } from './data-access/gallery-upload.service';

interface BuilderCollection {
  id: string;
  name: string;
  count: number;
  tagline?: string;
  cover?: string;
  visible?: boolean;
}

interface BuilderPhoto {
  id: string;
  url: string;
  collection: string;
}

interface BuilderGallery {
  id: string;
  title: string;
  client: string;
  event: string;
  status: string;
  access: string;
  expiry: string;
  selectionTarget: number;
  totalPhotos: number;
  views: number;
  cover: string;
  collections: BuilderCollection[];
}

interface BuilderAction {
  label: string;
  value: string;
}

const GALLERIES: BuilderGallery[] = [
  {
    id: 'gal-001',
    title: 'Boda Marcela & Andrés',
    client: 'Laura Martínez',
    event: 'Boda hotel Intercontinental',
    status: 'Published',
    access: 'Private link',
    expiry: '18 Oct 2026',
    selectionTarget: 40,
    totalPhotos: 247,
    views: 84,
    cover: 'https://images.unsplash.com/photo-1541602765605-c21290830624?auto=format&fit=crop&w=1400&q=80',
    collections: [
      { id: 'c1', name: 'Getting Ready', count: 48, tagline: 'Los momentos antes del sí.' },
      { id: 'c2', name: 'Ceremonia', count: 72, tagline: 'La promesa.' },
      { id: 'c3', name: 'Sesión de novios', count: 36 },
      { id: 'c4', name: 'Familia', count: 24 },
      { id: 'c5', name: 'Recepción', count: 41 },
      { id: 'c6', name: 'Fiesta', count: 26 }
    ]
  },
  {
    id: 'gal-004',
    title: 'Quinceañera Isabella Cano',
    client: 'Familia Cano',
    event: 'Quince años Isabella',
    status: 'Selection Required',
    access: 'Password',
    expiry: '14 Nov 2026',
    selectionTarget: 30,
    totalPhotos: 153,
    views: 21,
    cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80',
    collections: [
      { id: 'q1', name: 'Sesión exterior', count: 64 },
      { id: 'q2', name: 'Fiesta', count: 89 }
    ]
  }
];

@Component({
  selector: 'tj-gallery-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './gallery-builder.component.html',
  styleUrl: './gallery-builder.component.scss'
})
export class GalleryBuilderComponent {
  readonly icons = {
    back: faArrowLeft,
    check: faCheck,
    copy: faCopy,
    download: faDownload,
    eye: faEye,
    folder: faFolderOpen,
    globe: faGlobe,
    plus: faPlus,
    refresh: faRefresh,
    share: faShareAlt,
    trash: faTrash,
    upload: faUpload,
    close: faXmark
  };

  readonly collections = signal<BuilderCollection[]>([
    { id: 'c1', name: 'Getting Ready', count: 48, tagline: 'Los momentos antes del sí.' },
    { id: 'c2', name: 'Ceremonia', count: 72, tagline: 'La promesa.' },
    { id: 'c3', name: 'Sesión de novios', count: 36 },
    { id: 'c4', name: 'Familia', count: 24 },
    { id: 'c5', name: 'Recepción', count: 41 },
    { id: 'c6', name: 'Fiesta', count: 26 }
  ]);
  readonly activeCollection = signal<string | null>(null);
  readonly activePhoto = signal<string | null>(null);
  readonly selected = signal<string[]>(['p1', 'p4']);
  readonly showUpload = signal(false);
  readonly showMediaPicker = signal(false);
  readonly mediaSearch = signal('');
  readonly selectedMedia = signal<string[]>([]);
  readonly mediaAssets = [
    { id: 'media-library-1', filename: 'wedding-details.jpg', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80' },
    { id: 'media-library-2', filename: 'ceremony-wide.jpg', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80' },
    { id: 'media-library-3', filename: 'couple-session.jpg', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80' },
    { id: 'media-library-4', filename: 'reception.jpg', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80' }
  ];
  readonly filteredMediaAssets = computed(() => this.mediaAssets.filter(asset => asset.filename.toLowerCase().includes(this.mediaSearch().toLowerCase())));
  readonly showPublish = signal(false);
  readonly showCollectionCreate = signal(false);
  readonly showReview = signal(false);
  readonly showSubmit = signal(false);
  readonly published = signal(false);
  readonly submittedSelection = signal(true);
  readonly inspectorTab = signal<'general' | 'access' | 'delivery'>('general');
  readonly sidebarVisible = signal(true);
  readonly inspectorVisible = signal(true);
  readonly newCollectionName = signal('');
  readonly newPhotoUrl = signal('');
  readonly selectedSubmitted = signal(true);
  readonly sharedSelection = computed(() => this.gallery().selection);
  readonly downloadReady = signal(false);
  readonly feedback = signal('');
  readonly activeCollectionMenu = signal<string | null>(null);
  readonly uploadFiles = signal<File[]>([]);
  readonly collectionActions: BuilderAction[] = [
    { label: 'Crear colección', value: 'create' },
    { label: 'Renombrar', value: 'rename' },
    { label: 'Duplicar', value: 'duplicate' },
    { label: 'Eliminar', value: 'delete' },
    { label: 'Ocultar', value: 'hide' }
  ];
  readonly photos = signal<BuilderPhoto[]>([
    { id: 'p1', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80', collection: 'c1' },
    { id: 'p2', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80', collection: 'c2' },
    { id: 'p3', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80', collection: 'c3' },
    { id: 'p4', url: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=80', collection: 'c1' }
  ]);

  readonly gallery = computed(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? 'gal-001';
    return this.repository.gallery(id);
  });

  readonly visibleCollections = computed(() => this.collections());
  readonly activeCollectionName = computed(() => {
    const active = this.activeCollection();
    if (!active) return 'Todas las fotos';
    return this.collections().find((collection) => collection.id === active)?.name ?? 'Colección';
  });

  readonly visiblePhotos = computed(() => {
    const active = this.activeCollection();
    return this.photos().filter((photo) => !active || photo.collection === active);
  });

  readonly reviewPhotos = computed(() => this.photos().filter((photo) => this.selected().includes(photo.id)));

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly repository: GalleryRepository, readonly uploadService: GalleryUploadService) {
    effect(() => {
      const shared = this.repository.gallery(this.route.snapshot.paramMap.get('id'));
      if (shared.collections.length) this.collections.set(shared.collections.map(collection => ({ ...collection })));
    });
  }

  back(): void {
    void this.router.navigate(['/app/galleries']);
  }

  openClient(): void {
    void this.router.navigate(['/app/galleries/client', this.gallery().id]);
  }
  openPreview(): void { void this.router.navigate(['/app/galleries/preview', this.gallery().id]); }

  toggleSelection(id: string): void {
    this.selected.update((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  moveSelectedTo(collectionId: string): void {
    const selectedIds = this.selected();
    this.photos.update((items) =>
      items.map((photo) => (selectedIds.includes(photo.id) ? { ...photo, collection: collectionId } : photo))
    );
    this.selected.set([]);
    this.repository.moveItems(this.gallery().id, selectedIds, collectionId);
  }

  createPhoto(): void {
    const url = this.newPhotoUrl().trim();
    if (!url) return;
    const collection = this.activeCollection() ?? this.collections()[0]?.id ?? 'c1';
    const nextId = `p${this.photos().length + 1}`;
    this.photos.update((items) => [...items, { id: nextId, url, collection }]);
    this.repository.addItems(this.gallery().id, [{ id: nextId, mediaAssetId: `media-${nextId}`, filename: `photo-${nextId}.jpg`, url, collectionId: collection }]);
    this.selected.update((items) => [...items, nextId]);
    this.showUpload.set(false);
    this.newPhotoUrl.set('');
  }

  changeVisibility(): void { this.showPublish.set(true); }
  async copyLink(): Promise<void> { const link = `${window.location.origin}/gallery/${this.gallery().token}`; await navigator.clipboard?.writeText(link); this.feedback.set('Enlace copiado'); window.setTimeout(() => this.feedback.set(''), 1800); }
  togglePublished(): void { if (this.published() || this.gallery().status === 'Published') { this.repository.updateStatus(this.gallery().id, 'Draft'); this.published.set(false); this.feedback.set('Galería despublicada'); } else { this.showPublish.set(true); } }

  publish(): void {
    this.published.set(true);
    this.showPublish.set(false);
    this.repository.updateStatus(this.gallery().id, 'Published');
  }

  toggleSidebar(): void {
    this.sidebarVisible.update((value) => !value);
  }

  toggleInspector(): void {
    this.inspectorVisible.update((value) => !value);
  }

  createCollection(): void {
    const name = this.newCollectionName().trim();
    if (!name) return;
    const nextIndex = this.collections().length + 1;
    const created = { id: `c${this.collections().length + 1}`, name, count: 0, tagline: 'Lista para organizar', visible: true };
    this.collections.update((items) => [
      ...items,
      { ...created }
    ]);
    this.repository.addCollection(this.gallery().id, { ...created, order: this.collections().length });
    this.activeCollection.set(created.id);
    this.newCollectionName.set('');
    this.showCollectionCreate.set(false);
  }

  deleteCollection(id: string): void {
    if (this.collections().length <= 1) return;
    this.collections.update((items) => items.filter((item) => item.id !== id));
    this.repository.removeCollection(this.gallery().id, id);
    if (this.activeCollection() === id) this.activeCollection.set(null);
  }

  duplicateCollection(id: string): void {
    const col = this.collections().find((item) => item.id === id);
    if (!col) return;
    const nextId = `c${this.collections().length + 1}`;
    this.collections.update((items) => [...items, { ...col, id: nextId, name: `${col.name} copia` }]);
    this.repository.addCollection(this.gallery().id, { ...col, id: nextId, name: `${col.name} copia`, visible: col.visible !== false, order: this.collections().length });
  }

  toggleCollectionVisible(id: string): void {
    this.collections.update((items) => items.map((item) => item.id === id ? { ...item, visible: item.visible !== false } : item));
    const updated = this.collections().find(item => item.id === id);
    if (updated) this.repository.updateCollection(this.gallery().id, id, { visible: updated.visible });
  }

  setCover(photoId: string): void {
    this.activePhoto.set(photoId);
    const photo = this.photos().find(item => item.id === photoId);
    if (photo) this.repository.setCover(this.gallery().id, photo.url);
  }

  openReview(): void {
    this.showReview.set(true);
  }

  requestChanges(): void {
    this.showReview.set(false);
    this.repository.requestSelectionChanges(this.gallery().id, 'El estudio solicitó una nueva revisión de la selección.');
    this.selectedSubmitted.set(false);
  }

  approveSelection(): void {
    this.repository.approveSelection(this.gallery().id);
    this.showReview.set(false);
    this.selectedSubmitted.set(false);
  }

  createGallery(): void {
    this.showUpload.set(true);
  }

  updateNewPhotoUrl(value: string): void {
    this.newPhotoUrl.set(value);
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    this.uploadFiles.set(files);
    this.uploadService.add(files);
  }

  onDropFiles(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : [];
    this.uploadFiles.set(files);
    this.uploadService.add(files);
  }

  removeUploadFile(file: File): void { this.uploadFiles.update(files => files.filter(item => item !== file)); }

  readonly uploadQueue = this.uploadService.queue.asReadonly();
  readonly canConfirmUploads = computed(() => this.uploadQueue().some(item => item.status === 'Ready'));

  confirmUploads(): void {
    const collectionId = this.activeCollection() ?? this.collections()[0]?.id ?? 'c1';
    const ready = this.uploadQueue().filter(item => item.status === 'Ready');
    if (!ready.length) return;
    const items = ready.map((upload, index) => ({ id: `upload-${upload.id}`, mediaAssetId: `media-upload-${upload.id}`, filename: upload.file.name, url: upload.preview, collectionId }));
    this.photos.update(current => [...current, ...items.map(item => ({ id: item.id, url: item.url, collection: item.collectionId }))]);
    this.repository.addItems(this.gallery().id, items);
    this.uploadService.clearReady();
    this.uploadFiles.set([]);
    this.showUpload.set(false);
  }

  toggleMediaAsset(id: string): void { this.selectedMedia.update(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id]); }
  confirmMediaSelection(): void {
    const collectionId = this.activeCollection() ?? this.collections()[0]?.id ?? 'c1';
    const selected = this.mediaAssets.filter(asset => this.selectedMedia().includes(asset.id));
    if (!selected.length) return;
    const items = selected.map((asset, index) => ({ id: `media-ref-${asset.id}-${Date.now()}-${index}`, mediaAssetId: asset.id, filename: asset.filename, url: asset.url, collectionId }));
    this.photos.update(current => [...current, ...items.map(item => ({ id: item.id, url: item.url, collection: item.collectionId }))]);
    this.repository.addItems(this.gallery().id, items);
    this.selectedMedia.set([]); this.mediaSearch.set(''); this.showMediaPicker.set(false); this.showUpload.set(false);
  }

  updateNewCollectionName(value: string): void {
    this.newCollectionName.set(value);
  }
}
