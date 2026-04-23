import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { PortfolioPackageDetail } from '../portfolio.data';

export type PortfolioPackageCardViewModel = {
  detail: PortfolioPackageDetail;
  displayName: string;
  tagline: string;
  displayPrice: string;
  displayTypeLabel: string;
  highlights: string[];
};

@Component({
  selector: 'tj-portfolio-category-accordion',
  standalone: true,
  imports: [NgIf, NgFor, RevealOnScrollDirective, FallbackImageDirective],
  templateUrl: './portfolio-category-accordion.component.html',
  styleUrl: './portfolio-category-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden'
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden'
        })
      ),
      transition('collapsed <=> expanded', [animate('220ms ease-in-out')])
    ])
  ]
})
export class PortfolioCategoryAccordionComponent {
  @Input({ required: true }) title = '';
  @Input() lead = '';
  @Input() packages: PortfolioPackageCardViewModel[] = [];
  @Input() initiallyOpen = false;

  @Output() openPackage = new EventEmitter<string>();

  private readonly openState = signal(false);

  ngOnInit(): void {
    this.openState.set(this.initiallyOpen);
  }

  isOpen(): boolean {
    return this.openState();
  }

  toggle(): void {
    this.openState.update((value) => !value);
  }

  requestOpenPackage(slug: string): void {
    this.openPackage.emit(slug);
  }
}
