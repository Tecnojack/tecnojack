import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ViewChild, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

import { MediaAdminFolderDoc, MediaAdminFolderService } from './media-admin-folder.service';
import { MediaAdminCmsPackageDoc, MediaAdminCmsService } from './media-admin-cms.service';
import { MediaAdminMediaDoc, MediaAdminMediaService } from './media-admin-media.service';

type MediaAdminTile =
  | { kind: 'service'; path: string; label: string }
  | { kind: 'folder'; path: string; label: string; folder: MediaAdminFolderDoc }
  | { kind: 'file'; path: string; label: string; asset: MediaAdminMediaDoc };

@Component({
  selector: 'tj-media-admin-page',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <main class="container ma">
      <header class="header">
        <div class="headerLeft">
          <h1 class="heading-lg">Media Admin</h1>

          <nav class="crumbs" aria-label="Breadcrumb">
            <button class="crumb" type="button" (click)="goHome()">Servicios</button>
            <ng-container *ngFor="let c of breadcrumbs(); trackBy: trackByCrumb">
              <span class="sep">/</span>
              <button class="crumb" type="button" (click)="goToPath(c.path)">{{ c.label }}</button>
            </ng-container>
          </nav>
        </div>

        <div class="headerActions">
          <button class="btn btn--ghost" type="button" [disabled]="!canGoUp()" (click)="goUp()">Subir</button>
          <button class="btn btn--ghost" type="button" [disabled]="!canCreateFolder()" (click)="createFolderPrompt(currentPath())">
            Añadir carpeta
          </button>
          <button class="btn" type="button" [disabled]="!canUploadHere()" (click)="pickUploadToFolder(currentPath())">
            Añadir imagen
          </button>
          <button class="btn" type="button" (click)="logout()">Salir</button>
        </div>
      </header>

      <input
        #folderFileInput
        class="srOnly"
        type="file"
        accept="image/*"
        (change)="onFolderUploadSelected($event)"
      />

      <input
        #packageFileInput
        class="srOnly"
        type="file"
        accept="image/*"
        (change)="onPackageMainSelected($event)"
      />

      <section class="toast" *ngIf="status() || error()">
        <p class="text-body" *ngIf="status()">{{ status() }}</p>
        <p class="text-body" *ngIf="error()">{{ error() }}</p>
      </section>

      <section class="section" *ngIf="showPackages()">
        <header class="sectionHeader">
          <h2 class="heading-md">Imagen principal por paquete</h2>
          <p class="text-body text-muted">1 imagen por paquete (se guarda en la carpeta raíz del servicio).</p>
        </header>

        <div class="tiles">
          <article class="tile tile--package card" *ngFor="let pkg of packages(); trackBy: trackByPackage">
            <div class="tileThumb" (dblclick)="$event.preventDefault()">
              <img *ngIf="packageThumbUrl(pkg) as url; else pkgPlaceholder" [src]="url" [alt]="pkg.name" loading="lazy" />
              <ng-template #pkgPlaceholder>
                <div class="placeholder">Sin imagen</div>
              </ng-template>
            </div>

            <div class="tileName">
              <span class="tag">Paquete</span>
              <span class="name">{{ pkg.name }}</span>
            </div>

            <details class="kebab" (click)="$event.stopPropagation()">
              <summary class="kebabBtn" aria-label="Opciones">⋮</summary>
              <div class="menu">
                <button class="menuItem" type="button" (click)="pickPackageMainImage(pkg)">Añadir / Actualizar</button>
                <button class="menuItem" type="button" [disabled]="!pkg.mediaId" (click)="clearPackageMainImage(pkg)">
                  Eliminar
                </button>
              </div>
            </details>
          </article>
        </div>
      </section>

      <section class="section">
        <header class="sectionHeader">
          <h2 class="heading-md">{{ currentTitle() }}</h2>
          <p class="text-body text-muted" *ngIf="currentPath()">{{ assetsInCurrentFolder().length }} archivos · {{ childFolders().length }} carpetas</p>
        </header>

        <div class="tiles" *ngIf="tiles().length; else empty">
          <article
            class="tile card"
            *ngFor="let item of tiles(); trackBy: trackByTile"
            [class.tile--service]="item.kind === 'service'"
            [class.tile--folder]="item.kind === 'folder'"
            [class.tile--file]="item.kind === 'file'"
            (dblclick)="onTileDblClick(item)"
          >
            <ng-container *ngIf="item.kind === 'file'; else notFile">
              <a class="tileThumb" [href]="item.asset.url" target="_blank" rel="noopener" (click)="$event.stopPropagation()">
                <img [src]="item.asset.url" [alt]="item.asset.alt" loading="lazy" />
              </a>

              <div class="tileName">
                <span class="tag">Imagen</span>
                <span class="name">{{ item.asset.name }}</span>
              </div>

              <details class="kebab" (click)="$event.stopPropagation()">
                <summary class="kebabBtn" aria-label="Opciones">⋮</summary>
                <div class="menu">
                  <button class="menuItem" type="button" (click)="copyUrl(item.asset.url)">Copiar URL</button>
                  <button class="menuItem" type="button" (click)="editAltPrompt(item.asset)">Editar</button>
                  <button class="menuItem menuItem--danger" type="button" (click)="remove(item.asset)">Eliminar</button>
                </div>
              </details>
            </ng-container>

            <ng-template #notFile>
              <div class="tileThumb tileThumb--folder">
                <div class="folderGlyph"></div>
              </div>

              <div class="tileName">
                <span class="tag">{{ item.kind === 'service' ? 'Servicio' : 'Carpeta' }}</span>
                <span class="name">{{ item.label }}</span>
              </div>

              <details class="kebab" (click)="$event.stopPropagation()">
                <summary class="kebabBtn" aria-label="Opciones">⋮</summary>
                <div class="menu">
                  <button class="menuItem" type="button" (click)="goToPath(item.path)">Abrir</button>
                  <button class="menuItem" type="button" (click)="createFolderPrompt(item.path)">Añadir</button>
                  <button class="menuItem" type="button" (click)="pickUploadToFolder(item.path)">Añadir imagen</button>
                  <button class="menuItem" type="button" *ngIf="item.kind === 'folder'" (click)="editFolderNamePrompt(item.folder)">Editar</button>
                  <button
                    class="menuItem menuItem--danger"
                    type="button"
                    *ngIf="item.kind === 'folder'"
                    [disabled]="!canDeleteFolder(item.folder.path)"
                    (click)="deleteFolder(item.folder)"
                  >
                    Eliminar
                  </button>
                </div>
              </details>
            </ng-template>
          </article>
        </div>

        <ng-template #empty>
          <p class="text-body text-muted">No hay elementos para mostrar aquí.</p>
        </ng-template>
      </section>
    </main>
  `,
  styles: [
    `
      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 16px;
      }
      .headerLeft {
        display: grid;
        gap: 6px;
      }
      .headerActions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        justify-content: flex-end;
      }
      .crumbs {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
      }
      .crumb {
        border: 1px solid var(--border-soft);
        border-radius: 999px;
        padding: 6px 10px;
        background: rgba(255, 255, 255, 0.02);
        color: var(--text);
        font: inherit;
        cursor: pointer;
      }
      .crumb:hover {
        border-color: var(--border);
        background: rgba(0, 151, 178, 0.08);
      }
      .sep {
        opacity: 0.65;
      }
      .toast {
        padding: 10px 12px;
        border: 1px solid var(--border-soft);
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        margin-bottom: 16px;
      }
      .section {
        margin-top: 16px;
      }
      .sectionHeader {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
      }
      .tiles {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
        gap: 12px;
      }
      .tile {
        position: relative;
        overflow: hidden;
        padding: 10px;
        cursor: default;
        user-select: none;
      }
      .tile:hover {
        border-color: var(--border);
        background: rgba(0, 151, 178, 0.06);
      }
      .tileThumb {
        border-radius: 14px;
        aspect-ratio: 4 / 3;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.14);
        display: grid;
        place-items: center;
      }
      .tileThumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .tileThumb--folder {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-soft);
      }
      .folderGlyph {
        width: 72px;
        height: 54px;
        border-radius: 12px;
        border: 1px solid var(--border);
        background: rgba(0, 151, 178, 0.1);
        position: relative;
      }
      .folderGlyph::before {
        content: '';
        position: absolute;
        top: -10px;
        left: 10px;
        width: 32px;
        height: 18px;
        border-radius: 10px 10px 0 0;
        border: 1px solid var(--border);
        border-bottom: none;
        background: rgba(0, 151, 178, 0.14);
      }
      .tileName {
        display: grid;
        gap: 4px;
        padding: 10px 2px 2px;
      }
      .tag {
        font-size: 12px;
        opacity: 0.75;
      }
      .name {
        font-weight: 800;
        line-height: 1.2;
        word-break: break-word;
      }
      .kebab {
        position: absolute;
        top: 8px;
        right: 8px;
      }
      .kebabBtn {
        list-style: none;
        cursor: pointer;
        width: 34px;
        height: 34px;
        border-radius: 10px;
        display: grid;
        place-items: center;
        border: 1px solid var(--border-soft);
        background: rgba(0, 0, 0, 0.12);
        color: var(--text);
        font-weight: 900;
      }
      details[open] .kebabBtn {
        border-color: var(--border);
      }
      .menu {
        position: absolute;
        top: 38px;
        right: 0;
        min-width: 180px;
        border: 1px solid var(--border);
        border-radius: 12px;
        background: rgba(17, 24, 39, 0.96);
        padding: 6px;
        display: grid;
        gap: 4px;
        z-index: 10;
      }
      .menuItem {
        text-align: left;
        border: 1px solid var(--border-soft);
        border-radius: 10px;
        padding: 8px 10px;
        background: transparent;
        color: var(--text);
        font: inherit;
        cursor: pointer;
      }
      .menuItem:hover {
        border-color: var(--border);
        background: rgba(0, 151, 178, 0.12);
      }
      .menuItem:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
      .menuItem--danger:hover {
        background: rgba(239, 68, 68, 0.18);
      }
      .placeholder {
        opacity: 0.75;
        font-weight: 800;
      }
      .srOnly {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaAdminPageComponent {
  @ViewChild('folderFileInput') private readonly folderFileInput?: ElementRef<HTMLInputElement>;
  @ViewChild('packageFileInput') private readonly packageFileInput?: ElementRef<HTMLInputElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly media = inject(MediaAdminMediaService);
  private readonly foldersService = inject(MediaAdminFolderService);
  private readonly cms = inject(MediaAdminCmsService);

  private readonly services = [
    { slug: 'bodas', label: 'Bodas' },
    { slug: 'quinces', label: 'Quinces' },
    { slug: 'eventos', label: 'Eventos' },
    { slug: 'graduaciones', label: 'Graduaciones' }
  ] as const;

  readonly currentPath = signal<string>('');
  readonly uploading = signal(false);
  readonly status = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  private readonly uploadTargetFolder = signal<string>('');
  private readonly uploadTargetPackageId = signal<string>('');
  private readonly uploadTargetPackageName = signal<string>('');
  private readonly uploadTargetServiceSlug = signal<string>('');

  readonly assets = toSignal(this.media.media$.pipe(takeUntilDestroyed(this.destroyRef)), { initialValue: [] });
  readonly cmsServices = toSignal(this.cms.services$.pipe(takeUntilDestroyed(this.destroyRef)), { initialValue: [] });

  readonly currentServiceSlug = computed(() => {
    const path = this.normalizePath(this.currentPath());
    if (!path) return '';
    return path.split('/')[0] ?? '';
  });

  readonly isAtServicesRoot = computed(() => !this.normalizePath(this.currentPath()));
  readonly isAtServiceRoot = computed(() => {
    const path = this.normalizePath(this.currentPath());
    if (!path) return false;
    return path.split('/').length === 1;
  });

  readonly childFolders = toSignal(
    toObservable(this.currentPath).pipe(
      switchMap((path) => {
        const normalized = this.normalizePath(path);
        const root = normalized ? normalized.split('/')[0] : '';
        if (!root || !normalized) return of([]);
        return this.foldersService.listFolders$({ root, parentPath: normalized });
      })
    ),
    { initialValue: [] }
  );

  readonly allFoldersInService = toSignal(
    toObservable(this.currentServiceSlug).pipe(
      switchMap((root) => {
        const trimmed = String(root ?? '').trim();
        if (!trimmed) return of([]);
        return this.foldersService.listAllFoldersByRoot$({ root: trimmed });
      })
    ),
    { initialValue: [] }
  );

  readonly assetsInCurrentFolder = computed(() => {
    const folder = this.normalizePath(this.currentPath());
    if (!folder) return [];
    return this.assets().filter((item) => String(item.folder ?? '').trim() === folder && !item.deletedAt);
  });

  readonly mediaById = computed(() => new Map(this.assets().map((item) => [item.id, item])));

  readonly currentServiceId = computed(() => {
    const slug = this.currentServiceSlug();
    if (!slug) return '';
    const svc = this.cmsServices().find((s) => s.slug === slug);
    return svc?.id ?? '';
  });

  readonly packages = toSignal(
    toObservable(this.currentServiceId).pipe(
      switchMap((id) => {
        const trimmed = String(id ?? '').trim();
        if (!trimmed) return of([]);
        return this.cms.packagesByServiceId$(trimmed);
      })
    ),
    { initialValue: [] }
  );

  readonly canGoUp = computed(() => {
    const path = this.normalizePath(this.currentPath());
    return Boolean(path);
  });

  readonly tiles = computed<MediaAdminTile[]>(() => {
    if (this.isAtServicesRoot()) {
      return this.services.map(
        (svc) =>
          ({
            kind: 'service',
            path: svc.slug,
            label: svc.label
          }) satisfies MediaAdminTile
      ) as MediaAdminTile[];
    }

    const folderTiles = this.childFolders().map(
      (folder) =>
        ({
          kind: 'folder',
          path: folder.path,
          label: folder.name,
          folder
        }) satisfies MediaAdminTile
    );

    const fileTiles = this.assetsInCurrentFolder().map(
      (asset) =>
        ({
          kind: 'file',
          path: this.normalizePath(asset.folder),
          label: asset.name,
          asset
        }) satisfies MediaAdminTile
    );

    return [...folderTiles, ...fileTiles];
  });

  breadcrumbs(): Array<{ path: string; label: string }>
  {
    const path = this.normalizePath(this.currentPath());
    if (!path) return [];

    const segments = path.split('/');
    const crumbs: Array<{ path: string; label: string }> = [];

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i] ?? '';
      const crumbPath = segments.slice(0, i + 1).join('/');
      const label = i === 0 ? (this.serviceLabel(seg) ?? seg) : this.folderLabel(crumbPath) ?? seg;
      crumbs.push({ path: crumbPath, label });
    }

    return crumbs;
  }

  currentTitle(): string {
    if (this.isAtServicesRoot()) return 'Servicios';

    const path = this.normalizePath(this.currentPath());
    const slug = this.currentServiceSlug();
    if (path === slug) return this.serviceLabel(slug) ?? slug;
    return this.folderLabel(path) ?? path;
  }

  showPackages(): boolean {
    return this.isAtServiceRoot();
  }

  packageThumbUrl(pkg: MediaAdminCmsPackageDoc): string | null {
    const id = String(pkg?.mediaId ?? '').trim();
    if (!id) return null;
    const media = this.mediaById().get(id);
    return media?.url ?? null;
  }

  trackByCrumb(_index: number, item: { path: string }): string {
    return item.path;
  }

  trackByPackage(_index: number, item: MediaAdminCmsPackageDoc): string {
    return item.id;
  }

  trackByTile(_index: number, item: MediaAdminTile): string {
    if (item.kind === 'file') return item.asset.id;
    return `${item.kind}:${item.path}`;
  }

  onTileDblClick(item: MediaAdminTile): void {
    if (item.kind === 'service' || item.kind === 'folder') {
      this.goToPath(item.path);
    }
  }

  goHome(): void {
    this.status.set(null);
    this.error.set(null);
    this.currentPath.set('');
  }

  goToPath(path: string): void {
    this.status.set(null);
    this.error.set(null);
    this.currentPath.set(this.normalizePath(path));
  }

  goUp(): void {
    const path = this.normalizePath(this.currentPath());
    if (!path) return;

    const parts = path.split('/').filter(Boolean);
    const parent = parts.slice(0, -1).join('/');
    this.goToPath(parent);
  }

  canCreateFolder(): boolean {
    return !this.isAtServicesRoot();
  }

  canUploadHere(): boolean {
    return !this.isAtServicesRoot();
  }

  async createFolderPrompt(parentPath: string): Promise<void> {
    if (!parentPath) return;

    const name = prompt('Nombre de carpeta (ej. cliente-ana):');
    if (name === null) return;

    this.status.set(null);
    this.error.set(null);

    const normalizedParent = this.normalizePath(parentPath);
    const root = normalizedParent.split('/')[0] ?? '';
    if (!root || !normalizedParent) return;

    try {
      await this.foldersService.createFolder({ root, parentPath: normalizedParent, name });
      this.status.set('Carpeta creada.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo crear la carpeta.';
      this.error.set(message);
    }
  }

  async editFolderNamePrompt(folder: MediaAdminFolderDoc): Promise<void> {
    const next = prompt('Nuevo nombre:', folder.name);
    if (next === null) return;

    this.status.set(null);
    this.error.set(null);

    try {
      await this.foldersService.updateFolderName(folder.path, next);
      this.status.set('Carpeta actualizada.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo editar la carpeta.';
      this.error.set(message);
    }
  }

  canDeleteFolder(folderPath: string): boolean {
    const normalized = this.normalizePath(folderPath);
    if (!normalized) return false;

    const hasFolderChildren = this.allFoldersInService().some((f) => f.parentPath === normalized || f.path.startsWith(`${normalized}/`));
    if (hasFolderChildren) return false;

    const hasAssetChildren = this.assets().some((a) => {
      const af = String(a.folder ?? '').trim();
      return af === normalized || af.startsWith(`${normalized}/`);
    });
    if (hasAssetChildren) return false;

    return true;
  }

  async deleteFolder(folder: MediaAdminFolderDoc): Promise<void> {
    if (!this.canDeleteFolder(folder.path)) return;

    const ok = confirm(`¿Eliminar la carpeta "${folder.name}"?`);
    if (!ok) return;

    this.status.set(null);
    this.error.set(null);

    try {
      await this.foldersService.deleteFolder(folder.path);
      this.status.set('Carpeta eliminada.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo eliminar la carpeta.';
      this.error.set(message);
    }
  }

  pickUploadToFolder(folderPath: string): void {
    const normalized = this.normalizePath(folderPath);
    if (!normalized) return;

    this.uploadTargetFolder.set(normalized);
    this.uploadTargetPackageId.set('');
    this.uploadTargetPackageName.set('');
    this.uploadTargetServiceSlug.set('');

    const el = this.folderFileInput?.nativeElement;
    if (!el) return;
    el.value = '';
    el.click();
  }

  async onFolderUploadSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0] ?? null;
    if (!file || this.uploading()) return;

    const folder = this.normalizePath(this.uploadTargetFolder());
    if (!folder) return;

    this.uploading.set(true);
    this.status.set(null);
    this.error.set(null);

    try {
      await this.media.uploadImage(file, { folder, alt: file.name });
      this.status.set('Imagen subida.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo subir.';
      this.error.set(message);
    } finally {
      this.uploading.set(false);
    }
  }

  pickPackageMainImage(pkg: MediaAdminCmsPackageDoc): void {
    if (!this.isAtServiceRoot()) return;

    const serviceSlug = this.currentServiceSlug();
    if (!serviceSlug) return;

    this.uploadTargetFolder.set('');
    this.uploadTargetPackageId.set(pkg.id);
    this.uploadTargetPackageName.set(pkg.name);
    this.uploadTargetServiceSlug.set(serviceSlug);

    const el = this.packageFileInput?.nativeElement;
    if (!el) return;
    el.value = '';
    el.click();
  }

  async onPackageMainSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0] ?? null;
    if (!file || this.uploading()) return;

    const packageId = String(this.uploadTargetPackageId() ?? '').trim();
    const packageName = String(this.uploadTargetPackageName() ?? '').trim();
    const serviceSlug = String(this.uploadTargetServiceSlug() ?? '').trim();
    if (!packageId || !serviceSlug) return;

    const ext = this.fileExtension(file) || 'jpg';
    const mediaId = `pkg__${packageId}`;
    const storagePath = `${serviceSlug}/package-${packageId}.${ext}`;

    this.uploading.set(true);
    this.status.set(null);
    this.error.set(null);

    try {
      const result = await this.media.uploadImageWithId(file, {
        id: mediaId,
        folder: serviceSlug,
        storagePath,
        alt: packageName || file.name,
        name: `package-${packageId}.${ext}`
      });

      if (!result) throw new Error('No se pudo guardar la imagen principal.');

      await this.cms.setPackageMediaId(packageId, mediaId);
      this.status.set('Imagen principal actualizada.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo actualizar la imagen principal.';
      this.error.set(message);
    } finally {
      this.uploading.set(false);
    }
  }

  async clearPackageMainImage(pkg: MediaAdminCmsPackageDoc): Promise<void> {
    const ok = confirm('¿Quitar la imagen principal del paquete?');
    if (!ok) return;

    try {
      await this.cms.setPackageMediaId(pkg.id, '');
      this.status.set('Imagen principal eliminada.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo eliminar.';
      this.error.set(message);
    }
  }

  async copyUrl(url: string): Promise<void> {
    const value = String(url ?? '').trim();
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      this.status.set('URL copiada al portapapeles.');
    } catch {
      this.status.set('No se pudo copiar (bloqueado por el navegador).');
    }
  }

  async editAltPrompt(item: MediaAdminMediaDoc): Promise<void> {
    const next = prompt('ALT:', item.alt);
    if (next === null) return;

    this.status.set(null);
    this.error.set(null);

    try {
      await this.media.updateAlt(item.id, next);
      this.status.set('Archivo actualizado.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo editar.';
      this.error.set(message);
    }
  }

  async remove(item: MediaAdminMediaDoc): Promise<void> {
    const ok = confirm('¿Eliminar este archivo? (se intentará borrar en Storage y se marcará como eliminado)');
    if (!ok) return;

    try {
      await this.media.softDelete(item);
      this.status.set('Archivo marcado como eliminado.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo eliminar.';
      this.error.set(message);
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('tj_media_admin_unlocked', 'false');
    }

    void this.router.navigateByUrl('/media-admin');
  }

  private serviceLabel(slug: string): string | null {
    const found = this.services.find((s) => s.slug === slug);
    return found?.label ?? null;
  }

  private folderLabel(path: string): string | null {
    const normalized = this.normalizePath(path);
    const found = this.allFoldersInService().find((f) => f.path === normalized);
    return found?.name ?? null;
  }

  private normalizePath(value: string): string {
    return String(value ?? '')
      .trim()
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9/_-]+/g, '')
      .toLowerCase();
  }

  private fileExtension(file: File): string {
    const fromName = String(file?.name ?? '').trim();
    const match = /\.([a-zA-Z0-9]+)$/.exec(fromName);
    const ext = match?.[1] ? match[1].toLowerCase() : '';
    if (ext) return ext;

    const type = String(file?.type ?? '').toLowerCase();
    if (type === 'image/png') return 'png';
    if (type === 'image/webp') return 'webp';
    if (type === 'image/jpeg') return 'jpg';
    return '';
  }
}
