import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import {
  buildPortfolioPackageHref,
  buildPortfolioWhatsappHref,
  weddingMainPlans,
  weddingPackageNotes,
  weddingPackagesTitle,
  weddingPhotoOnlyPlans,
  weddingPhotoOnlySectionTitle
} from '../portfolio.data';

@Component({
  selector: 'tj-wedding-packages-section',
  standalone: true,
  imports: [NgFor, NgIf, RevealOnScrollDirective],
  templateUrl: './wedding-packages-section.component.html',
  styleUrl: './wedding-packages-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeddingPackagesSectionComponent {
  readonly title = weddingPackagesTitle;
  readonly mainPlans = this.centerFeaturedPlan(weddingMainPlans);
  readonly photoOnlyTitle = weddingPhotoOnlySectionTitle;
  readonly photoOnlyPlans = this.centerFeaturedPlan(weddingPhotoOnlyPlans);
  readonly notes = weddingPackageNotes;

  planDetailHref(slug: string): string {
    return buildPortfolioPackageHref('bodas', slug);
  }

  planWhatsappHref(planName: string): string {
    return buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${planName}.`);
  }

  private centerFeaturedPlan<T extends { featured?: boolean }>(plans: T[]): T[] {
    if (plans.length !== 3) {
      return [...plans];
    }

    const featured = plans.find((plan) => plan.featured);

    if (!featured) {
      return [...plans];
    }

    const others = plans.filter((plan) => !plan.featured);
    return [others[0], featured, others[1]];
  }
}
