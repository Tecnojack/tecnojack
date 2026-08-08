import { NgIf, NgFor, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export type SignatureMethod = 'typed' | 'drawn' | 'uploaded';

export interface SignatureOutput {
  method: SignatureMethod;
  signerName: string;
  signerDocument: string;
  dataUrl?: string;
}

@Component({
  selector: 'tj-signature-pad',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule],
  template: `
    <div class="tj-sig-container">
      <div class="tj-sig-tabs">
        <button
          type="button"
          class="tj-sig-tab"
          [class.active]="activeTab() === 'drawn'"
          (click)="setTab('drawn')">
          ✏️ Dibujar firma
        </button>
        <button
          type="button"
          class="tj-sig-tab"
          [class.active]="activeTab() === 'typed'"
          (click)="setTab('typed')">
          ⌨️ Escribir nombre
        </button>
        <button
          type="button"
          class="tj-sig-tab"
          [class.active]="activeTab() === 'uploaded'"
          (click)="setTab('uploaded')">
          📁 Subir imagen
        </button>
      </div>

      <div class="tj-sig-body">
        <!-- TAB DIBUJAR -->
        <div *ngIf="activeTab() === 'drawn'" class="tj-sig-drawn-wrap">
          <p class="tj-sig-instruction">Dibuja tu rúbrica en el recuadro inferior con tu dedo o ratón:</p>
          <div class="tj-canvas-frame">
            <canvas
              #canvas
              (mousedown)="startDrawing($event)"
              (mousemove)="draw($event)"
              (mouseup)="stopDrawing()"
              (mouseleave)="stopDrawing()"
              (touchstart)="startDrawingTouch($event)"
              (touchmove)="drawTouch($event)"
              (touchend)="stopDrawing()"></canvas>
          </div>
          <div class="tj-sig-drawn-actions">
            <button type="button" class="tj-btn-ghost" (click)="clearCanvas()">Limpiar trazo</button>
          </div>
        </div>

        <!-- TAB ESCRIBIR -->
        <div *ngIf="activeTab() === 'typed'" class="tj-sig-typed-wrap">
          <label class="tj-sig-field">
            <span>Nombre completo para la firma:</span>
            <input
              type="text"
              [(ngModel)]="typedName"
              (input)="emitUpdate()"
              placeholder="Ej. Juan Pérez Córdoba" />
          </label>
          <div class="tj-sig-typed-preview" *ngIf="typedName.trim()">
            <span class="tj-sig-typed-font">{{ typedName }}</span>
          </div>
        </div>

        <!-- TAB UPLOAD -->
        <div *ngIf="activeTab() === 'uploaded'" class="tj-sig-upload-wrap">
          <p class="tj-sig-instruction">Sube una imagen de tu firma (PNG, JPG o WebP con fondo claro):</p>
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            (change)="onFileSelected($event)" />
          <div *ngIf="uploadedDataUrl()" class="tj-sig-upload-preview">
            <img [src]="uploadedDataUrl()" alt="Firma cargada" />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tj-sig-container {
      display: grid;
      gap: 16px;
      padding: 18px;
      border-radius: 16px;
      border: 1px solid var(--line, rgba(255, 255, 255, 0.12));
      background: rgba(8, 20, 28, 0.65);
    }
    .tj-sig-tabs {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .tj-sig-tab {
      padding: 8px 16px;
      border-radius: 999px;
      border: 1px solid var(--line, rgba(255, 255, 255, 0.15));
      background: transparent;
      color: var(--portfolio-muted, #aae1f5);
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      transition: all 180ms ease;
    }
    .tj-sig-tab.active {
      background: var(--portfolio-brand, #0097b2);
      color: #fff;
      border-color: var(--portfolio-brand, #0097b2);
    }
    .tj-sig-instruction {
      margin: 0 0 10px;
      font-size: 0.84rem;
      color: var(--portfolio-muted, #94a3b8);
    }
    .tj-canvas-frame {
      border: 2px dashed rgba(0, 151, 178, 0.4);
      border-radius: 12px;
      background: #ffffff;
      overflow: hidden;
      touch-action: none;
    }
    canvas {
      display: block;
      width: 100%;
      height: 180px;
      cursor: crosshair;
    }
    .tj-sig-drawn-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
    }
    .tj-btn-ghost {
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: transparent;
      color: #cbd5e1;
      cursor: pointer;
      font-size: 0.8rem;
    }
    .tj-sig-field {
      display: grid;
      gap: 6px;
    }
    .tj-sig-field span {
      font-size: 0.82rem;
      color: var(--portfolio-muted, #94a3b8);
    }
    .tj-sig-field input {
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--line, rgba(255, 255, 255, 0.2));
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 0.95rem;
    }
    .tj-sig-typed-preview {
      margin-top: 12px;
      padding: 16px;
      border-radius: 10px;
      background: #ffffff;
      text-align: center;
    }
    .tj-sig-typed-font {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-style: italic;
      font-size: 1.8rem;
      color: #0d233a;
      letter-spacing: 2px;
    }
    .tj-sig-upload-preview img {
      max-height: 120px;
      border-radius: 8px;
      background: #fff;
      padding: 8px;
      margin-top: 10px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignaturePadComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;
  @Input() signerName = '';
  @Input() signerDocument = '';
  @Output() signatureChange = new EventEmitter<SignatureOutput>();

  readonly activeTab = signal<SignatureMethod>('drawn');
  typedName = '';
  readonly uploadedDataUrl = signal<string | undefined>(undefined);

  private isDrawing = false;
  private hasDrawn = false;
  private ctx?: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  setTab(tab: SignatureMethod): void {
    this.activeTab.set(tab);
    if (tab === 'drawn') {
      setTimeout(() => this.initCanvas(), 50);
    }
    this.emitUpdate();
  }

  clearCanvas(): void {
    if (this.ctx && this.canvasRef) {
      const canvas = this.canvasRef.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.hasDrawn = false;
      this.emitUpdate();
    }
  }

  startDrawing(event: MouseEvent): void {
    this.isDrawing = true;
    const pos = this.getMousePos(event);
    this.ctx?.beginPath();
    this.ctx?.moveTo(pos.x, pos.y);
  }

  draw(event: MouseEvent): void {
    if (!this.isDrawing || !this.ctx) return;
    const pos = this.getMousePos(event);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
    this.hasDrawn = true;
    this.emitUpdate();
  }

  startDrawingTouch(event: TouchEvent): void {
    event.preventDefault();
    this.isDrawing = true;
    const pos = this.getTouchPos(event);
    this.ctx?.beginPath();
    this.ctx?.moveTo(pos.x, pos.y);
  }

  drawTouch(event: TouchEvent): void {
    event.preventDefault();
    if (!this.isDrawing || !this.ctx) return;
    const pos = this.getTouchPos(event);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
    this.hasDrawn = true;
    this.emitUpdate();
  }

  stopDrawing(): void {
    this.isDrawing = false;
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.uploadedDataUrl.set(result);
        this.emitUpdate();
      };
      reader.readAsDataURL(file);
    }
  }

  emitUpdate(): void {
    const method = this.activeTab();
    let dataUrl: string | undefined;

    if (method === 'drawn' && this.hasDrawn && this.canvasRef) {
      dataUrl = this.canvasRef.nativeElement.toDataURL('image/png');
    } else if (method === 'typed' && this.typedName.trim()) {
      dataUrl = this.renderTypedToDataUrl(this.typedName.trim());
    } else if (method === 'uploaded') {
      dataUrl = this.uploadedDataUrl();
    }

    this.signatureChange.emit({
      method,
      signerName: this.signerName || this.typedName,
      signerDocument: this.signerDocument,
      dataUrl,
    });
  }

  private initCanvas(): void {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 450;
    canvas.height = rect.height || 180;

    this.ctx = canvas.getContext('2d') || undefined;
    if (this.ctx) {
      this.ctx.strokeStyle = '#0d233a';
      this.ctx.lineWidth = 2.5;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
    }
  }

  private getMousePos(event: MouseEvent): { x: number; y: number } {
    if (!this.canvasRef) return { x: 0, y: 0 };
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  private getTouchPos(event: TouchEvent): { x: number; y: number } {
    if (!this.canvasRef || !event.touches[0]) return { x: 0, y: 0 };
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top,
    };
  }

  private renderTypedToDataUrl(text: string): string {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 400, 100);
      ctx.font = 'italic 32px Georgia, serif';
      ctx.fillStyle = '#0d233a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 200, 50);
    }
    return canvas.toDataURL('image/png');
  }
}
