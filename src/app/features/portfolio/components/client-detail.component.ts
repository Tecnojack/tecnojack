import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ClientPublicService } from '../services/client-public.service';
import { ClientsGalleryComponent } from '../components/clients-gallery.component';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ClientsGalleryComponent],
  template: `
    <div *ngIf="(client$ | async) as client; else notFound" class="client-detail">
      <div class="client-detail__header">
        <a routerLink="/clientes" class="back-link">
          ← Volver al listado
        </a>
        <h1 class="client-detail__title">{{ client.name }}</h1>
        <div class="client-detail__meta">
          <p *ngIf="client.eventDate">
            📅 {{ formatDate(client.eventDate) }}
          </p>
          <p *ngIf="client.location">
            📍 {{ client.location }}
          </p>
          <p *ngIf="service === 'grados' && client.institution">
            🏫 {{ client.institution }}
          </p>
          <p *ngIf="service === 'grados' && client.career">
            📚 {{ client.career }}
          </p>
          <p *ngIf="service === 'grados' && client.graduationYear">
            🎓 Graduación {{ client.graduationYear }}
          </p>
        </div>
      </div>

      <div class="client-detail__gallery">
        <app-clients-gallery
          [folder]="client.folder"
          [title]="'Galería de ' + client.name" />
      </div>
    </div>

    <ng-template #notFound>
      <div class="not-found">
        <p>Cliente no encontrado</p>
        <a routerLink="/clientes" class="btn btn-primary">Volver al listado</a>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .client-detail {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
      }

      .client-detail__header {
        margin-bottom: 40px;
      }

      .back-link {
        display: inline-block;
        color: #0097b2;
        text-decoration: none;
        margin-bottom: 16px;
        font-weight: 500;
      }

      .back-link:hover {
        text-decoration: underline;
      }

      .client-detail__title {
        margin: 0 0 16px 0;
        font-size: 36px;
        font-weight: 700;
        color: #333;
      }

      .client-detail__meta {
        font-size: 15px;
        color: #666;
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
      }

      .client-detail__meta p {
        margin: 0;
      }

      .client-detail__gallery {
        margin-top: 40px;
      }

      .not-found {
        text-align: center;
        padding: 60px 20px;
        color: #666;
      }

      .btn {
        display: inline-block;
        padding: 12px 24px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 500;
        margin-top: 16px;
      }

      .btn-primary {
        background: #0097b2;
        color: white;
      }

      .btn-primary:hover {
        background: #006b82;
      }
    `,
  ],
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly clientPublic = inject(ClientPublicService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private seoSub?: Subscription;

  service: any;
  slug: string = '';
  client$: Observable<Client | null> = new Observable();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.service = params['service'];
      this.slug = params['slug'];

      if (this.service && this.slug) {
        this.client$ = this.clientPublic.getBySlug$(this.slug, this.service);

        // SEO dinámico: título + meta description
        this.seoSub = this.client$
          .pipe(filter((c): c is Client => c !== null), take(1))
          .subscribe((client) => {
            const serviceLabel =
              client.service === 'bodas'
                ? 'Bodas'
                : client.service === 'prebodas'
                  ? 'Prebodas'
                : client.service === 'quinces'
                  ? 'Quinceañeras'
                  : 'Graduaciones';

            this.titleService.setTitle(
              `${client.name} | ${serviceLabel} | Tecnojack`
            );

            const description = client.location
              ? `Galería de ${serviceLabel.toLowerCase()} de ${client.name} en ${client.location} — Tecnojack Fotografía`
              : `Galería de ${serviceLabel.toLowerCase()} de ${client.name} — Tecnojack Fotografía`;

            this.metaService.updateTag({
              name: 'description',
              content: description,
            });
            this.metaService.updateTag({
              property: 'og:title',
              content: `${client.name} | ${serviceLabel} | Tecnojack`,
            });
            this.metaService.updateTag({
              property: 'og:description',
              content: description,
            });
            if (client.coverUrl) {
              this.metaService.updateTag({
                property: 'og:image',
                content: client.coverUrl,
              });
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.seoSub?.unsubscribe();
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
