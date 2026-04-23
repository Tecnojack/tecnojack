import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { PortfolioContentService } from '../services/portfolio-content.service';

@Component({
  selector: 'tj-hero-section',
  standalone: true,
  imports: [NgFor, RevealOnScrollDirective, FallbackImageDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
  private readonly content = inject(PortfolioContentService);

  @Input() editable = false;

  get heroEyebrow() {
    return this.content.heroEyebrow();
  }

  get heroTitle() {
    return this.content.heroTitle();
  }

  get heroLead() {
    return this.content.heroLead();
  }

  get heroImageUrl() {
    return this.content.heroImageUrl();
  }

  get stats() {
    return this.content.heroStats();
  }

  get highlights() {
    return this.content.heroHighlights();
  }

  get whatsappHref() {
    return this.content.whatsappHref();
  }

  readonly servicesHref = '#services';
  readonly portfolioHref = '#gallery';
}
