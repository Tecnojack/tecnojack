import { NgIf, NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'tj-pdf-viewer-modal',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <div class="tj-pdf-modal-backdrop" *ngIf="isOpen">
      <div class="tj-pdf-modal-panel" role="dialog" aria-modal="true">
        <div class="tj-pdf-modal-header">
          <div>
            <p>Vista previa preliminar</p>
            <h3>{{ title || 'Contrato de Prestación de Servicios' }}</h3>
          </div>
          <button type="button" class="tj-pdf-modal-close" (click)="close()">✕ Cerrar</button>
        </div>

        <div class="tj-pdf-modal-watermark">
          <span>VISTA PREVIA — DOCUMENTO NO DEFINITIVO</span>
        </div>

        <div class="tj-pdf-modal-body">
          <iframe
            *ngIf="pdfUrl"
            [src]="pdfUrl"
            class="tj-pdf-iframe"
            title="Vista previa del contrato"></iframe>

          <div *ngIf="!pdfUrl" class="tj-pdf-fallback-text">
            <div class="tj-pdf-text-scroll">
              <pre>{{ textContent }}</pre>
            </div>
          </div>
        </div>

        <div class="tj-pdf-modal-footer">
          <button type="button" class="tj-btn-secondary" (click)="close()">
            ← Volver a corregir
          </button>
          <button type="button" class="tj-btn-primary" (click)="confirm()">
            Confirmar y Continuar a Firma →
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tj-pdf-modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: grid;
      place-items: center;
      background: rgba(0, 0, 0, 0.78);
      backdrop-filter: blur(8px);
      padding: 16px;
    }
    .tj-pdf-modal-panel {
      width: min(900px, 96vw);
      height: min(90vh, 850px);
      display: flex;
      flex-direction: column;
      border-radius: 20px;
      border: 1px solid var(--line, rgba(255, 255, 255, 0.15));
      background: #0d1e2b;
      color: #fff;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
    }
    .tj-pdf-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.1));
    }
    .tj-pdf-modal-header p {
      margin: 0;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--portfolio-accent, #ffb800);
    }
    .tj-pdf-modal-header h3 {
      margin: 2px 0 0;
      font-size: 1.15rem;
      font-weight: 700;
    }
    .tj-pdf-modal-close {
      background: transparent;
      border: none;
      color: #cbd5e1;
      font-size: 0.9rem;
      cursor: pointer;
    }
    .tj-pdf-modal-watermark {
      background: rgba(255, 184, 0, 0.15);
      border-bottom: 1px solid rgba(255, 184, 0, 0.3);
      padding: 6px 16px;
      text-align: center;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #ffb800;
    }
    .tj-pdf-modal-body {
      flex: 1;
      overflow: hidden;
      position: relative;
      background: #152737;
    }
    .tj-pdf-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    .tj-pdf-text-scroll {
      height: 100%;
      overflow-y: auto;
      padding: 24px;
    }
    .tj-pdf-text-scroll pre {
      white-space: pre-wrap;
      font-family: inherit;
      font-size: 0.88rem;
      line-height: 1.6;
      color: #e2e8f0;
      margin: 0;
    }
    .tj-pdf-modal-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-top: 1px solid var(--line, rgba(255, 255, 255, 0.1));
    }
    .tj-btn-secondary {
      padding: 10px 18px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: transparent;
      color: #fff;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .tj-btn-primary {
      padding: 10px 22px;
      border-radius: 10px;
      border: none;
      background: var(--portfolio-brand, #0097b2);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      font-size: 0.9rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() pdfUrl?: any;
  @Input() textContent = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmPdf = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }

  confirm(): void {
    this.confirmPdf.emit();
  }
}
