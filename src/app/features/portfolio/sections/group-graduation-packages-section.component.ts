import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import {
  buildPortfolioPackageHref,
  groupGraduationPackage,
  groupGraduationSuggestedShots
} from '../portfolio.data';

@Component({
  selector: 'tj-group-graduation-packages-section',
  standalone: true,
  imports: [NgFor, RevealOnScrollDirective],
  templateUrl: './group-graduation-packages-section.component.html',
  styleUrl: './group-graduation-packages-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupGraduationPackagesSectionComponent {
  readonly packageInfo = groupGraduationPackage;
  readonly suggestedShots = groupGraduationSuggestedShots;
  readonly detailHref = buildPortfolioPackageHref('grados', groupGraduationPackage.slug);
}
