import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, finalize, of } from 'rxjs';

import { MediaAdminService, MediaAdminNode } from './media-admin.service';
import { FolderTreeComponent } from './components/folder-tree/folder-tree.component';
import { FileGridComponent } from './components/file-grid/file-grid.component';
import { UploadZoneComponent } from '../admin/components/upload-zone/upload-zone.component';
import { StorageStructureService } from '../admin/services/storage-structure.service';
import { MediaAdminAuthService } from './media-admin-auth.service';
import { ClientAdminService } from './client-admin.service';
import { MediaAdminMediaService } from './media-admin-media.service';
import { ClientService } from '../../core/models/client.model';

@Component({
  selector: 'tj-media-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FolderTreeComponent,
    FileGridComponent,
    UploadZoneComponent,
  ],
  template: `
    <div class="ma-layout">
      <!-- SIDEBAR -->
      <aside class="ma-sidebar">
        <div class="sidebar-header">
          <h1 class="sidebar-title">Media Admin</h1>
          <div class="sidebar-header-actions">
            <button class="btn btn--icon" (click)="goHome()" title="Ir al inicio">
              🏠
            </button>
            <button class="btn btn--icon" (click)="goToClients()" title="Gestionar Clientes">
              👥
            </button>
            <button class="btn btn--icon" (click)="goToRequests()" title="Solicitudes de servicio">
              📋
            </button>
          </div>
        </div>

        <div class="sidebar-content">
          <tj-folder-tree
            [activePath]="currentPath()"
            (onSelect)="goToPath($event)"
          ></tj-folder-tree>
        </div>

        <div class="sidebar-footer">
          <!-- BOTÓN DE INICIALIZACIÓN DE STORAGE (MOVIDO AQUÍ) -->
          <button
            class="btn btn--block btn--accent mb-2"
            (click)="createStorageStructure()"
            [disabled]="isCreatingStructure()"
          >
            <span class="icon">{{ isCreatingStructure() ? '⏳' : '🏗️' }}</span>
            <span>{{
              isCreatingStructure() ? 'Procesando...' : 'Inicializar Storage'
            }}</span>
          </button>

          <button class="btn btn--block btn--outline" (click)="logout()">
            <span>Cerrar Sesión</span>
            <span class="icon">🚪</span>
          </button>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="ma-main">
        <!-- BARRA DE PROGRESO DE INICIALIZACIÓN -->
        @if (isCreatingStructure() || showInitSuccess()) {
          <div class="init-progress-bar">
            @if (isCreatingStructure()) {
              <div class="progress-container">
                <div class="bar">
                  <div
                    class="fill"
                    [style.width.%]="structureProgress().progress"
                  ></div>
                </div>
                <div class="details">
                  <span>
                    {{
                      structureProgress().status === 'created'
                        ? '✅'
                        : structureProgress().status === 'exists'
                          ? 'ℹ️'
                          : '❌'
                    }}
                    {{ structureProgress().lastPath }}
                  </span>
                  <span>
                    {{ structureProgress().current }} /
                    {{ structureProgress().total }}
                  </span>
                </div>
              </div>
            }
            @if (showInitSuccess()) {
              <div class="success-msg">
                ✅ Estructura de Storage sincronizada correctamente.
              </div>
            }
          </div>
        }

        <!-- HEADER / BREADCRUMBS -->
        <header class="ma-header">
          <nav class="ma-breadcrumbs">
            <button class="crumb-btn" (click)="goHome()">Home</button>
            @for (
              crumb of breadcrumbs();
              track crumb?.path || $index;
              let last = $last
            ) {
              <span class="crumb-sep">/</span>
              <button
                class="crumb-btn"
                [class.active]="last"
                (click)="crumb?.path && goToPath(crumb.path)"
              >
                {{ crumb?.label }}
              </button>
            }
          </nav>

          <div class="ma-actions">
            <button class="btn btn--primary" (click)="openCreateClientModal()">
              <span>Añadir Cliente</span>
              <span class="icon">➕</span>
            </button>
          </div>
        </header>

        <div class="ma-content">
          <!-- UPLOAD ZONE (Context Aware) -->
          @if (currentPath()) {
            <section class="ma-upload">
              <tj-upload-zone
                [currentPath]="currentPath()"
                [mode]="uploadMode()"
                (onUploadComplete)="handleUploadComplete($event)"
              ></tj-upload-zone>
            </section>
          } @else {
            <div class="ma-empty-path">
              <p>Selecciona una carpeta para subir archivos</p>
            </div>
          }

          <!-- FILE GRID -->
          <section class="ma-grid-section">
            @if (currentPath()) {
              <div class="section-info">
                <h2 class="section-title">{{ currentTitle() }}</h2>
                <p class="section-stats">
                  {{ nodes().length }} elementos en esta carpeta
                </p>
              </div>
            }

            <tj-file-grid
              [nodes]="nodes()"
              (onFolderClick)="goToPath($event)"
              (onFileClick)="onNodeDblClick($event)"
              (onDelete)="onDeleteNode($event)"
              (onCopyUrl)="copyUrl($event)"
            ></tj-file-grid>
          </section>
        </div>
      </main>

      <!-- STATUS TOASTS -->
      @if (status() || error()) {
        <div class="ma-status">
          <div class="toast" [class.toast--error]="error()">
            {{ status() || error() }}
          </div>
        </div>
      }

      @if (showCreateClientModal()) {
        <div class="ma-modal">
          <button class="ma-modal__backdrop" type="button" (click)="closeCreateClientModal()"></button>
          <div class="ma-modal__panel" role="dialog" aria-modal="true" aria-label="Crear cliente">
            <div class="ma-modal__header">
              <div class="ma-modal__title-wrap">
                <span class="ma-modal__eyebrow">Media Admin</span>
                <h3>Crear cliente y preparar galería</h3>
              </div>
              <button class="btn btn--outline" type="button" (click)="closeCreateClientModal()">Cerrar</button>
            </div>

            <div class="ma-modal__body">
              <div class="ma-field-row">
                <label class="ma-field">
                  <span>Nombre</span>
                  <input [(ngModel)]="newClientName" placeholder="Ej: Daniel & Daniela" />
                </label>
                <label class="ma-field">
                  <span>Servicio</span>
                  <select [(ngModel)]="newClientService">
                    <option value="bodas">Bodas</option>
                    <option value="prebodas">Prebodas</option>
                    <option value="quinces">Quinces</option>
                    <option value="grados">Grados</option>
                  </select>
                </label>
              </div>

              <div class="ma-field-row">
                <label class="ma-field">
                  <span>Fecha</span>
                  <input [(ngModel)]="newClientEventDate" placeholder="2026-08" />
                </label>
                <label class="ma-field">
                  <span>Ubicación</span>
                  <input [(ngModel)]="newClientLocation" placeholder="Medellín, Antioquia" />
                </label>
              </div>

              <label class="ma-field">
                <span>Imágenes iniciales (múltiples)</span>
                <input
                  #createClientFilesInput
                  type="file"
                  multiple
                  accept="image/*"
                  class="ma-file-input"
                  (change)="onCreateClientFilesSelected($event)" />
                <button
                  type="button"
                  class="ma-file-picker"
                  (click)="createClientFilesInput.click()">
                  <span>📷 Adjuntar imágenes</span>
                  <small>JPG, PNG, WEBP · múltiples</small>
                </button>
              </label>

              <div class="ma-file-preview-grid" *ngIf="createClientFilePreviews.length">
                <article class="ma-file-preview-card" *ngFor="let item of createClientFilePreviews; let index = index">
                  <img [src]="item.url" [alt]="item.file.name" loading="lazy" />
                  <button
                    type="button"
                    class="ma-file-preview-remove"
                    (click)="removeCreateClientFile(index)"
                    aria-label="Quitar imagen">
                    ✕
                  </button>
                  <div class="ma-file-preview-meta">
                    <span>{{ item.file.name }}</span>
                  </div>
                </article>
              </div>

              <p class="ma-helper" *ngIf="createClientFiles.length">{{ createClientFiles.length }} archivo(s) seleccionados.</p>
              <p class="ma-helper" *ngIf="!createClientFiles.length">Puedes crear ahora y subir después, o adjuntar imágenes desde este modal.</p>
            </div>

            <div class="ma-modal__footer">
              <button class="btn btn--outline" type="button" (click)="closeCreateClientModal()">Cancelar</button>
              <button class="btn btn--primary" type="button" [disabled]="isCreatingClient()" (click)="submitCreateClient()">
                {{ isCreatingClient() ? 'Creando...' : 'Crear cliente' }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        --sidebar-width: 280px;
        --header-height: 64px;
        --bg-main: #0a0a0c;
        --bg-sidebar: #111114;
        --border-color: rgba(255, 255, 255, 0.08);
        display: block;
        height: 100vh;
        background: var(--bg-main);
        color: white;
      }

      .ma-layout {
        display: grid;
        grid-template-columns: var(--sidebar-width) 1fr;
        height: 100%;
      }

      /* SIDEBAR */
      .ma-sidebar {
        background: var(--bg-sidebar);
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .sidebar-header {
        height: var(--header-height);
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-color);
      }
      .sidebar-title {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 700;
      }
      .sidebar-header-actions {
        display: flex;
        gap: 4px;
      }
      .sidebar-subtitle {
        font-size: 1.1rem;
        font-weight: 800;
        margin: 0;
        background: linear-gradient(to right, #fff, #888);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .sidebar-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }
      .sidebar-footer {
        padding: 20px;
        border-top: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .mb-2 {
        margin-bottom: 8px;
      }

      .btn--accent {
        background: #f3ad3a;
        color: #1a1a1a;
        border: none;
      }

      .btn--accent:hover:not(:disabled) {
        background: #e59d2a;
      }

      .btn--accent:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      /* ESTILOS BARRA DE INICIALIZACIÓN */
      .init-progress-bar {
        background: rgba(243, 173, 58, 0.1);
        border-bottom: 1px solid rgba(243, 173, 58, 0.3);
        padding: 12px 24px;
      }

      .progress-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .progress-container .bar {
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;
      }

      .progress-container .fill {
        height: 100%;
        background: #f3ad3a;
        transition: width 0.3s ease;
      }

      .progress-container .details {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        font-family: monospace;
        color: #f3ad3a;
      }

      .success-msg {
        font-size: 0.9rem;
        color: #4caf50;
        font-weight: 600;
      }

      /* MAIN */
      .ma-main {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .ma-header {
        height: var(--header-height);
        padding: 0 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-color);
        background: rgba(10, 10, 12, 0.8);
        backdrop-filter: blur(12px);
        z-index: 10;
      }
      .ma-breadcrumbs {
        display: flex;
        align-items: center;
        gap: 4px;
        overflow-x: auto;
      }
      .crumb-btn {
        background: none;
        border: none;
        color: #888;
        padding: 4px 8px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        white-space: nowrap;
        transition: all 0.2s;
      }
      .crumb-btn:hover {
        color: white;
        background: rgba(255, 255, 255, 0.05);
      }
      .crumb-btn.active {
        color: #00d4ff;
        font-weight: 600;
      }
      .crumb-sep {
        color: #444;
        font-size: 0.8rem;
      }

      .ma-content {
        flex: 1;
        overflow-y: auto;
        padding: 32px;
      }

      .ma-upload {
        margin-bottom: 40px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        padding: 20px;
      }

      .section-info {
        margin-bottom: 24px;
      }
      .section-title {
        font-size: 1.5rem;
        font-weight: 800;
        margin: 0 0 4px 0;
      }
      .section-stats {
        font-size: 0.85rem;
        color: #666;
      }

      /* UTILS */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        border: 1px solid transparent;
        font-size: 0.9rem;
      }
      .btn--primary {
        background: #00d4ff;
        color: #000;
      }
      .btn--primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
      }

      .btn--outline {
        background: transparent;
        border-color: var(--border-color);
        color: #fff;
      }
      .btn--outline:hover {
        background: rgba(255, 255, 255, 0.05);
      }

      .btn--block {
        width: 100%;
      }
      .btn--icon {
        padding: 8px;
      }

      .ma-modal {
        position: fixed;
        inset: 0;
        z-index: 200;
        display: grid;
        place-items: center;
      }
      .ma-modal__backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        border: 0;
      }
      .ma-modal__panel {
        position: relative;
        z-index: 1;
        width: min(720px, calc(100vw - 32px));
        border: 1px solid var(--border-color);
        border-radius: 18px;
        background:
          radial-gradient(circle at top right, rgba(243, 173, 58, 0.16), transparent 40%),
          linear-gradient(165deg, #151519 0%, #0d0d11 100%);
        padding: 20px;
        display: grid;
        gap: 16px;
        box-shadow: 0 22px 70px rgba(0, 0, 0, 0.5);
      }
      .ma-modal__header,
      .ma-modal__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .ma-modal__title-wrap {
        display: grid;
        gap: 2px;
      }
      .ma-modal__eyebrow {
        font-size: 0.72rem;
        color: #f3ad3a;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 700;
      }
      .ma-modal__header h3 {
        margin: 0;
        font-size: 1.15rem;
        font-weight: 800;
      }
      .ma-modal__body {
        display: grid;
        gap: 12px;
        padding: 4px;
      }
      .ma-field-row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }
      .ma-field {
        display: grid;
        gap: 6px;
      }
      .ma-field span {
        font-size: 0.82rem;
        color: #bbb;
      }
      .ma-field input,
      .ma-field select {
        height: 42px;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        background: rgba(255, 255, 255, 0.03);
        color: #fff;
        padding: 0 12px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .ma-field input:focus,
      .ma-field select:focus {
        outline: none;
        border-color: rgba(243, 173, 58, 0.75);
        box-shadow: 0 0 0 3px rgba(243, 173, 58, 0.16);
      }
      .ma-file-input {
        display: none;
      }
      .ma-file-picker {
        height: 54px;
        border-radius: 12px;
        border: 1px dashed rgba(243, 173, 58, 0.5);
        background: rgba(243, 173, 58, 0.08);
        color: #f7f7f7;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 14px;
        cursor: pointer;
        transition: background 0.2s ease, border-color 0.2s ease;
      }
      .ma-file-picker:hover {
        background: rgba(243, 173, 58, 0.14);
        border-color: rgba(243, 173, 58, 0.75);
      }
      .ma-file-picker small {
        font-size: 0.74rem;
        color: #d8dde4;
      }
      .ma-file-preview-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
      }
      .ma-file-preview-card {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--border-color);
        background: rgba(255, 255, 255, 0.03);
      }
      .ma-file-preview-card img {
        width: 100%;
        height: 96px;
        object-fit: cover;
        display: block;
      }
      .ma-file-preview-meta {
        padding: 6px 8px;
      }
      .ma-file-preview-meta span {
        display: block;
        font-size: 0.7rem;
        color: #d3d8df;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ma-file-preview-remove {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 24px;
        height: 24px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        background: rgba(10, 10, 12, 0.75);
        color: #fff;
        cursor: pointer;
        display: grid;
        place-items: center;
      }
      .ma-file-preview-remove:hover {
        background: rgba(239, 68, 68, 0.9);
        border-color: rgba(239, 68, 68, 0.9);
      }
      .ma-helper {
        margin: 0;
        color: #aeb5be;
        font-size: 0.82rem;
      }

      @media (max-width: 780px) {
        .ma-field-row {
          grid-template-columns: 1fr;
        }
      }

      .ma-status {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 100;
      }
      .toast {
        background: #111;
        border: 1px solid #333;
        padding: 12px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.3s ease-out;
      }
      .toast--error {
        border-color: #ef4444;
        color: #ef4444;
      }

      @keyframes slideIn {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaAdminPageComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly mediaService = inject(MediaAdminService);
  private readonly clientAdmin = inject(ClientAdminService);
  private readonly mediaAdminMedia = inject(MediaAdminMediaService);
  private readonly storageStructure = inject(StorageStructureService);
  private readonly authService = inject(MediaAdminAuthService);

  // Estados para inicialización de storage
  readonly isCreatingStructure = signal(false);
  readonly showInitSuccess = signal(false);
  readonly structureProgress = signal({
    current: 0,
    total: 0,
    lastPath: '',
    progress: 0,
    status: 'exists' as 'created' | 'exists' | 'error',
  });

  readonly currentPath = signal<string>('servicios');
  readonly status = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  readonly showCreateClientModal = signal(false);
  readonly isCreatingClient = signal(false);

  newClientName = '';
  newClientService: ClientService = 'bodas';
  newClientEventDate = '';
  newClientLocation = '';
  createClientFiles: File[] = [];
  createClientFilePreviews: Array<{ file: File; url: string }> = [];

  constructor() {
    effect(() => {
      const fromQuery = this.route.snapshot.queryParamMap.get('path');
      const normalized = this.normalizePath(String(fromQuery ?? ''));
      if (normalized) {
        this.currentPath.set(normalized);
      }
    });
  }

  readonly nodes = toSignal(
    toObservable(this.currentPath).pipe(
      switchMap((path) => {
        if (!path) return of([]);
        return this.mediaService.getNodes$(path);
      }),
    ),
    { initialValue: [] },
  );

  readonly uploadMode = computed<'cover' | 'gallery'>(() => {
    const path = this.normalizePath(this.currentPath());
    const segments = path.split('/').filter(Boolean);

    if (!segments.length || segments[0] !== 'servicios') {
      return 'gallery';
    }

    if (this.isGalleryFolder(segments)) {
      return 'gallery';
    }

    // En servicios, toda carpeta funcional (hero/categoria/paquete/subcarpeta)
    // trabaja en modo cover salvo carpetas de galeria/clientes.
    if (segments.length >= 2) {
      return 'cover';
    }

    return 'gallery';
  });

  private isGalleryFolder(segments: string[]): boolean {
    if (!segments.length || segments[0] !== 'servicios') {
      return false;
    }

    if (segments.includes('clientes')) {
      return true;
    }

    const galleryFolderNames = new Set(['galeria', 'galerias', 'gallery']);
    return segments.some((segment) => galleryFolderNames.has(segment));
  }

  readonly breadcrumbs = computed(() => {
    const path = this.normalizePath(this.currentPath());
    if (!path) return [];

    const segments = path.split('/');
    const crumbs: Array<{ path: string; label: string }> = [];

    for (let i = 0; i < segments.length; i++) {
      const crumbPath = segments.slice(0, i + 1).join('/');
      const label = segments[i]
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      crumbs.push({ path: crumbPath, label });
    }

    return crumbs.filter((crumb) => crumb?.path);
  });

  readonly currentTitle = computed(() => {
    const path = this.currentPath();
    if (!path) return 'Explorador de Archivos';
    const segments = path.split('/');
    return segments[segments.length - 1]
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  });

  canCreateFolderHere(): boolean {
    const path = this.normalizePath(this.currentPath());
    const segments = path.split('/');
    return (
      segments.length === 3 &&
      segments[0] === 'servicios' &&
      segments[2] === 'clientes'
    );
  }

  async createFolderPrompt(): Promise<void> {
    const name = prompt(
      'Nombre de la carpeta del cliente (ej. boda-ana-y-juan):',
    );
    if (!name) return;

    try {
      await this.mediaService.createClientFolder(this.currentPath(), name);
      this.showMessage('Carpeta creada con éxito.');
    } catch (err) {
      this.showError('No se pudo crear la carpeta.');
    }
  }

  handleUploadComplete(event: any): void {
    this.showMessage('Archivos subidos correctamente.');
  }

  onNodeDblClick(node: MediaAdminNode): void {
    console.log('Nodo clickeado:', node);
    if (!node || !node.path) {
      console.warn('Nodo inválido:', node);
      return;
    }

    if (node.kind !== 'file') {
      this.goToPath(node?.path || '');
    } else if (node.asset?.url) {
      window.open(node.asset.url, '_blank');
    }
  }

  async onDeleteNode(node: MediaAdminNode): Promise<void> {
    console.log('Nodo clickeado:', node);
    if (!node || !node.path) {
      console.warn('Nodo inválido:', node);
      return;
    }

    const ok = confirm(
      `¿Estás seguro de eliminar "${node.name || 'este elemento'}"?`,
    );
    if (!ok) return;

    try {
      if (node.kind === 'file' && node.asset) {
        await this.mediaService.deleteFile(node.asset);
        this.showMessage('Archivo eliminado.');
      } else {
        if (node.isClientFolder && node.clientId) {
          await this.clientAdmin.deleteClient(node.clientId);
          this.showMessage('Cliente y carpeta eliminados.');
          return;
        }

        const pathToDelete = node?.path || '';
        if (!pathToDelete) throw new Error('Ruta inválida');

        await this.mediaService.deleteFolder(pathToDelete);
        this.showMessage('Carpeta eliminada.');
      }
    } catch (err) {
      this.showError('Error al eliminar.');
    }
  }

  goHome(): void {
    this.currentPath.set('servicios');
  }

  goToClients(): void {
    this.router.navigate(['/media-admin/clientes']);
  }

  goToRequests(): void {
    this.router.navigate(['/media-admin/solicitudes']);
  }

  goToPath(path: string | undefined): void {
    if (!path) {
      console.warn(
        'MediaAdminPage: Intento de navegar a ruta vacía o undefined',
      );
      return;
    }
    this.currentPath.set(this.normalizePath(path));
  }

  async copyUrl(url: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(url);
      this.showMessage('URL copiada al portapapeles.');
    } catch {
      this.showError('No se pudo copiar la URL.');
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  createStorageStructure(): void {
    if (this.isCreatingStructure()) return;
    this.isCreatingStructure.set(true);
    this.showInitSuccess.set(false);
    this.structureProgress.set({
      current: 0,
      total: 0,
      lastPath: 'Iniciando...',
      progress: 0,
      status: 'exists',
    });

    this.storageStructure
      .createFullStructure()
      .pipe(
        finalize(() => {
          this.isCreatingStructure.set(false);
          this.showInitSuccess.set(true);
          setTimeout(() => this.showInitSuccess.set(false), 5000);
        }),
      )
      .subscribe({
        next: (progress) => {
          this.structureProgress.set({
            current: progress.current,
            total: progress.total,
            lastPath: progress.path,
            progress: progress.progress,
            status: progress.status,
          });
        },
        error: (err) => {
          console.error('Error creando estructura:', err);
          this.isCreatingStructure.set(false);
        },
      });
  }

  openCreateClientModal(): void {
    const path = this.normalizePath(this.currentPath());
    const segments = path.split('/');
    if (segments.length >= 2 && segments[0] === 'servicios') {
      const maybeService = segments[1] as ClientService;
      if (['bodas', 'prebodas', 'quinces', 'grados'].includes(maybeService)) {
        this.newClientService = maybeService;
      }
    }
    this.showCreateClientModal.set(true);
  }

  closeCreateClientModal(): void {
    this.showCreateClientModal.set(false);
    this.newClientName = '';
    this.newClientEventDate = '';
    this.newClientLocation = '';
    this.clearCreateClientFilePreviews();
    this.createClientFiles = [];
    this.isCreatingClient.set(false);
  }

  onCreateClientFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedFiles = input.files ? Array.from(input.files) : [];
    if (!selectedFiles.length) {
      return;
    }

    this.createClientFiles = [...this.createClientFiles, ...selectedFiles];
    this.createClientFilePreviews = [
      ...this.createClientFilePreviews,
      ...selectedFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
    ];

    input.value = '';
  }

  removeCreateClientFile(index: number): void {
    const preview = this.createClientFilePreviews[index];
    if (preview?.url) {
      URL.revokeObjectURL(preview.url);
    }

    this.createClientFilePreviews.splice(index, 1);
    this.createClientFiles.splice(index, 1);

    // Reasigna referencias para refrescar el template al usar inline arrays.
    this.createClientFilePreviews = [...this.createClientFilePreviews];
    this.createClientFiles = [...this.createClientFiles];
  }

  private clearCreateClientFilePreviews(): void {
    this.createClientFilePreviews.forEach((item) => {
      if (item.url) {
        URL.revokeObjectURL(item.url);
      }
    });
    this.createClientFilePreviews = [];
  }

  async submitCreateClient(): Promise<void> {
    const name = this.newClientName.trim();
    if (!name) {
      this.showError('El nombre del cliente es obligatorio.');
      return;
    }

    this.isCreatingClient.set(true);

    try {
      const created = await this.clientAdmin.createClient({
        name,
        service: this.newClientService,
        eventDate: this.newClientEventDate.trim() || undefined,
        location: this.newClientLocation.trim() || undefined,
        status: 'draft',
      });

      for (const file of this.createClientFiles) {
        await this.mediaAdminMedia.uploadImage(file, {
          folder: created.folder,
          alt: created.name,
        });
      }

      this.goToPath(created.folder);
      this.showMessage('Cliente creado y listo para gestionar imágenes.');
      this.closeCreateClientModal();
    } catch (err) {
      this.showError('No se pudo crear el cliente.');
    } finally {
      this.isCreatingClient.set(false);
    }
  }

  private showMessage(msg: string): void {
    this.status.set(msg);
    setTimeout(() => this.status.set(null), 3000);
  }

  private showError(msg: string): void {
    this.error.set(msg);
    setTimeout(() => this.error.set(null), 3000);
  }

  private normalizePath(value: string): string {
    return String(value ?? '')
      .trim()
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .toLowerCase();
  }
}
