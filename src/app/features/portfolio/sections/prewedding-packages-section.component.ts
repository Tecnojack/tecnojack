import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { buildPortfolioPackageHref, buildPortfolioWhatsappHref, preweddingPackagesTitle, preweddingPlans } from '../portfolio.data';

@Component({
  selector: 'tj-prewedding-packages-section',
  standalone: true,
  imports: [NgFor, NgIf, RevealOnScrollDirective],
  templateUrl: './prewedding-packages-section.component.html',
  styleUrl: './prewedding-packages-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreweddingPackagesSectionComponent {
  readonly title = preweddingPackagesTitle;
  readonly plans = preweddingPlans;

  planDetailHref(slug: string): string {
    return buildPortfolioPackageHref('preboda', slug);
  }

  planWhatsappHref(planName: string): string {
    return buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información sobre ${planName} de preboda.`);
  }
}
