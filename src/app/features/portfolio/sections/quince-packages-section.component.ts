import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import {
  buildPortfolioPackageHref,
  buildPortfolioWhatsappHref,
  quinceAdditionalItems,
  quinceMainPlans,
  quincePackageNotes,
  quincePackagesTitle
} from '../portfolio.data';

@Component({
  selector: 'tj-quince-packages-section',
  standalone: true,
  imports: [NgFor, NgIf, RevealOnScrollDirective],
  templateUrl: './quince-packages-section.component.html',
  styleUrl: './quince-packages-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuincePackagesSectionComponent {
  readonly title = quincePackagesTitle;
  readonly plans = this.centerFeaturedPlan(quinceMainPlans);
  readonly additionals = quinceAdditionalItems;
  readonly notes = quincePackageNotes;

  planDetailHref(slug: string): string {
    return buildPortfolioPackageHref('quinces', slug);
  }

  planWhatsappHref(planName: string): string {
    return buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${planName} de quinceañeros.`);
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
