import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { RevealOnScrollDirective } from '../../shared/animations/reveal-on-scroll.directive';
import { PortfolioShellComponent } from '../portfolio/portfolio-shell.component';
import { PortfolioContentService } from '../portfolio/services/portfolio-content.service';

interface PackageOption {
  id: 'digital' | 'clasico' | 'premium';
  name: string;
  badge?: string;
  totalPricePerStudent: number;
  description: string;
  highlights: string[];
  includesAlbum: boolean;
  albumType?: string;
  includesRetablo: boolean;
  breakdown: { concept: string; value: number }[];
  isPopular?: boolean;
}

interface AdditionalProduct {
  id: string;
  name: string;
  price?: number;
  priceText?: string;
  description: string;
  features: string[];
}

@Component({
  selector: 'tj-graduation-quote-page',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, PortfolioShellComponent, RevealOnScrollDirective],
  templateUrl: './graduation-quote-page.component.html',
  styleUrl: './graduation-quote-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraduationQuotePageComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly phone = '573145406467';

  get navItems() {
    return this.content.navItems();
  }

  constructor() {
    this.title.setTitle('Propuesta Fotografía de Grado | Sora, Boyacá — TECNOJACK');
    this.meta.updateTag({
      name: 'description',
      content: 'Propuesta oficial de fotografía profesional de grado para 38 estudiantes en Sora, Boyacá. Paquetes digital, clásico y premium por TECNOJACK.',
    });
  }

  readonly selectedPackage = signal<'digital' | 'clasico' | 'premium'>('clasico');
  readonly allSamePackage = signal<boolean>(true);

  readonly eventInfo = {
    location: 'Sora, Boyacá',
    date: '4 de diciembre',
    studentsCount: 38,
    team: '2 Fotógrafos Profesionales',
    ceremonySchedule: '9:00 a. m. a 2:00 p. m.',
    sessionsSchedule: '2:00 p. m. a 6:00 p. m. (Parque principal de Sora)',
    maxPhotosPerStudent: 10,
    deliveryTime: 'Máximo 30 días calendario',
    reservationDeposit: '40% para reservar / 40% una semana antes o el día del evento / 20% al entregar los digitales',
    basePhotoServicePrice: 110000,
  };

  readonly photoTypes = [
    { title: 'Retratos individuales', desc: 'Retrato formal con toga, birrete y fondo cuidado' },
    { title: 'Fotografías familiares', desc: 'Recuerdo con padres y seres queridos' },
    { title: 'Entrega del diploma', desc: 'El momento exacto en el escenario' },
    { title: 'Momentos espontáneos', desc: 'Risas, abrazos y emoción durante la ceremonia' },
    { title: 'Fotografías con amigos', desc: 'Grupos pequeños y compañeros inolvidables' },
    { title: 'Fotografía del grupo completo', desc: 'La gran foto oficial de la promoción' },
  ];

  readonly packages: PackageOption[] = [
    {
      id: 'digital',
      name: 'Paquete 1 — Digital',
      totalPricePerStudent: 110000,
      description: 'Cobertura fotográfica completa de la jornada en formato digital de alta resolución.',
      highlights: [
        'Dos fotógrafos en cobertura continua',
        'Cobertura de la ceremonia (9 am - 2 pm)',
        'Sesión fotográfica en el parque principal (2 pm - 6 pm)',
        'Máximo 10 fotografías finales por estudiante',
        'Retratos individuales, familiares, diploma, espontáneas, amigos y grupo completo',
        'Edición profesional de color, iluminación y encuadre',
        'Archivos JPG en alta resolución en galería digital organizada',
        'Entrega digital en máximo 30 días calendario',
      ],
      includesAlbum: false,
      includesRetablo: false,
      breakdown: [
        { concept: 'Servicio fotográfico base', value: 110000 },
      ],
    },
    {
      id: 'clasico',
      name: 'Paquete 2 — Clásico',
      badge: 'Opción Popular',
      totalPricePerStudent: 260000,
      isPopular: true,
      description: 'Suma el servicio fotográfico base de $110.000 + el Álbum profesional estándar de $150.000 en pasta dura (20x20 cm cerrado / 20x40 cm abierto, 5 hojas, portada prediseñada sin foto).',
      highlights: [
        'Todo lo contemplado en el Paquete Digital (Servicio base $110.000)',
        'Álbum profesional estándar ($150.000): 20x20 cm cerrado / 20x40 cm abierto',
        '5 hojas de alta calidad en pasta dura con portada prediseñada (sin fotografía en portada)',
        'Personalización con el nombre grabado del estudiante',
        'Diagramación individual con las mismas 10 fotografías finales',
        'Presentación amplia: fotos a página completa, composiciones o doble página',
      ],
      includesAlbum: true,
      albumType: 'Álbum profesional estándar (20x20 cm cerrado / 20x40 cm abierto, 5 hojas)',
      includesRetablo: false,
      breakdown: [
        { concept: 'Servicio fotográfico base', value: 110000 },
        { concept: 'Álbum profesional estándar (5 hojas, portada prediseñada)', value: 150000 },
      ],
    },
    {
      id: 'premium',
      name: 'Paquete 3 — Premium',
      badge: 'Más Completo',
      totalPricePerStudent: 380000,
      description: 'Suma el servicio fotográfico base de $110.000 + Álbum premium de $210.000 (20x25 cm cerrado / 20x50 cm abierto, 7 hojas con foto personalizada en portada) + Retablo individual de 70 cm en madera de alta calidad ($60.000).',
      highlights: [
        'Todo lo contemplado en el Paquete Digital (Servicio base $110.000)',
        'Álbum profesional premium ($210.000): 20x25 cm cerrado / 20x50 cm abierto',
        '7 hojas de acabado superior con fotografía personalizada en la portada',
        'Mayor espacio y apertura para presentaciones espectaculares a doble página (20x50 cm)',
        'Diagramación individual con las 10 fotos seleccionadas',
        'Un retablo individual impreso de 70 cm sobre madera de alta calidad ($60.000)',
      ],
      includesAlbum: true,
      albumType: 'Álbum profesional premium (20x25 cm cerrado / 20x50 cm abierto, 7 hojas)',
      includesRetablo: true,
      breakdown: [
        { concept: 'Servicio fotográfico base', value: 110000 },
        { concept: 'Álbum premium (7 hojas, foto en portada)', value: 210000 },
        { concept: 'Retablo individual (70 cm en madera de alta calidad)', value: 60000 },
      ],
    },
  ];

  readonly additionals: AdditionalProduct[] = [
    {
      id: 'express-digital',
      name: 'Entrega Digital Express ⚡',
      price: 20000,
      description: 'Priorización de procesamiento y entrega de las fotografías digitales finales en un plazo máximo de 1 semana (7 días calendario) posterior al evento ($20.000 por estudiante).',
      features: [
        'Costo: $20.000 adicional por estudiante',
        'Entrega rápida: máximo 1 semana (7 días) después del evento',
        'Priorización de flujo de edición y colorización profesional',
        'Acceso inmediato a la galería digital para compartir con familiares',
      ],
    },
    {
      id: 'retablo-ind',
      name: 'Retablo individual (70 cm)',
      price: 60000,
      description: 'Fotografía seleccionada por el estudiante, impresa y montada sobre estructura de madera de alta calidad (70 cm) lista para exhibición.',
      features: ['Tamaño: 70 cm de alto/largo', 'Estructura en madera de alta calidad', 'Foto seleccionada a elección del alumno'],
    },
    {
      id: 'album-std',
      name: 'Álbum profesional estándar',
      price: 150000,
      description: 'Formato de 20x20 cm cerrado / 20x40 cm abierto. Contiene 5 hojas en pasta dura con portada prediseñada (sin fotografía en portada) y nombre del estudiante.',
      features: [
        'Medidas: 20x20 cm (cerrado) / 20x40 cm (abierto)',
        'Extensión: 5 hojas (pasta dura resistente)',
        'Portada prediseñada con nombre personalizado (sin foto en portada)',
        'Diagramación individual con las mismas 10 fotografías finales',
      ],
    },
    {
      id: 'album-prem',
      name: 'Álbum premium',
      price: 210000,
      description: 'Formato más amplio de 20x25 cm cerrado / 20x50 cm abierto. Contiene 7 hojas de acabado superior con fotografía personalizada en la portada.',
      features: [
        'Medidas: 20x25 cm (cerrado) / 20x50 cm (abierto)',
        'Extensión: 7 hojas de lujo (mayor espacio para desplegado)',
        'Fotografía personalizada impresa en la portada',
        'Apertura panorámica a doble página (20x50 cm)',
      ],
    },
    {
      id: 'set-retablos',
      name: 'Set de retablos (6 retablos)',
      price: 120000,
      description: 'Composición de 6 retablos en total: 5 retablos de 26x18 cm y 1 retablo de 30x40 cm, pensados para instalar como galería de pared.',
      features: [
        'Incluye 6 retablos en total',
        '5 retablos en tamaño 26x18 cm',
        '1 retablo en tamaño 30x40 cm',
        'Fotografías seleccionadas por el estudiante para conjunto de pared',
      ],
    },
  ];

  readonly activePackageObj = computed(() => {
    return this.packages.find((p) => p.id === this.selectedPackage()) || this.packages[1];
  });

  readonly estimatedPerStudentTotal = computed(() => {
    return this.activePackageObj().totalPricePerStudent;
  });

  readonly groupTotalEstimated = computed(() => {
    return this.estimatedPerStudentTotal() * this.eventInfo.studentsCount;
  });

  toggleAllSamePackage(): void {
    this.allSamePackage.update((val) => !val);
  }

  getWhatsappUrl(customMsg?: string): string {
    const pkg = this.activePackageObj().name;
    const samePkgText = this.allSamePackage()
      ? 'La idea inicial es que todos los estudiantes adquieran el mismo paquete.'
      : 'Cada estudiante/familia elegirá el paquete de su preferencia individualmente.';

    const text = customMsg || `Hola Jackson, soy el representante del grupo de grado en Sora, Boyacá (38 estudiantes).\n\nRevisamos la propuesta con el equipo. Nos interesa principalmente la opción: ${pkg}.\n${samePkgText}\n\nQuisiéramos conversar los detalles para definir el servicio y coordinar la reserva.`;
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(text)}`;
  }
}
