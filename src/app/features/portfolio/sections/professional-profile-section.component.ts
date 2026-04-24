import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { PortfolioContentService } from '../services/portfolio-content.service';

@Component({
  selector: 'tj-professional-profile-section',
  standalone: true,
  imports: [NgFor, RevealOnScrollDirective],
  templateUrl: './professional-profile-section.component.html',
  styleUrl: './professional-profile-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalProfileSectionComponent {
  private readonly content = inject(PortfolioContentService);

  @Input() editable = false;

  get profile() {
    return this.content.professionalProfile();
  }
}
