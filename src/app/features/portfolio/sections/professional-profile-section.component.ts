import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'tj-professional-profile-section',
  standalone: true,
  imports: [NgFor, NgIf, RevealOnScrollDirective],
  templateUrl: './professional-profile-section.component.html',
  styleUrl: './professional-profile-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalProfileSectionComponent {
  private readonly content = inject(PortfolioContentService);
  readonly i18n = inject(I18nService);

  @Input() editable = false;

  get profile() {
    return {
      eyebrow: this.i18n.t('profile.eyebrow', 'PERFIL PROFESIONAL'),
      title: this.i18n.t('profile.title', 'Más que fotografía, una visión completa'),
      role: this.i18n.t('profile.role', 'Jackson Palacios · Fundador & Director Visual'),
      lead: this.i18n.t('profile.lead', 'Ingeniero de sistemas y productor audiovisual. Combino tecnología, creatividad y narrativa visual para ofrecer experiencias modernas, interactivas y visualmente impactantes.'),
      quote: this.i18n.t('profile.quote', '“La tecnología nos entrega las herramientas de precisión; la mirada humana y la sensibilidad nos entregan el alma de cada historia.”'),
      supportingLabel: this.i18n.t('profile.supportingLabel', 'TAMBIÉN DESARROLLO:'),
      points: [
        this.i18n.t('profile.p1', 'Invitaciones digitales personalizadas'),
        this.i18n.t('profile.p2', 'Experiencias web para bodas y eventos'),
        this.i18n.t('profile.p3', 'Plataformas visuales interactivas')
      ],
      ctaLabel: this.i18n.t('profile.cta', 'Ver ejemplos'),
      ctaHref: '#work'
    };
  }
}
