import { Injectable, signal } from '@angular/core';
import { Gallery, GalleryCollection, GalleryMediaReference, GalleryStatus } from './gallery.models';

const weddingCover = 'https://images.unsplash.com/photo-1541602765605-c21290830624?auto=format&fit=crop&w=1600&q=80';
const demoItems: GalleryMediaReference[] = [
  ['p1','1519741497674-611481863552','Getting Ready','bride-portrait.jpg'],
  ['p2','1511285560929-80b456fea0bc','Ceremonia','ceremony.jpg'],
  ['p3','1519225421980-715cb0215aed','Sesión de novios','couple.jpg'],
  ['p4','1518843875459-f738682238a6','Getting Ready','details.jpg'],
  ['p5','1514525253161-7a46d19cd819','Familia','family.jpg'],
  ['p6','1511578314322-379afb476865','Recepción','reception.jpg']
].map(([id, image, collection, filename], index) => ({
  id, mediaAssetId: `media-${id}`, filename, collectionId: `c${['Getting Ready','Ceremonia','Sesión de novios','Familia','Recepción','Fiesta'].indexOf(collection) + 1}`,
  url: `https://images.unsplash.com/photo-${image}?auto=format&fit=crop&w=1200&q=80`, favorite: index === 0
}));

const demoCollections: GalleryCollection[] = [
  { id: 'c1', name: 'Getting Ready', count: 48, tagline: 'Los momentos antes del sí.', visible: true, order: 0 },
  { id: 'c2', name: 'Ceremonia', count: 72, tagline: 'La promesa.', visible: true, order: 1 },
  { id: 'c3', name: 'Sesión de novios', count: 36, visible: true, order: 2 },
  { id: 'c4', name: 'Familia', count: 24, visible: true, order: 3 },
  { id: 'c5', name: 'Recepción', count: 41, visible: true, order: 4 },
  { id: 'c6', name: 'Fiesta', count: 26, visible: true, order: 5 }
];

const demoGallery: Gallery = {
  id: 'gal-001', token: 'marcela-andres', title: 'Boda Marcela & Andrés', subtitle: 'Wedding Collection', client: 'Laura Martínez', event: 'Boda hotel Intercontinental', type: 'Wedding', date: '18 Jul 2026', location: 'Medellín, Colombia', description: 'Galería privada de la boda de Marcela & Andrés.', status: 'Published', cover: weddingCover, totalPhotos: 247, views: 84, collections: demoCollections, items: demoItems,
  settings: { access: 'Private link', expiresAt: '18 Oct 2026', allowDownloads: true, allowFavorites: true, allowSelections: true, allowComments: true, allowSocialSharing: true, watermark: false, selectionTarget: 40, layout: 'masonry' },
  access: 'Private link', expiry: '18 Oct 2026', selectionTarget: 40, selection: { status: 'Submitted', itemIds: ['p1', 'p4'], submittedAt: '2026-08-11T17:42:00-05:00', version: 1 }
};

@Injectable({ providedIn: 'root' })
export class GalleryRepository {
  private readonly state = signal<Gallery[]>([demoGallery]);
  readonly galleries = this.state.asReadonly();
  gallery(id: string | null | undefined): Gallery { return this.state().find(item => item.id === id || item.token === id) ?? this.state()[0]; }
  update(id: string, patch: Partial<Gallery>): void { this.state.update(items => items.map(item => item.id === id ? { ...item, ...patch } : item)); }
  updateStatus(id: string, status: GalleryStatus): void { this.update(id, { status }); }
  addCollection(id: string, collection: GalleryCollection): void { this.state.update(items => items.map(g => g.id === id ? { ...g, collections: [...g.collections, collection] } : g)); }
  updateCollection(id: string, collectionId: string, patch: Partial<GalleryCollection>): void { this.state.update(items => items.map(g => g.id === id ? { ...g, collections: g.collections.map(c => c.id === collectionId ? { ...c, ...patch } : c) } : g)); }
  removeCollection(id: string, collectionId: string): void { this.state.update(items => items.map(g => g.id === id ? { ...g, collections: g.collections.filter(c => c.id !== collectionId), items: g.items.map(item => item.collectionId === collectionId ? { ...item, collectionId: '' } : item) } : g)); }
  reorderCollections(id: string, collectionIds: string[]): void { this.state.update(items => items.map(g => g.id === id ? { ...g, collections: collectionIds.map((collectionId, order) => { const c = g.collections.find(item => item.id === collectionId); return c ? { ...c, order } : null; }).filter((c): c is GalleryCollection => !!c) } : g)); }
  setCover(id: string, url: string): void { this.update(id, { cover: url }); }
  submitSelection(id: string, itemIds: string[], comment?: string): void { this.update(id, { status: 'Selection Submitted', selection: { status: 'Submitted', itemIds, submittedAt: new Date().toISOString(), version: (this.gallery(id).selection?.version ?? 0) + 1, comment } }); }
  approveSelection(id: string): void { const current = this.gallery(id).selection; if (current) this.update(id, { status: 'Delivered', selection: { ...current, status: 'Approved' } }); }
  requestSelectionChanges(id: string, comment: string): void { const current = this.gallery(id).selection; if (current) this.update(id, { status: 'Selection Required', selection: { ...current, status: 'Changes Requested', comment } }); }
  archive(id: string): void { this.updateStatus(id, 'Archived'); }
  restore(id: string): void { this.updateStatus(id, 'Draft'); }
  duplicate(id: string): Gallery { const source = this.gallery(id); return this.create({ title: `${source.title} copia`, client: source.client, event: source.event, type: source.type, description: source.description, location: source.location, settings: { ...source.settings }, collections: source.collections.map((c, order) => ({ ...c, id: `${c.id}-copy-${Date.now()}-${order}`, order })) }); }
  addItems(id: string, items: GalleryMediaReference[]): void { this.state.update(all => all.map(g => g.id === id ? { ...g, items: [...g.items, ...items], totalPhotos: g.totalPhotos + items.length } : g)); }
  moveItems(id: string, itemIds: string[], collectionId: string): void { this.state.update(all => all.map(g => g.id === id ? { ...g, items: g.items.map(item => itemIds.includes(item.id) ? { ...item, collectionId } : item) } : g)); }
  create(input: Pick<Gallery, 'title' | 'client' | 'event' | 'type' | 'description' | 'location'> & { settings?: Partial<Gallery['settings']>; collections?: GalleryCollection[] }): Gallery {
    const id = `gal-${String(this.state().length + 1).padStart(3, '0')}`;
    const settings: Gallery['settings'] = { ...demoGallery.settings, ...input.settings };
    const gallery: Gallery = { id, token: id, title: input.title, subtitle: 'Gallery Collection', client: input.client, event: input.event, type: input.type, date: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }), location: input.location, description: input.description, status: 'Draft', cover: weddingCover, totalPhotos: 0, views: 0, collections: input.collections ?? [], items: [], settings, access: settings.access, expiry: settings.expiresAt, selectionTarget: settings.selectionTarget };
    this.state.update(items => [gallery, ...items]);
    return gallery;
  }
}
