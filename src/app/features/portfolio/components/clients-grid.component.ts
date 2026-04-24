import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Client, ClientService } from '../../../core/models/client.model';
import { ClientPublicService } from '../services/client-public.service';
import { getClientCover } from '../../../core/utils/storage-path.util';
import { Observable } from 'rxjs';
import { optimizeImage } from '../../../core/utils/image-optimizer.util';

@Component({
  selector: 'app-clients-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="clients-grid">
      <div *ngIf="(clients$ | async) as clients">
        <div *ngIf="clients.length === 0" class="clients-empty">
          <p>No hay clientes disponibles en esta categoría</p>
        </div>

        <div class="grid" [class]="gridClass">
          <a
            *ngFor="let client of clients"
            [routerLink]="['/clientes', service, client.slug]"
            class="client-item">
            <div class="client-item__image">
              <img
                src="assets/images/placeholder.jpg"
                [src]="optimizeImage(getCover(client.coverUrl), 400)"
                [alt]="client.name"
                loading="lazy"
                decoding="async"
                class="img" />
              <div class="overlay">
                <span class="view-btn">Ver galería</span>
              </div>
            </div>

            <div class="client-item__info">
              <h3 class="name">{{ client.name }}</h3>

              <div class="meta">
                <p *ngIf="client.eventDate" class="date">
                  {{ formatDate(client.eventDate) }}
                </p>
                <p *ngIf="client.location" class="location">
                  {{ client.location }}
                </p>
                <p *ngIf="service === 'grados' && client.institution"
                   class="institution">
                  {{ client.institution }}
                </p>
              </div>

              <div class="stats">
                <span class="stat">📸 {{ client.galleryCount }} fotos</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .clients-grid {
        width: 100%;
      }

      .clients-empty {
        text-align: center;
        padding: 60px 20px;
        color: #999;
      }

      .grid {
        display: grid;
        gap: 24px;
        width: 100%;
      }

      .grid.grid--2 {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }

      .grid.grid--3 {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      }

      .grid.grid--4 {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      }

      .client-item {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        border-radius: 12px;
        overflow: hidden;
        background: white;
        border: 1px solid #e0e0e0;
        transition: all 0.3s ease;
      }

      .client-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
      }

      .client-item__image {
        position: relative;
        width: 100%;
        height: 240px;
        overflow: hidden;
        background: #f0f0f0;
      }

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0) linear-gradient(
          to bottom,
          transparent 0%,
          rgba(0, 0, 0, 0.6) 100%
        );
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 16px;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .client-item:hover .overlay {
        opacity: 1;
      }

      .view-btn {
        background: white;
        color: #333;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
      }

      .client-item__info {
        padding: 20px 16px;
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .name {
        margin: 0 0 12px 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .meta {
        font-size: 13px;
        color: #666;
        margin-bottom: 12px;
      }

      .date,
      .location,
      .institution {
        margin: 4px 0;
      }

      .stats {
        display: flex;
        gap: 12px;
        font-size: 12px;
        color: #999;
        margin-top: auto;
      }

      .stat {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsGridComponent implements OnChanges {
  @Input() service: ClientService = 'bodas';
  @Input() columnsCount: 2 | 3 | 4 = 3;

  private readonly clientPublic = inject(ClientPublicService);

  clients$: Observable<Client[]>;

  constructor() {
    this.clients$ = this.clientPublic.getByService$(this.service);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['service']) {
      this.clients$ = this.clientPublic.getByService$(this.service);
    }
  }

  get gridClass(): string {
    return `grid grid--${this.columnsCount}`;
  }

  getCover(coverUrl?: string | null): string {
    return getClientCover(coverUrl);
  }

  optimizeImage(url: string, width = 400): string {
    return optimizeImage(url, width);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
