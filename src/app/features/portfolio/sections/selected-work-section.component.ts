import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';

export type SelectedCampaign = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  layout: 'full' | 'half' | 'wide';
};

@Component({
  selector: 'tj-selected-work-section',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RevealOnScrollDirective],
  templateUrl: './selected-work-section.component.html',
  styleUrl: './selected-work-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedWorkSectionComponent {
  readonly campaigns: SelectedCampaign[] = [
    {
      id: 'bodas-editorial',
      category: 'CINE DE BODAS & NARRATIVA',
      title: 'Historias de Amor de Autor',
      subtitle: 'Dirección cinematográfica en locaciones exclusivas de Colombia',
      image: 'assets/images/fotos/default-cover.png',
      href: '/portfolio/bodas',
      layout: 'full',
    },
    {
      id: 'sesiones-autor',
      category: 'RETRATO & SESIONES',
      title: 'Sesiones de Autor',
      subtitle: 'Estudio profesional y exteriores con dirección estética personalizada',
      image: 'assets/images/galery/M&D-22.jpg',
      href: '/portfolio/sesiones',
      layout: 'half',
    },
    {
      id: 'quinces-editorial',
      category: 'QUINCEAÑERAS DE ALTO NIVEL',
      title: 'Celebraciones Contemporáneas',
      subtitle: 'Elegancia, frescura y registro documental de vanguardia',
      image: 'assets/images/galery/M&D-15.jpg',
      href: '/portfolio/quinces',
      layout: 'half',
    },
    {
      id: 'video-master',
      category: 'PRODUCCIÓN AUDIOVISUAL',
      title: 'The Master Cut — Cine 4K',
      subtitle: 'Color grading cinematográfico y sonido inmersivo para bodas y marcas',
      image: 'assets/images/galery/M&D-29.jpg',
      href: '/portfolio/videos',
      layout: 'wide',
    },
  ];
}
