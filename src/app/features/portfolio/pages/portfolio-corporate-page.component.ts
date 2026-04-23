import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { ContactSectionComponent } from '../sections/contact-section.component';
import { PortfolioPackageCategory } from '../portfolio.data';
import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { PortfolioServiceCategoryPageComponent } from './portfolio-service-category-page.component';

@Component({
  selector: 'tj-portfolio-corporate-page',
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
export class PortfolioCorporatePageComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly category: PortfolioPackageCategory = 'corporativos';

  constructor() {
    effect(() => {
      const pageMeta = this.content.getPageMeta(
        'portfolio-corporativos',
        'TECNOJACK | Corporativos',
        'Producción corporativa con foto, video y contenido para redes: marcas, equipos y eventos.'
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
