import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { CmsVisualEditorService } from '../services/cms-visual-editor.service';

@Component({
  selector: 'tj-cms-visual-edit-toolbar',
  standalone: true,
  imports: [NgIf],
  template: `
    <aside class="cms-visual-toolbar" *ngIf="isEditMode()">
      <div class="cms-visual-toolbar__copy">
        <span class="cms-visual-toolbar__eyebrow">Modo edición</span>
        <strong>CMS visual activo</strong>
        <small *ngIf="userEmail()">{{ userEmail() }}</small>
      </div>

      <div class="cms-visual-toolbar__actions">
        <button type="button" (click)="openAdminDashboard()">Panel admin</button>
        <button type="button" class="is-ghost" (click)="logout()">Salir</button>
      </div>
    </aside>
  `,
  styles: [
    `
      :host {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 70;
      }

      .cms-visual-toolbar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.85rem 1rem;
        border-radius: 1.2rem;
        border: 1px solid rgba(255, 193, 7, 0.22);
        background: rgba(8, 10, 18, 0.9);
        box-shadow: 0 22px 48px rgba(0, 0, 0, 0.32);
        backdrop-filter: blur(16px);
        color: #f8f7f2;
      }

      .cms-visual-toolbar__copy {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
      }

      .cms-visual-toolbar__eyebrow {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        color: rgba(255, 221, 123, 0.92);
      }

      strong {
        font-size: 0.95rem;
      }

      small {
        color: rgba(255, 255, 255, 0.68);
      }

      .cms-visual-toolbar__actions {
        display: flex;
        gap: 0.6rem;
      }

      button {
        border: 0;
        border-radius: 999px;
        background: #ffc107;
        color: #1a1200;
        padding: 0.6rem 0.9rem;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }

      button.is-ghost {
        background: rgba(255, 255, 255, 0.1);
        color: #f8f7f2;
      }

      @media (max-width: 720px) {
        :host {
          right: 0.75rem;
          left: 0.75rem;
          bottom: 0.75rem;
        }

        .cms-visual-toolbar {
          flex-direction: column;
          align-items: stretch;
        }

        .cms-visual-toolbar__actions {
          justify-content: stretch;
        }

        button {
          flex: 1;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsVisualEditToolbarComponent {
  private readonly editor = inject(CmsVisualEditorService);

  readonly isEditMode = computed(() => this.editor.isEditMode());
  readonly userEmail = computed(() => this.editor.currentUserEmail());

  async openAdminDashboard(): Promise<void> {
    await this.editor.openAdminDashboard();
  }

  async logout(): Promise<void> {
    await this.editor.logout();
  }
}
