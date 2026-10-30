import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, effect, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faTiktok, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { PortfolioContactLink } from '../portfolio.data';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'tj-contact-section',
  standalone: true,
  imports: [NgFor, FontAwesomeModule, RevealOnScrollDirective],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSectionComponent {
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

  get title(): string {
    return this.i18n.t('contact.title', this.content.contactTitle());
  }

  get lead(): string {
    return this.i18n.t('contact.lead', this.content.contactLead());
  }

  get body(): string {
    return this.content.contactBody();
  }

  get links(): PortfolioContactLink[] {
    return this.content.contactLinks();
  }

  get whatsappHref(): string {
    return this.content.whatsappHref();
  }

  getSocialLinks(): PortfolioContactLink[] {
    return this.links.filter(link => link.platform !== 'whatsapp');
  }

  readonly icons: Record<PortfolioContactLink['platform'], IconDefinition> = {
    instagram: faInstagram,
    youtube: faYoutube,
    facebook: faFacebookF,
    tiktok: faTiktok,
    whatsapp: faWhatsapp,
  };
}
