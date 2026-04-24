import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaAdminService, MediaAdminNode } from '../../media-admin.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map, of } from 'rxjs';

@Component({
  selector: 'tj-folder-tree-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tree-item" [style.padding-left.px]="level * 16">
      <div
        class="tree-row"
        [class.active]="activePath === node.path"
        (click)="toggleOrSelect()"
      >
        <span class="icon" [class.expanded]="isExpanded()">
          @if (hasChildren) {
            ▶
          }
        </span>
        <span class="folder-icon">
          {{ node.kind === 'service' ? '📁' : '📂' }}
        </span>
        <span class="label">{{ node.name }}</span>
      </div>

      @if (isExpanded() && hasChildren) {
        <div class="children">
          @for (child of children(); track child?.path || $index) {
            <tj-folder-tree-item
              [node]="child"
              [level]="level + 1"
              [activePath]="activePath"
              (onSelect)="onSelect.emit($event)"
            ></tj-folder-tree-item>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .tree-item {
        display: block;
      }
      .tree-row {
        display: flex;
        align-items: center;
        padding: 6px 8px;
        cursor: pointer;
        border-radius: 6px;
        gap: 8px;
        transition: all 0.2s;
        user-select: none;
      }
      .tree-row:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      .tree-row.active {
        background: rgba(0, 151, 178, 0.15);
        color: #00d4ff;
      }
      .icon {
        width: 12px;
        font-size: 10px;
        transition: transform 0.2s;
        opacity: 0.5;
      }
      .icon.expanded {
        transform: rotate(90deg);
      }
      .folder-icon {
        font-size: 14px;
      }
      .label {
        font-size: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
})
export class FolderTreeItemComponent {
  private readonly mediaService = inject(MediaAdminService);

  @Input({ required: true }) node!: MediaAdminNode;
  @Input() level = 0;
  @Input() activePath = '';
  @Output() onSelect = new EventEmitter<string>();

  isExpanded = signal(false);

  // Cargar hijos solo cuando sea necesario (lazy loading del árbol)
  readonly children = toSignal(
    toObservable(this.isExpanded).pipe(
      switchMap((expanded) => {
        const nodePath = this.node?.path || '';
        if (!expanded || !nodePath) return of([]);
        return this.mediaService.getNodes$(nodePath);
      }),
      map((nodes) =>
        (nodes || []).filter(
          (n) => n && (n.kind === 'folder' || n.kind === 'service'),
        ),
      ),
    ),
    { initialValue: [] },
  );

  get hasChildren(): boolean {
    // Para simplificar, asumimos que todos los niveles de servicios/categorías pueden tener hijos
    // O podríamos verificar si es un paquete (hoja estática)
    return this.node && !this.node.isPackage;
  }

  toggleOrSelect() {
    console.log('Nodo clickeado:', this.node);
    if (!this.node || !this.node.path) {
      console.warn('Nodo inválido:', this.node);
      return;
    }
    this.onSelect.emit(this.node.path);
    if (this.hasChildren) {
      this.isExpanded.update((v) => !v);
    }
  }
}

@Component({
  selector: 'tj-folder-tree',
  standalone: true,
  imports: [CommonModule, FolderTreeItemComponent],
  template: `
    <div class="folder-tree">
      @for (rootNode of rootNodes(); track rootNode?.path || $index) {
        <tj-folder-tree-item
          [node]="rootNode"
          [level]="0"
          [activePath]="activePath"
          (onSelect)="onSelect.emit($event)"
        ></tj-folder-tree-item>
      } @empty {
        <div class="tree-empty">Cargando estructura...</div>
      }
    </div>
  `,
  styles: [
    `
      .folder-tree {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
    `,
  ],
})
export class FolderTreeComponent {
  private readonly mediaService = inject(MediaAdminService);

  @Input() activePath = '';
  @Output() onSelect = new EventEmitter<string>();

  readonly rootNodes = toSignal(this.mediaService.getFolderTree$(), {
    initialValue: [],
  });
}
