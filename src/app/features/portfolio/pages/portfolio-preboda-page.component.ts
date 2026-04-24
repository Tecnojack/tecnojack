import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { ContactSectionComponent } from '../sections/contact-section.component';
import { PortfolioPackageCategory } from '../portfolio.data';
import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { PortfolioServiceCategoryPageComponent } from './portfolio-service-category-page.component';

@Component({
  selector: 'tj-portfolio-preboda-page',
  standalone: true,
  imports: [PortfolioShellComponent, PortfolioServiceCategoryPageComponent, ContactSectionComponent],
  template: `
    <tj-portfolio-shell [navItems]="navItems" [subtitle]="pageConfig.shellSubtitle" [headerCtaHref]="headerCtaHref" [floatWaHref]="headerCtaHref" [editable]="editable">
      <tj-portfolio-service-category-page [category]="category" [editable]="editable" />
      <tj-contact-section [editable]="editable" />
    </tj-portfolio-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioPrebodaPageComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly category: PortfolioPackageCategory = 'preboda';

  constructor() {
    effect(() => {
      const pageMeta = this.content.getPageMeta(
        'portfolio-preboda',
        'TECNOJACK | Preboda',
        'Sesiones preboda con dirección editorial, narrativa visual y entregables para redes y recuerdo.'
      );
      this.title.setTitle(pageMeta.title);
      this.meta.updateTag({ name: 'description', content: pageMeta.description });
    });
  }

  get navItems() {
    return this.content.navItems();
  }

  get pageConfig() {
    return this.content.getServicePageConfig(this.category)!;
  }

  get headerCtaHref() {
    return this.content.buildWhatsappHref(this.pageConfig.hero.whatsappMessage);
  }

  get editable(): boolean {
    return false;
  }
}
