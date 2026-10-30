import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { PortfolioContentService } from '../services/portfolio-content.service';

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

  readonly activeIdx = signal(0);

  readonly experiences: FlagshipExperience[] = [
    {
      num: '01',
      category: 'BODAS',
      title: 'Boda Híbrida — Foto & Cine Nupcial',
      priceLead: 'Desde $1\'900.000 COP',
      description: 'Nuestra experiencia más completa. Cobertura simultánea de fotografía de autor y cinematografía documental con equipo dedicado.',
      highlights: [
        'Fotógrafo principal + Videógrafo cinematográfico',
        'Hasta 450 fotos editadas en alta resolución',
        'Película documental + Highlight Film + Reels verticales',
        'Dron aéreo y galería online privada',
      ],
      image: 'assets/images/fotos/default-cover.png',
      href: '/portfolio/bodas',
    },
    {
      num: '02',
      category: 'QUINCEAÑERAS',
      title: '15 Años — Celebración Contemporánea',
      priceLead: 'Planes a la medida',
      description: 'Dirección visual de vanguardia para quinceañeras. Sesión previa de gala, cobertura completa de la fiesta y entrega para redes.',
      highlights: [
        'Sesión previa en estudio o exteriores',
        'Cobertura de recepción, protocolo y fiesta',
        'Video resumen en 4K y reels para Instagram/TikTok',
        'Álbum fotográfico de alta gama',
      ],
      image: 'https://firebasestorage.googleapis.com/v0/b/tecnojack-admin.firebasestorage.app/o/servicios%2Fquinces%2Fcover.jpg?alt=media&token=48daaaee-fa21-4a57-8cfb-665a3c9e6bb0',
      href: '/portfolio/quinces',
    },
    {
      num: '03',
      category: 'SESIONES DE AUTOR',
      title: 'Sesiones de Retrato, Familia & Estudio',
      priceLead: 'Desde $250.000 COP',
      description: '13 paquetes especializados: familiares, individuales, revelación de género, recitales y sesión exclusiva en estudio profesional de 2 horas ($400.000 COP).',
      highlights: [
        'Estudio profesional con iluminación de cine (2 horas)',
        'Sesiones familiares en exteriores con book o cuadro retablo',
        'Sesiones especiales: Revelación de género, Conciertos, Grado',
        'Edición profesional y entrega digital inmediata',
      ],
      image: 'https://images.pexels.com/photos/18102854/pexels-photo-18102854.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop',
      href: '/portfolio/sesiones',
    },
    {
      num: '04',
      category: 'PRODUCCIÓN AUDIOVISUAL',
      title: 'Corporativo, Comerciales & Marca',
      priceLead: 'Cotización personalizada',
      description: 'Piezas audiovisuales con ritmo comercial y narrativa estratégica para marcas, empresas y figuras públicas.',
      highlights: [
        'Video institucional y registro de eventos',
        'Contenido audiovisual para campañas publicitarias',
        'Fotografía de producto y retratos corporativos',
        'Entrega en formatos multicanal (16:9, 9:16, 1:1)',
      ],
      image: 'https://firebasestorage.googleapis.com/v0/b/tecnojack-admin.firebasestorage.app/o/servicios%2Fvideo%2Fcover.jpg?alt=media&token=3aa1a661-c837-4a9e-9636-60f2954b93f7',
      href: '/portfolio/corporativos',
    },
  ];

  selectExperience(index: number): void {
    this.activeIdx.set(index);
  }

  get activeExperience(): FlagshipExperience {
    return this.experiences[this.activeIdx()] ?? this.experiences[0];
  }
}
