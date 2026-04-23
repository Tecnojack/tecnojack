import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tj-cms-inline-actions',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="cms-inline-actions" *ngIf="editable" [class.cms-inline-actions--compact]="compact">
      <span class="cms-inline-actions__label" *ngIf="label">{{ label }}</span>
      <div class="cms-inline-actions__buttons">
        <button type="button" *ngIf="canEdit" (click)="edit.emit()">{{ editing ? editActiveText : editText }}</button>
        <button type="button" *ngIf="canAdd" (click)="add.emit()">{{ addText }}</button>
        <button type="button" *ngIf="canDelete" class="is-danger" (click)="remove.emit()">{{ deleteText }}</button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .cms-inline-actions {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 0.75rem;
        border: 1px solid rgba(255, 193, 7, 0.28);
        border-radius: 999px;
        background: rgba(10, 12, 20, 0.82);
        backdrop-filter: blur(14px);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.24);
      }

      .cms-inline-actions--compact {
        padding: 0.35rem 0.5rem;
        gap: 0.5rem;
      }

      .cms-inline-actions__label {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        color: rgba(255, 221, 123, 0.92);
      }

      .cms-inline-actions__buttons {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
      }

      button {
        border: 0;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        color: #f6f7fb;
        padding: 0.4rem 0.8rem;
        font: inherit;
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 160ms ease, transform 160ms ease;
      }

      button:hover {
        background: rgba(255, 193, 7, 0.2);
        transform: translateY(-1px);
      }

      button.is-danger:hover {
        background: rgba(255, 90, 90, 0.22);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsInlineActionsComponent {
  @Input() editable = false;
  @Input() compact = false;
  @Input() editing = false;
  @Input() label = '';
  @Input() canEdit = true;
  @Input() canAdd = false;
  @Input() canDelete = false;
  @Input() editText = 'Editar';
  @Input() editActiveText = 'Cerrar edición';
  @Input() addText = 'Añadir';
  @Input() deleteText = 'Eliminar';

  @Output() readonly edit = new EventEmitter<void>();
  @Output() readonly add = new EventEmitter<void>();
  @Output() readonly remove = new EventEmitter<void>();
}
