import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { I18nService } from '../../../core/services/i18n.service';

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
  readonly i18n = inject(I18nService);

  get campaigns(): SelectedCampaign[] {
    return [
      {
        id: 'bodas-editorial',
        category: this.i18n.t('work.c1.cat', 'CINE DE BODAS & NARRATIVA'),
        title: this.i18n.t('work.c1.title', 'Historias de Amor de Autor'),
        subtitle: this.i18n.t('work.c1.sub', 'Dirección cinematográfica en locaciones exclusivas de Colombia'),
        image: 'https://firebasestorage.googleapis.com/v0/b/tecnojack-admin.firebasestorage.app/o/servicios%2Fbodas%2Fcover.jpg?alt=media&token=fcb03148-ea72-43b7-8ee1-9fc474ee56f5',
        href: '/portfolio/bodas',
        layout: 'full',
      },
      {
        id: 'sesiones-autor',
        category: this.i18n.t('work.c2.cat', 'RETRATO & SESIONES'),
        title: this.i18n.t('work.c2.title', 'Sesiones de Autor'),
        subtitle: this.i18n.t('work.c2.sub', 'Estudio profesional y exteriores con dirección estética personalizada'),
        image: 'https://firebasestorage.googleapis.com/v0/b/tecnojack-admin.firebasestorage.app/o/servicios%2Fprebodas%2Fclientes%2Fsara-and-jefferson%2F1776978687799-8jgb5z17iom.jpg?alt=media&token=36dbbf2f-0b44-4fe1-bb38-4e15034c44a9',
        href: '/portfolio/sesiones',
        layout: 'half',
      },
      {
        id: 'quinces-editorial',
        category: this.i18n.t('work.c3.cat', 'QUINCEAÑERAS DE ALTO NIVEL'),
        title: this.i18n.t('work.c3.title', 'Celebraciones Contemporáneas'),
        subtitle: this.i18n.t('work.c3.sub', 'Elegancia, frescura y registro documental de vanguardia'),
        image: 'https://firebasestorage.googleapis.com/v0/b/tecnojack-admin.firebasestorage.app/o/servicios%2Fquinces%2Fcover.jpg?alt=media&token=21bbd277-7f47-4bae-bee8-e5e916ef7b94',
        href: '/portfolio/quinces',
        layout: 'half',
      },
      {
        id: 'video-master',
        category: this.i18n.t('work.c4.cat', 'PRODUCCIÓN AUDIOVISUAL'),
        title: this.i18n.t('work.c4.title', 'The Master Cut — Cine 4K'),
        subtitle: this.i18n.t('work.c4.sub', 'Color grading cinematográfico y sonido inmersivo para bodas y marcas'),
        image: 'https://firebasestorage.googleapis.com/v0/b/tecnojack-admin.firebasestorage.app/o/servicios%2Fvideo%2Fcover.jpg?alt=media&token=3aa1a661-c837-4a9e-9636-60f2954b93f7',
        href: '/portfolio/videos',
        layout: 'wide',
      },
    ];
  }
}
