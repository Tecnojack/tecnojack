import { AsyncPipe, NgFor, NgIf, DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ContractAdminService } from '../services/contract-admin.service';
import { ContractDocument, ContractStatus } from '../models/contract.model';
import { formatCurrency } from '../utils/contract-financial.util';

@Component({
  selector: 'tj-admin-contracts-list-page',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, DatePipe, FormsModule, RouterLink],
  template: `
    <div class="tj-admin-contracts-container">
      <div class="tj-admin-header">
        <div>
          <a routerLink="/media-admin" class="tj-admin-back">← Volver al Panel Admin</a>
          <h1>Gestión de Contratos Digitales</h1>
          <p class="tj-admin-subtitle">Crea, administra y consulta la firma electrónica de contratos de servicios.</p>
        </div>
        <button type="button" class="tj-btn-primary" (click)="createNewContract()">
          + Crear Nuevo Contrato
        </button>
      </div>

      <!-- Filtros -->
      <div class="tj-admin-filters">
        <div class="tj-filter-field">
          <span>Buscar por cliente o N°</span>
          <input
            type="text"
            [value]="searchTerm()"
            (input)="searchTerm.set($any($event.target).value)"
            placeholder="Nombre, documento o N° contrato..." />
        </div>

        <div class="tj-filter-field">
          <span>Estado del contrato</span>
          <select [value]="statusFilter()" (change)="statusFilter.set($any($event.target).value)">
            <option value="all">Todos los estados</option>
            <option value="draft">Borrador</option>
            <option value="ready_to_sign">Listo para firma</option>
            <option value="opened">Abierto por cliente</option>
            <option value="signed">Firmado</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      </div>

      <!-- Tabla / Tarjetas de contratos -->
      <div class="tj-admin-table-wrap" *ngIf="!isLoading(); else loadingState">
        <table class="tj-admin-table" *ngIf="filteredContracts().length; else emptyState">
          <thead>
            <tr>
              <th>N° Contrato</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Valor Total</th>
              <th>Anticipo</th>
              <th>Saldo Pendiente</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let contract of filteredContracts()">
              <td>
                <strong class="tj-contract-num">{{ contract.contractNumber }}</strong>
                <br />
                <small class="tj-text-muted">{{ contract.createdAt | date:'shortDate' }}</small>
              </td>
              <td>
                <strong>{{ contract.client.fullName }}</strong>
                <br />
                <small class="tj-text-muted">{{ contract.client.documentType }} {{ contract.client.documentNumber }}</small>
              </td>
              <td>
                <span>{{ contract.service.packageName }}</span>
                <br />
                <small class="tj-text-muted">{{ contract.service.eventDate || 'Sin fecha' }}</small>
              </td>
              <td>
                <strong>{{ formatCop(contract.payment.totalAmount, contract.payment.currency) }}</strong>
              </td>
              <td>
                <span class="tj-badge-paid">{{ contract.payment.paidPercentage }}%</span>
                <br />
                <small>{{ formatCop(contract.payment.paidAmount, contract.payment.currency) }}</small>
              </td>
              <td>
                <strong [class.tj-text-danger]="contract.payment.remainingAmount > 0">
                  {{ formatCop(contract.payment.remainingAmount, contract.payment.currency) }}
                </strong>
              </td>
              <td>
                <span class="tj-status-badge" [attr.data-status]="contract.status">
                  {{ getStatusLabel(contract.status) }}
                </span>
              </td>
              <td>
                <div class="tj-actions-group">
                  <button type="button" class="tj-action-btn" (click)="viewDetail(contract.id)">
                    Ver
                  </button>
                  <button
                    type="button"
                    class="tj-action-btn tj-action-btn--share"
                    *ngIf="contract.status === 'ready_to_sign' || contract.status === 'opened'"
                    (click)="copyLink(contract.token)">
                    Copiar Enlace
                  </button>
                  <button
                    type="button"
                    class="tj-action-btn"
                    *ngIf="contract.status === 'draft'"
                    (click)="editDraft(contract.id)">
                    Editar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #loadingState>
        <div class="tj-admin-loading">
          <p>Cargando lista de contratos...</p>
        </div>
      </ng-template>

      <ng-template #emptyState>
        <div class="tj-admin-empty">
          <p>No se encontraron contratos registrados con los filtros seleccionados.</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .tj-admin-contracts-container {
      width: min(1200px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 60px;
      color: #fff;
    }
    .tj-admin-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 20px;
      margin-bottom: 28px;
    }
    .tj-admin-back {
      color: var(--portfolio-brand, #0097b2);
      text-decoration: none;
      font-size: 0.9rem;
    }
    .tj-admin-header h1 {
      margin: 8px 0 4px;
      font-size: 2.2rem;
    }
    .tj-admin-subtitle {
      margin: 0;
      color: var(--portfolio-muted, #94a3b8);
    }
    .tj-btn-primary {
      padding: 12px 24px;
      border-radius: 12px;
      border: none;
      background: var(--portfolio-brand, #0097b2);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      font-size: 0.95rem;
    }
    .tj-admin-filters {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    .tj-filter-field {
      display: grid;
      gap: 6px;
      min-width: 240px;
    }
    .tj-filter-field span {
      font-size: 0.8rem;
      color: var(--portfolio-muted, #94a3b8);
    }
    .tj-filter-field input,
    .tj-filter-field select {
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--line, rgba(255, 255, 255, 0.15));
      background: rgba(8, 20, 28, 0.8);
      color: #fff;
    }
    .tj-admin-table-wrap {
      border-radius: 16px;
      border: 1px solid var(--line, rgba(255, 255, 255, 0.12));
      background: rgba(8, 20, 28, 0.7);
      overflow-x: auto;
    }
    .tj-admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .tj-admin-table th,
    .tj-admin-table td {
      padding: 14px 18px;
      border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.08));
    }
    .tj-admin-table th {
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--portfolio-muted, #94a3b8);
      background: rgba(255, 255, 255, 0.02);
    }
    .tj-contract-num {
      color: var(--portfolio-brand, #0097b2);
    }
    .tj-text-muted {
      color: #94a3b8;
      font-size: 0.82rem;
    }
    .tj-text-danger {
      color: #f87171;
    }
    .tj-badge-paid {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 6px;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      font-weight: 700;
      font-size: 0.8rem;
    }
    .tj-status-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .tj-status-badge[data-status="draft"] { background: rgba(148, 163, 184, 0.2); color: #cbd5e1; }
    .tj-status-badge[data-status="ready_to_sign"] { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
    .tj-status-badge[data-status="opened"] { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
    .tj-status-badge[data-status="signed"],
    .tj-status-badge[data-status="completed"] { background: rgba(16, 185, 129, 0.2); color: #34d399; }
    .tj-status-badge[data-status="cancelled"] { background: rgba(239, 68, 68, 0.2); color: #f87171; }
    .tj-actions-group {
      display: flex;
      gap: 6px;
    }
    .tj-action-btn {
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: transparent;
      color: #fff;
      cursor: pointer;
      font-size: 0.8rem;
    }
    .tj-action-btn--share {
      background: var(--portfolio-brand, #0097b2);
      border-color: var(--portfolio-brand, #0097b2);
    }
    .tj-admin-empty, .tj-admin-loading {
      padding: 40px;
      text-align: center;
      color: #94a3b8;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContractsListPageComponent implements OnInit {
  private readonly contractAdmin = inject(ContractAdminService);
  private readonly router = inject(Router);

  readonly contracts = signal<ContractDocument[]>([]);
  readonly isLoading = signal(true);
  readonly searchTerm = signal('');
  readonly statusFilter = signal('all');

  ngOnInit(): void {
    this.loadContracts();
  }

  async loadContracts(): Promise<void> {
    this.isLoading.set(true);
    try {
      const list = await this.contractAdmin.getAllContracts();
      this.contracts.set(list);
    } catch (err) {
      console.error('Error al cargar contratos:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  filteredContracts(): ContractDocument[] {
    const term = this.searchTerm().toLowerCase().trim();
    const status = this.statusFilter();

    return this.contracts().filter((c) => {
      const matchesStatus = status === 'all' || c.status === status;
      const matchesTerm =
        !term ||
        c.contractNumber.toLowerCase().includes(term) ||
        c.client.fullName.toLowerCase().includes(term) ||
        c.client.documentNumber.includes(term) ||
        c.service.packageName.toLowerCase().includes(term);

      return matchesStatus && matchesTerm;
    });
  }

  createNewContract(): void {
    this.router.navigate(['/media-admin/contratos/nuevo']);
  }

  viewDetail(id: string): void {
    this.router.navigate(['/media-admin/contratos', id]);
  }

  editDraft(id: string): void {
    this.router.navigate(['/media-admin/contratos', id, 'editar']);
  }

  async copyLink(token: string): Promise<void> {
    const link = await this.contractAdmin.generateShareableLink(token);
    await navigator.clipboard.writeText(link);
    alert('¡Enlace de firma copiado al portapapeles!\n\n' + link);
  }

  formatCop(amount: number, currency = 'COP'): string {
    return formatCurrency(amount, currency);
  }

  getStatusLabel(status: ContractStatus): string {
    switch (status) {
      case 'draft': return 'Borrador';
      case 'ready_to_sign': return 'Listo para firma';
      case 'opened': return 'Abierto';
      case 'signed': return 'Firmado';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      case 'expired': return 'Expirado';
      default: return status;
    }
  }
}
