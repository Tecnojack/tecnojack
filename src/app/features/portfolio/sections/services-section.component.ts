import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { PortfolioContentService } from '../services/portfolio-content.service';

@Component({
  selector: 'tj-services-section',
  standalone: true,
  imports: [NgFor, NgIf, RevealOnScrollDirective],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesSectionComponent {
  private readonly content = inject(PortfolioContentService);

  @Input() editable = false;

  get services() {
    return this.content.services();
  }

  get heading() {
    return this.content.servicesSectionHeading();
  }
}
