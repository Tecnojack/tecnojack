import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

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
  readonly i18n = inject(I18nService);

  @Input() editable = false;

  get heroEyebrow() {
    return this.i18n.t('hero.eyebrow', this.content.heroEyebrow());
  }

  get stats() {
    const raw = this.content.heroStats();
    const labelMap: Record<string, string> = {
      'Años de trayectoria': 'stats.years',
      'Bodas & Eventos': 'stats.weddings',
      'Entregas exitosas': 'stats.deliverables',
      'Satisfacción de clientes': 'stats.satisfaction'
    };
    return raw.map(s => ({
      ...s,
      label: labelMap[s.label] ? this.i18n.t(labelMap[s.label], s.label) : s.label
    }));
  }

  get highlights() {
    return this.content.heroHighlights();
  }

  get heroImageUrl(): string {
    return this.content.heroImageUrl() || 'https://firebasestorage.googleapis.com/v0/b/tecnojack-admin.firebasestorage.app/o/servicios%2Fbodas%2Fcover.jpg?alt=media&token=fcb03148-ea72-43b7-8ee1-9fc474ee56f5';
  }

  get whatsappHref() {
    return this.content.buildWhatsappHref(
      'Hola TECNOJACK, quiero cotizar un proyecto audiovisual con ustedes.'
    );
  }

  readonly servicesHref = '#services';
  readonly portfolioHref = '#services';
}
