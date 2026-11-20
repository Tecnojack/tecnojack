import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { I18nService } from '../../../core/services/i18n.service';

export type FlagshipExperience = {
  num: string;
  category: string;
  title: string;
  priceLead: string;
  description: string;
  highlights: string[];
  image: string;
  href: string;
};

@Component({
  selector: 'tj-featured-experiences-section',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RevealOnScrollDirective],
  templateUrl: './featured-experiences-section.component.html',
  styleUrl: './featured-experiences-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedExperiencesSectionComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly i18n = inject(I18nService);

  readonly activeIdx = signal(0);

  constructor() {
    effect(() => {
      this.i18n.currentLang();
      this.cdr.markForCheck();
    });
  }

  get experiences(): FlagshipExperience[] {
    return [
      {
        num: '01',
        category: this.i18n.t('exp.1.cat', 'BODAS'),
        title: this.i18n.t('exp.1.title', 'Boda Híbrida — Foto & Cine Nupcial'),
        priceLead: this.i18n.t('exp.1.lead', 'Desde $1\'900.000 COP'),
        description: this.i18n.t('exp.1.desc', 'Nuestra experiencia más completa. Cobertura simultánea de fotografía de autor y cinematografía documental con equipo dedicado.'),
        highlights: [
          this.i18n.t('exp.1.h1', 'Fotógrafo principal + Videógrafo cinematográfico'),
          this.i18n.t('exp.1.h2', 'Hasta 450 fotos editadas en alta resolución'),
          this.i18n.t('exp.1.h3', 'Película documental + Highlight Film + Reels verticales'),
          this.i18n.t('exp.1.h4', 'Dron aéreo y galería online privada'),
        ],
        image: 'assets/images/site/bodas-hibridas-luxury-cover-1080.webp',
        href: '/portfolio/bodas',
      },
      {
        num: '02',
        category: this.i18n.t('exp.2.cat', 'QUINCEAÑERAS'),
        title: this.i18n.t('exp.2.title', '15 Años — Celebración Contemporánea'),
        priceLead: this.i18n.t('exp.2.lead', 'Planes a la medida'),
        description: this.i18n.t('exp.2.desc', 'Dirección visual de vanguardia para quinceañeras. Sesión previa de gala, cobertura completa de la fiesta y entrega para redes.'),
        highlights: [
          this.i18n.t('exp.2.h1', 'Sesión previa en estudio o exteriores'),
          this.i18n.t('exp.2.h2', 'Cobertura de recepción, protocolo y fiesta'),
          this.i18n.t('exp.2.h3', 'Video resumen en 4K y reels para Instagram/TikTok'),
          this.i18n.t('exp.2.h4', 'Álbum fotográfico de alta gama'),
        ],
        image: 'assets/images/site/quinces-fotografia-de-quince-premium-cover-1080.webp',
        href: '/portfolio/quinces',
      },
      {
        num: '03',
        category: this.i18n.t('exp.3.cat', 'GRADOS'),
        title: this.i18n.t('exp.3.title', 'Grados — Fotografía de Promoción & Familia'),
        priceLead: this.i18n.t('exp.3.lead', 'Planes Estudiantes & Grupos'),
        description: this.i18n.t('exp.3.desc', 'Cobertura profesional y solemne de ceremonias de graduación, fotografía de llamado individual con toga y birrete, retratos de estudio y fotos familiares de alta calidad.'),
        highlights: [
          this.i18n.t('exp.3.h1', 'Llamado individual en tarima con toga y birrete'),
          this.i18n.t('exp.3.h2', 'Retratos familiares y con compañeros de promoción'),
          this.i18n.t('exp.3.h3', 'Mosaicos, carpetas de lujo y retablos en madera'),
          this.i18n.t('exp.3.h4', 'Entrega digital en alta resolución y galería privada'),
        ],
        image: 'assets/images/site/grados-estudiantes-plan-legado-cover-1080.webp',
        href: '/portfolio/grados',
      },
      {
        num: '04',
        category: this.i18n.t('exp.4.cat', 'AUDIOVISUAL'),
        title: this.i18n.t('exp.4.title', 'Corporativo, Comerciales & Marca'),
        priceLead: this.i18n.t('exp.4.lead', 'Cotización personalizada'),
        description: this.i18n.t('exp.4.desc', 'Piezas audiovisuales con ritmo comercial y narrativa estratégica para marcas, empresas y figuras públicas.'),
        highlights: [
          this.i18n.t('exp.4.h1', 'Video institucional y registro de eventos'),
          this.i18n.t('exp.4.h2', 'Contenido audiovisual para campañas publicitarias'),
          this.i18n.t('exp.4.h3', 'Fotografía de producto y retratos corporativos'),
          this.i18n.t('exp.4.h4', 'Entrega en formatos multicanal (16:9, 9:16, 1:1)'),
        ],
        image: 'assets/images/site/video-cover-1080.webp',
        href: '/portfolio/corporativos',
      },
    ];
  }

  selectExperience(index: number): void {
    this.activeIdx.set(index);
  }

  get activeExperience(): FlagshipExperience {
    const list = this.experiences;
    return list[this.activeIdx()] ?? list[0];
  }
}
