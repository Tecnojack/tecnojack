import { AsyncPipe, NgFor, NgIf, DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ContractAdminService } from '../services/contract-admin.service';
import { ContractDocument } from '../models/contract.model';
import { formatCurrency } from '../utils/contract-financial.util';

@Component({
  selector: 'tj-admin-contract-detail-page',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, DatePipe, RouterLink],
  template: `
    <div class="tj-admin-detail-container" *ngIf="contract() as c">
      <div class="tj-admin-header">
        <div>
          <a routerLink="/media-admin/contratos" class="tj-admin-back">← Volver al Listado de Contratos</a>
          <h1>Contrato N° {{ c.contractNumber }}</h1>
          <span class="tj-status-badge" [attr.data-status]="c.status">{{ c.status }}</span>
        </div>

        <div class="tj-header-actions">
          <button
            type="button"
            class="tj-btn-primary"
            *ngIf="c.status === 'ready_to_sign' || c.status === 'opened'"
            (click)="copyLink(c.token)">
            🔗 Copiar Enlace de Firma
          </button>
          <a
            *ngIf="c.pdf?.downloadUrl"
            [href]="c.pdf?.downloadUrl"
            target="_blank"
            download
            class="tj-btn-secondary">
            📥 Descargar PDF Firmado
          </a>
        </div>
      </div>

      <div class="tj-detail-grid">
        <!-- Columna 1: Resumen General y Cliente -->
        <div class="tj-card">
          <h3>Datos del Cliente</h3>
          <p><strong>Nombre:</strong> {{ c.client.fullName }}</p>
          <p><strong>Documento:</strong> {{ c.client.documentType }} {{ c.client.documentNumber }}</p>
          <p><strong>Correo:</strong> {{ c.client.email }}</p>
          <p><strong>Teléfono:</strong> {{ c.client.phone }}</p>
          <p><strong>Ciudad:</strong> {{ c.client.city || 'No especificada' }}</p>
        </div>

        <!-- Columna 2: Resumen Económico -->
        <div class="tj-card">
          <h3>Resumen Económico</h3>
          <p><strong>Valor Base:</strong> {{ formatCop(c.payment.baseAmount) }}</p>
          <p><strong>Adicionales:</strong> {{ formatCop(c.payment.extrasAmount) }}</p>
          <p><strong>Viáticos / Transporte:</strong> {{ formatCop(c.payment.transportAmount) }}</p>
          <p><strong>Descuento:</strong> {{ formatCop(c.payment.discountAmount) }}</p>
          <hr />
          <p><strong>TOTAL CONTRATO:</strong> {{ formatCop(c.payment.totalAmount) }}</p>
          <p><strong class="tj-text-accent">Anticipo Recibido:</strong> {{ formatCop(c.payment.paidAmount) }} ({{ c.payment.paidPercentage }}%)</p>
          <p><strong [class.tj-text-danger]="c.payment.remainingAmount > 0">Saldo Pendiente:</strong> {{ formatCop(c.payment.remainingAmount) }}</p>
        </div>

        <!-- Columna 3: Detalles del Servicio -->
        <div class="tj-card tj-card--full">
          <h3>Servicio Contratado</h3>
          <p><strong>Paquete:</strong> {{ c.service.packageName }}</p>
          <p><strong>Fecha del Evento:</strong> {{ c.service.eventDate || 'Sin fecha' }}</p>
          <p><strong>Locación:</strong> {{ c.service.location || 'Por definir' }}</p>

          <div *ngIf="c.service.features.length">
            <strong>Características:</strong>
            <ul>
              <li *ngFor="let f of c.service.features">{{ f }}</li>
            </ul>
          </div>

          <div *ngIf="c.service.deliverables.length">
            <strong>Entregables:</strong>
            <ul>
              <li *ngFor="let d of c.service.deliverables">{{ d }}</li>
            </ul>
          </div>
        </div>

        <!-- Columna 4: Firma y Evidencia Digital -->
        <div class="tj-card tj-card--full" *ngIf="c.signature">
          <h3>Firma y Evidencia Electrónica</h3>
          <p><strong>Firmante:</strong> {{ c.signature.signerName }} ({{ c.signature.signerDocument }})</p>
          <p><strong>Método de Firma:</strong> {{ c.signature.method }}</p>
          <p><strong>Fecha y Hora de Firma:</strong> {{ c.signature.signedAt | date:'medium' }}</p>
          <p *ngIf="c.pdf?.sha256"><strong>Hash SHA-256:</strong> <code>{{ c.pdf?.sha256 }}</code></p>
        </div>

        <!-- Columna 5: Registro de Auditoría -->
        <div class="tj-card tj-card--full">
          <h3>Historial de Auditoría</h3>
          <div class="tj-audit-list">
            <div class="tj-audit-item" *ngFor="let item of c.audit">
              <span class="tj-audit-action">{{ item.action }}</span>
              <span class="tj-audit-time">{{ item.at | date:'short' }}</span>
              <span class="tj-audit-actor">({{ item.actorType }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tj-admin-detail-container {
      width: min(1080px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 60px;
      color: #fff;
    }
    .tj-admin-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 28px;
    }
    .tj-admin-back { color: var(--portfolio-brand, #0097b2); text-decoration: none; font-size: 0.9rem; }
    .tj-admin-header h1 { margin: 6px 0; font-size: 2rem; }
    .tj-header-actions { display: flex; gap: 12px; }
    .tj-btn-primary { padding: 10px 20px; border-radius: 10px; border: none; background: var(--portfolio-brand, #0097b2); color: #fff; font-weight: 700; cursor: pointer; }
    .tj-btn-secondary { padding: 10px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: #fff; text-decoration: none; font-size: 0.9rem; }
    .tj-detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }
    .tj-card { padding: 20px; border-radius: 16px; border: 1px solid var(--line, rgba(255,255,255,0.12)); background: rgba(8, 20, 28, 0.7); display: grid; gap: 8px; }
    .tj-card--full { grid-column: 1 / -1; }
    .tj-card h3 { margin: 0 0 10px; font-size: 1.1rem; color: var(--portfolio-accent, #ffb800); }
    .tj-card p { margin: 0; font-size: 0.92rem; color: #cbd5e1; }
    .tj-text-accent { color: #34d399; }
    .tj-text-danger { color: #f87171; }
    .tj-status-badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; background: rgba(0,151,178,0.2); color: #0097b2; }
    .tj-audit-list { display: grid; gap: 8px; }
    .tj-audit-item { display: flex; gap: 12px; font-size: 0.85rem; padding: 6px 10px; border-radius: 6px; background: rgba(255,255,255,0.03); }
    .tj-audit-action { font-weight: 700; color: var(--portfolio-brand, #0097b2); }
    .tj-audit-time { color: #94a3b8; }
    .tj-audit-actor { color: #64748b; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContractDetailPageComponent implements OnInit {
  private readonly contractAdmin = inject(ContractAdminService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly contract = signal<ContractDocument | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadContract(id);
    }
  }

  async loadContract(id: string): Promise<void> {
    const doc = await this.contractAdmin.getContractById(id);
    if (!doc) {
      this.router.navigate(['/media-admin/contratos']);
      return;
    }
    this.contract.set(doc);
  }

  async copyLink(token: string): Promise<void> {
    const link = await this.contractAdmin.generateShareableLink(token);
    await navigator.clipboard.writeText(link);
    alert('¡Enlace de firma copiado al portapapeles!\n\n' + link);
  }

  formatCop(amount: number): string {
    return formatCurrency(amount);
  }
}
