import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, effect, inject } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'tj-hero-section',
  standalone: true,
  imports: [NgFor, NgIf, RevealOnScrollDirective, FallbackImageDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly i18n = inject(I18nService);

  @Input() editable = false;

  constructor() {
    effect(() => {
      this.i18n.currentLang();
      this.cdr.markForCheck();
    });
  }

  get heroEyebrow() {
    return this.i18n.t('hero.eyebrow', this.content.heroEyebrow());
  }

  get stats() {
    const raw = this.content.heroStats();
    const labelMap: Record<string, string> = {
      'Experiencia real en eventos': 'stats.experience',
      'Calidad cinematográfica': 'stats.quality',
      'Dirección artística': 'stats.art_direction',
      'Paquetes activos': 'stats.active_packages',
      'Líneas de servicio': 'stats.service_lines',
      'Proyectos realizados': 'stats.completed_projects',
      'Años de trayectoria': 'stats.years',
      'Bodas & Eventos': 'stats.weddings',
      'Entregas exitosas': 'stats.deliverables',
      'Satisfacción de clientes': 'stats.satisfaction'
    };
    return raw.map(s => {
      let val = s.value;
      if (this.i18n.currentLang() === 'en') {
        val = val.replace('años', 'years');
      }
      return {
        value: val,
        label: labelMap[s.label] ? this.i18n.t(labelMap[s.label], s.label) : s.label
      };
    });
  }

  get highlights() {
    return this.content.heroHighlights();
  }

  get heroImageUrl(): string {
    return this.content.heroImageUrl() || 'https://firebasestorage.googleapis.com/v0/b/tecnojack-admin.firebasestorage.app/o/servicios%2Fbodas%2Fcover.jpg?alt=media&token=fcb03148-ea72-43b7-8ee1-9fc474ee56f5';
  }

  get whatsappHref() {
    const msg = this.i18n.isEn()
      ? 'Hello TECNOJACK, I would like to request a quote for an audiovisual project with you.'
      : 'Hola TECNOJACK, quiero cotizar un proyecto audiovisual con ustedes.';
    return this.content.buildWhatsappHref(msg);
  }

  readonly servicesHref = '#services';
  readonly portfolioHref = '#services';
}
