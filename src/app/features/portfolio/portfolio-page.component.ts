import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { ContactSectionComponent } from './sections/contact-section.component';
import { HeroSectionComponent } from './sections/hero-section.component';
import { PortfolioShellComponent } from './portfolio-shell.component';
import { PortfolioContentService } from './services/portfolio-content.service';
import { ServicesSectionComponent } from './sections/services-section.component';

@Component({
  selector: 'tj-portfolio-page',
  standalone: true,
  imports: [
    PortfolioShellComponent,
    HeroSectionComponent,
    ServicesSectionComponent,
    ContactSectionComponent
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioPageComponent {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly content = inject(PortfolioContentService);

  constructor() {
    effect(() => {
      const pageMeta = this.content.getPageMeta(
        'portfolio',
        'TECNOJACK | Fotografía y cine para bodas, eventos y marcas',
        'Landing premium de TECNOJACK para fotografía y cine en bodas, eventos, marcas y experiencias visuales con contacto directo por WhatsApp.'
      );

      this.title.setTitle(pageMeta.title);

      this.meta.updateTag({ name: 'description', content: pageMeta.description });
      this.meta.updateTag({ property: 'og:title', content: pageMeta.title });
      this.meta.updateTag({ property: 'og:description', content: pageMeta.description });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
    });
  }

  get navItems() {
    return this.content.navItems();
  }

  get floatWaHref(): string {
    return this.content.buildWhatsappHref('Hola TECNOJACK, me interesa conocer más sobre sus servicios de fotografía y producción audiovisual.');
  }

  get editable(): boolean {
    return false;
  }
}
