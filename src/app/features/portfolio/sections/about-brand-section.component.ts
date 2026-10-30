import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, effect, inject } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'tj-about-brand-section',
  standalone: true,
  imports: [NgFor, RevealOnScrollDirective],
  templateUrl: './about-brand-section.component.html',
  styleUrl: './about-brand-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutBrandSectionComponent {
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

  get aboutTitle() {
    return this.content.aboutTitle();
  }

  get aboutLead() {
    return this.i18n.t('brand.manifesto_lead', this.content.aboutLead());
  }

  get pillars() {
    return [
      {
        title: this.i18n.t('brand.pillar1.title', 'Composición de autor'),
        description: this.i18n.t('brand.pillar1.desc', 'Cada cuadro es meditado en color, luz, textura y equilibrio para un recuerdo intemporal.')
      },
      {
        title: this.i18n.t('brand.pillar2.title', 'Flujo ágil y seguro'),
        description: this.i18n.t('brand.pillar2.desc', 'Garantía de respaldo digital redundante y entregas organizadas en galerías privadas.')
      },
      {
        title: this.i18n.t('brand.pillar3.title', 'Experiencia personalizada'),
        description: this.i18n.t('brand.pillar3.desc', 'Acompañamiento cercano desde la preproducción hasta la entrega final física y digital.')
      }
    ];
  }
}
