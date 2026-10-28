import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'tj-services-section',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RevealOnScrollDirective],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesSectionComponent {
  private readonly content = inject(PortfolioContentService);
  readonly i18n = inject(I18nService);

  @Input() editable = false;

  get services() {
    return this.content.services();
  }

  isInternalLink(href: string): boolean {
    return href.startsWith('/') && !href.includes('#');
  }
}
