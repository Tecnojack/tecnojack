import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaAdminNode } from '../../media-admin.service';

@Component({
  selector: 'tj-file-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="file-grid" [class.empty]="nodes.length === 0">
      @for (node of nodes; track node?.path || $index) {
        <article
          class="node-card"
          [class.node-card--folder]="node?.kind !== 'file'"
          (click)="onNodeClick(node)"
        >
          <!-- Thumbnail -->
          <div class="thumbnail">
            @switch (node?.kind) {
              @case ('file') {
                <img [src]="node.asset?.url" [alt]="node.name" loading="lazy" />
              }
              @default {
                <div class="folder-icon">
                  <div class="folder-glyph"></div>
                </div>
              }
            }

            <!-- Acciones Hover -->
            <div class="overlay">
              @if (node?.kind === 'file') {
                <button
                  class="action-btn"
                  (click)="onCopyUrlClick($event, node)"
                  title="Copiar URL"
                >
                  🔗
                </button>
              }
              <button
                class="action-btn action-btn--danger"
                (click)="onDeleteClick($event, node)"
                title="Eliminar"
              >
                🗑️
              </button>
            </div>

            <!-- Badge Tipo -->
            @if (node?.kind === 'file') {
              <div class="badge">
                {{ isCover(node) ? 'COVER' : 'GALERÍA' }}
              </div>
            }
          </div>

          <!-- Info -->
          <div class="info">
            <span class="kind-tag">{{ getKindLabel(node) }}</span>
            <h3 class="name" [title]="node?.name || ''">
              {{ node?.name || '' }}
            </h3>
          </div>
        </article>
      } @empty {
        <div class="empty-state">
          <div class="empty-icon">📂</div>
          <p>Esta carpeta está vacía</p>
          <span class="empty-hint">Sube archivos o crea una subcarpeta</span>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 20px;
        padding: 4px;
      }
      .file-grid.empty {
        display: block;
      }

      .node-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-soft);
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
      }
      .node-card:hover {
        transform: translateY(-4px);
        border-color: var(--border);
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3);
      }

      .thumbnail {
        aspect-ratio: 16 / 10;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }
      .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .folder-icon {
        width: 50%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .folder-glyph {
        width: 60px;
        height: 45px;
        border: 2px solid var(--border);
        border-radius: 6px;
        background: rgba(0, 151, 178, 0.1);
        position: relative;
      }
      .folder-glyph::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 6px;
        width: 24px;
        height: 12px;
        border: 2px solid var(--border);
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        background: rgba(0, 151, 178, 0.15);
      }

      .overlay {
        position: absolute;
        inset: 0;
        background: rgba(17, 24, 39, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        opacity: 0;
        transition: opacity 0.2s;
      }
      .node-card:hover .overlay {
        opacity: 1;
      }

      .action-btn {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: #111827;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      .action-btn:hover {
        background: white;
        color: black;
        transform: scale(1.1);
      }
      .action-btn--danger:hover {
        background: #ef4444;
        color: white;
        border-color: #ef4444;
      }

      .badge {
        position: absolute;
        top: 8px;
        left: 8px;
        background: rgba(0, 151, 178, 0.8);
        color: white;
        font-size: 10px;
        font-weight: 800;
        padding: 2px 6px;
        border-radius: 4px;
        backdrop-filter: blur(4px);
      }

      .info {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .kind-tag {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        opacity: 0.5;
      }
      .name {
        font-size: 0.9rem;
        font-weight: 600;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .empty-state {
        text-align: center;
        padding: 60px 20px;
        border: 2px dashed var(--border-soft);
        border-radius: 20px;
        color: var(--text-muted);
      }
      .empty-icon {
        font-size: 48px;
        margin-bottom: 12px;
      }
      .empty-hint {
        font-size: 0.85rem;
        opacity: 0.7;
      }
    `,
  ],
})
export class FileGridComponent {
  @Input() nodes: MediaAdminNode[] = [];
  @Output() onFolderClick = new EventEmitter<string>();
  @Output() onFileClick = new EventEmitter<MediaAdminNode>();
  @Output() onDelete = new EventEmitter<MediaAdminNode>();
  @Output() onCopyUrl = new EventEmitter<string>();

  getKindLabel(node: MediaAdminNode): string {
    if (!node) return 'Elemento';
    if (node.kind === 'service') return 'Servicio';
    if (node.kind === 'folder') return node.isDynamic ? 'Cliente' : 'Carpeta';
    return 'Archivo';
  }

  isCover(node: MediaAdminNode): boolean {
    return node && node.kind === 'file' && node.name === 'cover.jpg';
  }

  onNodeClick(node: MediaAdminNode) {
    console.log('Nodo clickeado:', node);
    if (!node || !node.path) {
      console.warn('Nodo inválido:', node);
      return;
    }
    if (node.kind !== 'file') {
      this.onFolderClick.emit(node?.path || '');
    } else {
      this.onFileClick.emit(node);
    }
  }

  onDeleteClick(event: Event, node: MediaAdminNode) {
    event.stopPropagation();
    if (!node) return;
    this.onDelete.emit(node);
  }

  onCopyUrlClick(event: Event, node: MediaAdminNode) {
    event.stopPropagation();
    if (node?.asset?.url) {
      this.onCopyUrl.emit(node.asset.url);
    }
  }
}
