import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client, ClientService } from '../../../core/models/client.model';
import { ClientAdminService } from '../client-admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-clients-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="clients-list">
      <div *ngIf="(clients$ | async) as clients">
        <div *ngIf="clients.length === 0" class="clients-list__empty">
          <p>No hay clientes en esta categoría</p>
        </div>

        <div class="clients-list__grid">
          <div
            *ngFor="let client of clients"
            class="client-card"
            [class.client-card--draft]="client.status === 'draft'">
            <div class="client-card__image">
              <img
                [src]="client.coverUrl || 'assets/images/default-client.jpg'"
                [alt]="client.name"
                class="client-card__img" />
              <span *ngIf="client.status === 'draft'" class="client-card__badge">
                Borrador
              </span>
            </div>

            <div class="client-card__content">
              <h3 class="client-card__name">{{ client.name }}</h3>

              <div class="client-card__meta">
                <p *ngIf="client.eventDate" class="client-card__date">
                  📅 {{ formatDate(client.eventDate) }}
                </p>
                <p *ngIf="client.location" class="client-card__location">
                  📍 {{ client.location }}
                </p>
                <p *ngIf="service === 'grados' && client.institution"
                   class="client-card__institution">
                  🏫 {{ client.institution }}
                </p>
              </div>

              <div class="client-card__stats">
                <span class="stat">📸 {{ client.galleryCount }} imágenes</span>
              </div>
            </div>

            <div class="client-card__actions">
              <button
                class="btn-action btn-action--view"
                (click)="handleView.emit(client)"
                title="Ver galería">
                👁️
              </button>
              <button
                class="btn-action btn-action--edit"
                (click)="handleEdit.emit(client)"
                title="Editar">
                ✏️
              </button>
              <button
                class="btn-action btn-action--delete"
                (click)="handleDelete.emit(client)"
                title="Eliminar">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .clients-list {
        width: 100%;
      }

      .clients-list__empty {
        text-align: center;
        padding: 60px 20px;
        color: #999;
      }

      .clients-list__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }

      .client-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #e0e0e0;
        transition: all 0.3s ease;
      }

      .client-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .client-card--draft {
        opacity: 0.7;
        background: #f9f9f9;
      }

      .client-card__image {
        position: relative;
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: #f0f0f0;
      }

      .client-card__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .client-card__badge {
        position: absolute;
        top: 8px;
        right: 8px;
        background: #ff9800;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
      }

      .client-card__content {
        padding: 16px;
      }

      .client-card__name {
        margin: 0 0 12px 0;
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }

      .client-card__meta {
        font-size: 13px;
        color: #666;
        margin-bottom: 12px;
      }

      .client-card__date,
      .client-card__location,
      .client-card__institution {
        margin: 4px 0;
      }

      .client-card__stats {
        display: flex;
        gap: 12px;
        font-size: 12px;
        color: #999;
        margin-bottom: 12px;
      }

      .stat {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      .client-card__actions {
        display: flex;
        border-top: 1px solid #e0e0e0;
        background: #f9f9f9;
      }

      .btn-action {
        flex: 1;
        padding: 10px;
        background: transparent;
        border: none;
        border-right: 1px solid #e0e0e0;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.2s;
      }

      .btn-action:last-child {
        border-right: none;
      }

      .btn-action:hover {
        background: #f0f0f0;
      }

      .btn-action--view:hover {
        background: #e3f2fd;
      }

      .btn-action--edit:hover {
        background: #f3e5f5;
      }

      .btn-action--delete:hover {
        background: #ffebee;
      }
    `,
  ],
})
export class AdminClientsListComponent {
  @Input() service: ClientService = 'bodas';
  @Output() handleView = new EventEmitter<Client>();
  @Output() handleEdit = new EventEmitter<Client>();
  @Output() handleDelete = new EventEmitter<Client>();

  private readonly clientAdmin = inject(ClientAdminService);

  clients$: Observable<Client[]>;

  constructor() {
    this.clients$ = this.clientAdmin.listByService$(this.service);
  }

  ngOnChanges(): void {
    this.clients$ = this.clientAdmin.listByService$(this.service);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
}
