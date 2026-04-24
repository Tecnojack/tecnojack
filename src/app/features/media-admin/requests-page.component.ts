import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import {
  ServiceRequestDocument,
  ServiceRequestStatus,
} from '../../services/service-request.service';
import {
  ServiceRequestViewModel,
  ServiceRequestsAdminService,
} from './service-requests-admin.service';
import { RequestsCalendarComponent } from './components/requests-calendar.component';
import { RequestsListComponent } from './components/requests-list.component';

@Component({
  selector: 'tj-requests-page',
  standalone: true,
  imports: [CommonModule, RequestsListComponent, RequestsCalendarComponent],
  template: `
    <div class="requests-page">
      <header class="requests-page__header">
        <div class="requests-page__title-wrap">
          <p class="requests-page__eyebrow">CRM de Leads</p>
          <h1>Solicitudes de Servicio</h1>
          <p>Gestiona, filtra y da seguimiento a todas las solicitudes desde un solo panel.</p>
        </div>
        <div class="requests-page__total-pill">Mostrando {{ filteredRequests().length }} de {{ requests().length }}</div>
      </header>

      <section class="requests-page__summary-cards">
        <article class="summary-card summary-card--new">
          <span>Nuevos</span>
          <strong>{{ summary().new }}</strong>
        </article>
        <article class="summary-card summary-card--contacted">
          <span>Contactados</span>
          <strong>{{ summary().contacted }}</strong>
        </article>
        <article class="summary-card summary-card--closed">
          <span>Cerrados</span>
          <strong>{{ summary().closed }}</strong>
        </article>
      </section>

      <section class="requests-page__filters">
        <label class="requests-page__field">
          <span>Buscar lead</span>
          <input
            type="search"
            placeholder="Nombre, teléfono, servicio, ciudad..."
            [value]="searchTerm()"
            (input)="onSearch($event)"
          />
        </label>

        <label class="requests-page__field">
          <span>Estado</span>
          <select [value]="statusFilter()" (change)="onStatusFilterChange($event)">
            <option value="all">Todos</option>
            <option value="new">Nuevo</option>
            <option value="contacted">Contactado</option>
            <option value="closed">Cerrado</option>
          </select>
        </label>

        <div class="requests-page__actions">
          <button type="button" (click)="clearFilters()">Limpiar filtros</button>
        </div>
      </section>

      @if (feedback()) {
        <p class="requests-page__feedback">{{ feedback() }}</p>
      }

      <div class="requests-page__content">
        <tj-requests-list
          [requests]="filteredRequests()"
          (statusChange)="updateStatus($event.id, $event.status)"
        ></tj-requests-list>

        <tj-requests-calendar [requests]="filteredRequests()"></tj-requests-calendar>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      .requests-page {
        padding: 24px;
        display: grid;
        gap: 18px;
      }

      .requests-page__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 14px;
      }

      .requests-page__eyebrow {
        margin: 0 0 4px;
        font-size: 0.72rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #9fb6c9;
      }

      .requests-page__header h1 {
        margin: 0;
        font-size: 1.95rem;
        line-height: 1.1;
      }

      .requests-page__header p {
        margin: 6px 0 0;
        color: #9ba5b2;
        max-width: 760px;
      }

      .requests-page__total-pill {
        border: 1px solid rgba(102, 224, 255, 0.3);
        background: rgba(48, 109, 130, 0.25);
        color: #cef2ff;
        border-radius: 999px;
        padding: 8px 14px;
        font-size: 0.8rem;
        font-weight: 600;
        white-space: nowrap;
      }

      .requests-page__summary-cards {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      .summary-card {
        border-radius: 14px;
        padding: 12px 14px;
        border: 1px solid rgba(255, 255, 255, 0.09);
        background: rgba(255, 255, 255, 0.02);
        display: grid;
        gap: 4px;
      }

      .summary-card span {
        color: #9ba5b2;
        font-size: 0.78rem;
      }

      .summary-card strong {
        font-size: 1.4rem;
        line-height: 1;
      }

      .summary-card--new {
        border-color: rgba(0, 212, 255, 0.3);
      }

      .summary-card--contacted {
        border-color: rgba(243, 173, 58, 0.35);
      }

      .summary-card--closed {
        border-color: rgba(16, 185, 129, 0.35);
      }

      .requests-page__filters {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        background: linear-gradient(120deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
        padding: 14px;
        display: grid;
        gap: 10px;
        grid-template-columns: minmax(220px, 2fr) minmax(180px, 1fr) auto;
        align-items: end;
      }

      .requests-page__field {
        display: grid;
        gap: 6px;
      }

      .requests-page__field span {
        font-size: 0.78rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #9ba5b2;
      }

      .requests-page__filters input,
      .requests-page__filters select {
        height: 40px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.03);
        color: #fff;
        padding: 0 10px;
      }

      .requests-page__actions {
        display: flex;
        justify-content: flex-end;
      }

      .requests-page__actions button {
        height: 40px;
        border-radius: 10px;
        padding: 0 12px;
        border: 1px solid rgba(255, 255, 255, 0.24);
        background: rgba(255, 255, 255, 0.04);
        color: #e8f4ff;
        cursor: pointer;
      }

      .requests-page__feedback {
        margin: 0;
        color: #9ed8a8;
        font-size: 0.88rem;
      }

      .requests-page__content {
        display: grid;
        grid-template-columns: 1.45fr 1fr;
        gap: 16px;
        min-height: 480px;
      }

      @media (max-width: 1200px) {
        .requests-page__header {
          flex-direction: column;
          align-items: flex-start;
        }

        .requests-page__summary-cards {
          grid-template-columns: 1fr;
        }

        .requests-page__filters {
          grid-template-columns: 1fr;
        }

        .requests-page__actions {
          justify-content: flex-start;
        }

        .requests-page__content {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsPageComponent {
  private readonly requestsAdmin = inject(ServiceRequestsAdminService);

  readonly searchTerm = signal('');
  readonly statusFilter = signal<'all' | ServiceRequestStatus>('all');
  readonly feedback = signal<string | null>(null);

  private readonly requestsRaw = toSignal(this.requestsAdmin.requests$, {
    initialValue: [] as ServiceRequestDocument[],
  });

  readonly requests = computed(() =>
    this.requestsRaw().map((request) => ({
      ...request,
      effectiveDate: this.resolveEffectiveDate(request),
    }) as ServiceRequestViewModel),
  );

  readonly filteredRequests = computed(() => {
    const text = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();

    return this.requests().filter((request) => {
      const passStatus = status === 'all' ? true : request.status === status;
      if (!passStatus) {
        return false;
      }

      if (!text) {
        return true;
      }

      const haystack = [
        request.name,
        request.phone,
        request.email,
        request.service,
        request.package,
        request.message,
        request.location,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(text);
    });
  });

  readonly summary = computed(() => {
    const rows = this.filteredRequests();
    return {
      new: rows.filter((item) => item.status === 'new').length,
      contacted: rows.filter((item) => item.status === 'contacted').length,
      closed: rows.filter((item) => item.status === 'closed').length,
    };
  });

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.searchTerm.set(target?.value ?? '');
  }

  onStatusFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const next = (target?.value ?? 'all') as 'all' | ServiceRequestStatus;
    if (!['all', 'new', 'contacted', 'closed'].includes(next)) {
      return;
    }
    this.statusFilter.set(next);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('all');
  }

  async updateStatus(id: string, status: ServiceRequestStatus): Promise<void> {
    try {
      await this.requestsAdmin.updateStatus(id, status);
      this.feedback.set('Estado actualizado correctamente.');
      setTimeout(() => this.feedback.set(null), 2500);
    } catch (error) {
      this.feedback.set('No se pudo actualizar el estado. Revisa permisos.');
      console.error('Error updating request status', error);
    }
  }

  private resolveEffectiveDate(request: ServiceRequestDocument): string {
    const eventDate = (request.eventDate ?? '').trim();
    if (eventDate.length >= 10) {
      return eventDate.slice(0, 10);
    }

    const date = (request.date ?? '').trim();
    if (date.length >= 10) {
      return date.slice(0, 10);
    }

    const createdAt = (request.createdAt ?? '').trim();
    if (createdAt.length >= 10) {
      return createdAt.slice(0, 10);
    }

    return new Date().toISOString().slice(0, 10);
  }
}
