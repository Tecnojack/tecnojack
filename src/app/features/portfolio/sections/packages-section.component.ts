import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import {
  buildPortfolioWhatsappHref,
  portfolioAdditionalServices,
  portfolioPhotoPackages,
  portfolioSuggestedShots,
  portfolioWeddingPlans
} from '../portfolio.data';

@Component({
  selector: 'tj-packages-section',
  standalone: true,
  imports: [NgFor, RevealOnScrollDirective, FallbackImageDirective],
  templateUrl: './packages-section.component.html',
  styleUrl: './packages-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagesSectionComponent {
  readonly packages = portfolioPhotoPackages;
  readonly suggestedShots = portfolioSuggestedShots;
  readonly weddingPlans = portfolioWeddingPlans;
  readonly additionalServices = portfolioAdditionalServices;

  packageHref(name: string): string {
    return buildPortfolioWhatsappHref(`Hola, estoy interesado en el paquete ${name}`);
  }

  weddingPlanHref(name: string): string {
    return buildPortfolioWhatsappHref(`Hola TECNOJACK, quiero información del plan de boda ${name}.`);
  }
}
