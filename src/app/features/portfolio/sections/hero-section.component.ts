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
    return this.content.heroStats();
  }

  get highlights() {
    return this.content.heroHighlights();
  }

  get heroImageUrl(): string {
    return this.content.heroImageUrl() || 'assets/images/galery/M&D-23.jpg';
  }

  get whatsappHref() {
    return this.content.buildWhatsappHref(
      'Hola TECNOJACK, quiero cotizar un proyecto audiovisual con ustedes.'
    );
  }

  readonly servicesHref = '#services';
  readonly portfolioHref = '#services';
}
