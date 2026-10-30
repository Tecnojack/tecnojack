import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSectionComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly i18n = inject(I18nService);

  @Input() editable = false;

  readonly activeIndex = signal(0);

  constructor() {
    effect(() => {
      this.i18n.currentLang();
      this.cdr.markForCheck();
    });
  }

  get services() {
    const raw = this.content.services();
    return raw.map((s) => ({
      ...s,
      title: this.i18n.t(`services.${s.id}.title`, s.title),
      description: this.i18n.t(`services.${s.id}.desc`, s.description),
      points: (s.points || []).map((p) => this.i18n.t('point.' + p, p)),
      ctaLabel: this.i18n.t('services.explore', s.ctaLabel)
    }));
  }

  readonly activeService = computed(() => {
    const list = this.services;
    const idx = this.activeIndex();
    return list[idx] ?? list[0];
  });

  setActive(index: number): void {
    this.activeIndex.set(index);
  }

  isInternalLink(href: string): boolean {
    return href.startsWith('/') && !href.includes('#');
  }
}
