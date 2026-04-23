import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { PortfolioContactLink } from '../portfolio.data';
import { PortfolioContentService } from '../services/portfolio-content.service';

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

  @Input() editable = false;

  get title(): string {
    return this.content.contactTitle();
  }

  get lead(): string {
    return this.content.contactLead();
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

  readonly icons: Record<PortfolioContactLink['platform'], IconDefinition> = {
    instagram: faInstagram,
    facebook: faFacebookF,
    tiktok: faTiktok,
    whatsapp: faWhatsapp
  };
}
