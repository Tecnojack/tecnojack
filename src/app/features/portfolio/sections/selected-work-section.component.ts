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
      image: 'https://firebasestorage.googleapis.com/v0/b/tecnojack-admin.firebasestorage.app/o/servicios%2Fprebodas%2Fclientes%2Fmaria-and-santi%2F1776978643872-97z4h6x10y5.jpg?alt=media&token=511394c8-3561-4770-bcff-3e4b3e86c0e5',
      href: '/portfolio/sesiones',
      layout: 'half',
    },
    {
      id: 'quinces-editorial',
      category: 'QUINCEAÑERAS DE ALTO NIVEL',
      title: 'Celebraciones Contemporáneas',
      subtitle: 'Elegancia, frescura y registro documental de vanguardia',
      image: 'https://firebasestorage.googleapis.com/v0/b/tecnojack-admin.firebasestorage.app/o/servicios%2Fquinces%2Fcover.jpg?alt=media&token=48daaaee-fa21-4a57-8cfb-665a3c9e6bb0',
      href: '/portfolio/quinces',
      layout: 'half',
    },
    {
      id: 'video-master',
      category: 'PRODUCCIÓN AUDIOVISUAL',
      title: 'The Master Cut — Cine 4K',
      subtitle: 'Color grading cinematográfico y sonido inmersivo para bodas y marcas',
      image: 'https://firebasestorage.googleapis.com/v0/b/tecnojack-admin.firebasestorage.app/o/servicios%2Fvideo%2Fcover.jpg?alt=media&token=3aa1a661-c837-4a9e-9636-60f2954b93f7',
      href: '/portfolio/videos',
      layout: 'wide',
    },
  ];
}
