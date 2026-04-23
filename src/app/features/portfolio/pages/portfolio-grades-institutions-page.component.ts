import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioContentService } from '../services/portfolio-content.service';

type AdditionalCard = {
  name: string;
  priceCop: number;
  description: string;
};

@Component({
  selector: 'tj-portfolio-grades-institutions-page',
  standalone: true,
  imports: [PortfolioShellComponent, NgFor],
  templateUrl: './portfolio-grades-institutions-page.component.html',
  styleUrl: './portfolio-grades-institutions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioGradesInstitutionsPageComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly heroTitle = 'Servicios profesionales para grados institucionales';
  readonly heroLead =
    'Cubrimos ceremonias de grado con un modelo organizado, escalable y enfocado en entregar recuerdos de alta calidad para cada estudiante.';

  readonly heroBackgroundImage = 'assets/images/galery/M&D-5.jpg';

  readonly serviceModelText =
    'Trabajamos bajo un modelo por estudiante que permite a la institución ofrecer un servicio profesional sin complicaciones, manteniendo calidad y organización en todo el proceso.';

  readonly baseInvestmentCop = 60000;
  readonly minStudents = 40;

  readonly includesList: string[] = [
    '10 fotografías digitales por estudiante',
    'Fotografía individual durante la ceremonia',
    'Fotografías con familiares',
    'Fotografía grupal',
    'Captura de momentos espontáneos',
    'Entrega digital organizada por estudiante'
  ];

  readonly institutionalVideo = {
    title: 'Producción audiovisual del evento',
    priceCop: 700000,
    items: [
      'Video resumen completo del evento',
      'Versión horizontal (cinematográfica)',
      'Versión vertical (redes sociales)',
      'Entrega en alta calidad'
    ]
  };

  readonly additionals: AdditionalCard[] = [
    { name: 'Foto digital adicional', priceCop: 5000, description: 'Amplía tu selección de recuerdos' },
    { name: '12 fotos impresas', priceCop: 30000, description: 'Recuerdos físicos listos para conservar' },
    { name: 'Cuadro en madera (60cm)', priceCop: 110000, description: 'Fotografía lista para exhibir' },
    { name: 'Fotobook individual', priceCop: 250000, description: 'Álbum con diseño editorial' },
    { name: 'Video individual personalizado', priceCop: 350000, description: 'Video íntimo del estudiante' }
  ];

  readonly conditions: string[] = [
    'Mínimo 40 estudiantes',
    'Anticipo del 40% para reserva',
    'Entrega de fotos: 1 a 2 semanas',
    'Entrega de video: 2 a 3 semanas',
    'Equipo profesional durante el evento'
  ];

  readonly whatsappMessage =
    'Hola, estoy interesado en el servicio de fotografía de grados para una institución. Me gustaría recibir más información.';

  constructor() {
    effect(() => {
      const pageMeta = this.content.getPageMeta(
        'portfolio-grados-instituciones',
        'TECNOJACK | Grados institucionales',
        'Propuesta comercial para instituciones educativas: fotografía y video para ceremonias de grado.'
      );
      this.title.setTitle(pageMeta.title);
      this.meta.updateTag({ name: 'description', content: pageMeta.description });
    });
  }

  get navItems() {
    return this.content.navItems();
  }

  get headerCtaHref() {
    return this.content.buildWhatsappHref(this.whatsappMessage);
  }

  get ctaHref() {
    return this.content.buildWhatsappHref(this.whatsappMessage);
  }

  formatCop(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  get editable(): boolean {
    return false;
  }
}
