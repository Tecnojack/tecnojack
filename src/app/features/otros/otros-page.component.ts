import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { RevealOnScrollDirective } from '../../shared/animations/reveal-on-scroll.directive';
import { PortfolioShellComponent } from '../portfolio/portfolio-shell.component';
import { PortfolioContentService } from '../portfolio/services/portfolio-content.service';
import { SimpleServiceCardComponent } from './components/simple-service-card.component';
import { SimpleServiceModalComponent } from './components/simple-service-modal.component';
import { SIMPLE_SERVICES_MOCK } from './data/simple-services.mock';
import {
  SERVICE_CATEGORIES,
  SERVICE_CATEGORY_LABELS,
  ServiceCategory,
  SimpleService
} from './models/simple-service.model';

const PHONE = '573145406467';

@Component({
  selector: 'tj-otros-page',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    PortfolioShellComponent,
    SimpleServiceCardComponent,
    SimpleServiceModalComponent,
    RevealOnScrollDirective
  ],
  templateUrl: './otros-page.component.html',
  styleUrl: './otros-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtrosPageComponent implements OnInit {
  private readonly content = inject(PortfolioContentService);
  private readonly titleSvc = inject(Title);
  private readonly metaSvc = inject(Meta);

  readonly selectedService = signal<SimpleService | null>(null);

  readonly allServices = SIMPLE_SERVICES_MOCK;
  readonly categories = SERVICE_CATEGORIES;
  readonly categoryLabels = SERVICE_CATEGORY_LABELS;
  readonly heroBackgroundImage = 'assets/images/galery/M&D-23.jpg';
  readonly heroScrollTarget = '#cat-fotografia';
  readonly heroFacts = [
    { label: 'Servicios', value: `${this.allServices.length} opciones` },
    { label: 'Categorías', value: `${this.categories.length} líneas` },
    { label: 'Desde', value: '$150.000 COP' },
    { label: 'Cobertura', value: 'Personas y marcas' }
  ];
  readonly heroHighlights = [
    'Sesiones rápidas y personalizadas',
    'Foto, video y reels en un solo lugar',
    'Cotización directa por WhatsApp',
    'Opciones para perfil, negocio o evento'
  ];

  readonly heroWhatsappHref = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    'Hola Jackson, tengo un proyecto que quiero cotizar y no sé bien cuál es el servicio que necesito.'
  )}`;

  get navItems() {
    return this.content.navItems();
  }

  get headerCtaHref() {
    return this.content.buildWhatsappHref('Hola TECNOJACK, me interesa cotizar un servicio adicional.');
  }

  ngOnInit(): void {
    this.titleSvc.setTitle('Servicios · TECNOJACK');
    this.metaSvc.updateTag({
      name: 'description',
      content:
        'Fotografía, video, reels, contenido para redes y más. Servicios audiovisuales flexibles para personas, emprendedores y marcas. TECNOJACK · Antioquia.'
    });
  }

  getByCategory(cat: ServiceCategory): SimpleService[] {
    return this.allServices.filter((s) => s.category === cat);
  }

  openService(service: SimpleService): void {
    this.selectedService.set(service);
    document.body.style.overflow = 'hidden';
  }

  closeService(): void {
    this.selectedService.set(null);
    document.body.style.overflow = '';
  }

  trackByCategory(_: number, cat: ServiceCategory): ServiceCategory {
    return cat;
  }

  trackByServiceId(_: number, service: SimpleService): string {
    return service.id;
  }
}
