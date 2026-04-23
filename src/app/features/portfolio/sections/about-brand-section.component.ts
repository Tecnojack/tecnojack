import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { PortfolioContentService } from '../services/portfolio-content.service';

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

  @Input() editable = false;

  get aboutTitle() {
    return this.content.aboutTitle();
  }

  get aboutLead() {
    return this.content.aboutLead();
  }

  get pillars() {
    return this.content.brandPillars();
  }
}
