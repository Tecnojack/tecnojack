import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

import {
  ServiceRequestStatus,
} from '../../../services/service-request.service';
import { ServiceRequestViewModel } from '../service-requests-admin.service';

@Component({
  selector: 'tj-requests-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="requests-list">
      <header class="requests-list__header">
        <h2>Listado de solicitudes</h2>
      </header>

      @if (!requests.length) {
        <div class="requests-list__empty">
          No hay solicitudes para los filtros actuales.
        </div>
      } @else {
        <div class="requests-list__table-wrap">
          <table class="requests-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Contacto</th>
                <th>Solicitud</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              @for (request of requests; track request.id) {
                <tr>
                  <td>
                    <strong>{{ request.name }}</strong>
                    <div class="requests-table__secondary">
                      Fecha: {{ request.effectiveDate | date: 'dd/MM/yyyy' }}
                    </div>
                    @if (request.email) {
                      <div class="requests-table__secondary">{{ request.email }}</div>
                    }
                  </td>
                  <td>
                    <a class="requests-table__phone" [href]="'https://wa.me/' + sanitizePhone(request.phone)" target="_blank" rel="noopener">
                      {{ request.phone }}
                    </a>
                    @if (request.location) {
                      <div class="requests-table__secondary">{{ request.location }}</div>
                    }
                  </td>
                  <td>
                    <div class="requests-table__service">{{ request.service }}</div>
                    <div class="requests-table__secondary">{{ request.package || 'Sin paquete' }}</div>
                    @if (request.message) {
                      <div class="requests-table__snippet">{{ request.message }}</div>
                    }
                  </td>
                  <td class="requests-table__status-cell">
                    <span class="status-pill" [class.status-pill--new]="request.status === 'new'" [class.status-pill--contacted]="request.status === 'contacted'" [class.status-pill--closed]="request.status === 'closed'">
                      {{ statusLabel(request.status) }}
                    </span>
                    <select
                      [value]="request.status"
                      (change)="onStatusChange(request.id, $event)"
                      [class.status-new]="request.status === 'new'"
                      [class.status-contacted]="request.status === 'contacted'"
                      [class.status-closed]="request.status === 'closed'"
                    >
                      <option value="new">Nuevo</option>
                      <option value="contacted">Contactado</option>
                      <option value="closed">Cerrado</option>
                    </select>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </section>
  `,
  styles: [
    `
      .requests-list {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.02);
        padding: 16px;
      }

      .requests-list__header h2 {
        margin: 0 0 12px 0;
        font-size: 1rem;
      }

      .requests-list__empty {
        padding: 20px;
        text-align: center;
        border: 1px dashed rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        color: #9ba5b2;
      }

      .requests-list__table-wrap {
        overflow: auto;
      }

      .requests-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 960px;
      }

      .requests-table th,
      .requests-table td {
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        text-align: left;
        vertical-align: top;
        padding: 12px 10px;
        font-size: 0.9rem;
      }

      .requests-table th {
        color: #9ba5b2;
        font-weight: 600;
        font-size: 0.78rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      .requests-table tbody tr:hover {
        background: rgba(255, 255, 255, 0.02);
      }

      .requests-table__secondary {
        margin-top: 2px;
        font-size: 0.78rem;
        color: #9ba5b2;
      }

      .requests-table__phone {
        color: #bcefff;
        text-decoration: none;
        border-bottom: 1px dashed rgba(188, 239, 255, 0.5);
      }

      .requests-table__service {
        font-weight: 600;
      }

      .requests-table__snippet {
        margin-top: 6px;
        font-size: 0.78rem;
        color: #c7d7e4;
        max-width: 420px;
        line-height: 1.35;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .requests-table__status-cell {
        display: grid;
        gap: 8px;
      }

      .status-pill {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        border-radius: 999px;
        padding: 2px 10px;
        font-size: 0.72rem;
        border: 1px solid transparent;
      }

      .status-pill--new {
        color: #a9eeff;
        background: rgba(0, 212, 255, 0.12);
        border-color: rgba(0, 212, 255, 0.35);
      }

      .status-pill--contacted {
        color: #ffdca2;
        background: rgba(243, 173, 58, 0.12);
        border-color: rgba(243, 173, 58, 0.35);
      }

      .status-pill--closed {
        color: #b2f7d3;
        background: rgba(16, 185, 129, 0.12);
        border-color: rgba(16, 185, 129, 0.35);
      }

      select {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        color: #fff;
        padding: 6px 10px;
      }

      select.status-new {
        border-color: rgba(0, 212, 255, 0.5);
      }

      select.status-contacted {
        border-color: rgba(243, 173, 58, 0.6);
      }

      select.status-closed {
        border-color: rgba(16, 185, 129, 0.55);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsListComponent {
  @Input({ required: true }) requests: ServiceRequestViewModel[] = [];

  @Output() statusChange = new EventEmitter<{
    id: string;
    status: ServiceRequestStatus;
  }>();

  onStatusChange(id: string, event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const status = target?.value as ServiceRequestStatus | undefined;
    if (!status || !['new', 'contacted', 'closed'].includes(status)) {
      return;
    }

    this.statusChange.emit({ id, status });
  }

  statusLabel(status: ServiceRequestStatus): string {
    if (status === 'new') {
      return 'Nuevo';
    }

    if (status === 'contacted') {
      return 'Contactado';
    }

    return 'Cerrado';
  }

  sanitizePhone(phone: string): string {
    return (phone ?? '').replace(/[^\d]/g, '');
  }
}
