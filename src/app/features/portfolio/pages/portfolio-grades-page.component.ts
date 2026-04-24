import { AsyncPipe, DOCUMENT, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { Observable, map, shareReplay, startWith } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import {
  MEDIA_PUBLIC_FALLBACK_IMAGE,
  MediaPublicService,
} from '../../../shared/media/media-public.service';

import { PortfolioPackageCategory } from '../portfolio.data';
import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { PortfolioServiceCategoryPageComponent } from './portfolio-service-category-page.component';
import { ServiceRequestService } from '../../../services/service-request.service';

@Component({
  selector: 'tj-portfolio-grades-page',
  standalone: true,
  imports: [AsyncPipe, PortfolioShellComponent, PortfolioServiceCategoryPageComponent, NgIf, NgFor, RevealOnScrollDirective],
  templateUrl: './portfolio-grades-page.component.html',
  styleUrl: './portfolio-grades-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioGradesPageComponent {
  private readonly document = inject(DOCUMENT);
  private readonly content = inject(PortfolioContentService);
  private readonly mediaPublic = inject(MediaPublicService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly serviceRequest = inject(ServiceRequestService);

  readonly category: PortfolioPackageCategory = 'grados';
  readonly heroCategoryHeroImage$: Observable<string | null> = this.mediaPublic
    .getCoverByFolder('servicios/grados')
    .pipe(
      map((url) =>
        url && url !== MEDIA_PUBLIC_FALLBACK_IMAGE ? `url(${url})` : null,
      ),
      startWith(null),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  @ViewChild('studentsPackages')
  private studentsPackages?: PortfolioServiceCategoryPageComponent;

  readonly institutionsInvestmentCop = 60000;
  readonly institutionsMinStudents = 40;
  readonly institutionsIncludes: string[] = [
    '10 fotografías digitales por estudiante',
    'Fotografía individual durante la ceremonia',
    'Fotografías con familiares',
    'Fotografía grupal',
    'Captura de momentos espontáneos',
    'Entrega digital organizada por estudiante'
  ];
  readonly institutionsVideoIncludes: string[] = [
    'Video resumen completo del evento',
    'Versión horizontal (cinematográfica)',
    'Versión vertical (redes sociales)',
    'Entrega en alta calidad'
  ];
  readonly institutionsAdditionals: Array<{ name: string; priceCop: number; description: string }> = [
    { name: 'Foto digital adicional', priceCop: 5000, description: 'Amplía tu selección de recuerdos' },
    { name: '12 fotos impresas', priceCop: 30000, description: 'Recuerdos físicos listos para conservar' },
    { name: 'Cuadro en madera (60cm)', priceCop: 110000, description: 'Fotografía lista para exhibir' },
    { name: 'Fotobook individual', priceCop: 250000, description: 'Álbum con diseño editorial' },
    { name: 'Video individual personalizado', priceCop: 350000, description: 'Video íntimo del estudiante' }
  ];
  readonly institutionsConditions: string[] = [
    'Mínimo 40 estudiantes',
    'Anticipo del 40% para reserva',
    'Entrega de fotos: 1 a 2 semanas',
    'Entrega de video: 2 a 3 semanas',
    'Equipo profesional durante el evento'
  ];

  readonly isInstitutionsRequestOpen = signal(false);
  readonly institutionName = signal('');
  readonly coordinatorName = signal('');
  readonly coordinatorPhone = signal('');
  readonly eventCity = signal('');
  readonly eventDate = signal('');
  readonly studentCount = signal('');
  readonly notes = signal('');
  readonly hasAcceptedTerms = signal(false);
  readonly isSubmittingInstitutionsRequest = signal(false);
  readonly isInstitutionsRequestFormValid = computed(
    () =>
      this.coordinatorName().trim().length > 1 &&
      this.coordinatorPhone().trim().length > 6,
  );

  readonly institutionsWhatsappHref = computed(() => {
    const lines = [
      'Hola TECNOJACK, quiero solicitar una propuesta para grados institucionales.',
      '',
      'Servicio: Grados · Instituciones'
    ];

    if (this.institutionName().trim()) lines.push(`Institución: ${this.institutionName().trim()}`);
    if (this.coordinatorName().trim()) lines.push(`Contacto: ${this.coordinatorName().trim()}`);
    if (this.coordinatorPhone().trim()) lines.push(`Teléfono: ${this.coordinatorPhone().trim()}`);
    if (this.eventCity().trim()) lines.push(`Ciudad: ${this.eventCity().trim()}`);
    if (this.eventDate().trim()) lines.push(`Fecha estimada: ${this.eventDate().trim()}`);
    if (this.studentCount().trim()) lines.push(`Estudiantes: ${this.studentCount().trim()}`);
    if (this.notes().trim()) lines.push('', `Notas: ${this.notes().trim()}`);

    return this.content.buildWhatsappHref(lines.join('\n'));
  });

  constructor() {
    effect(() => {
      const pageMeta = this.content.getPageMeta(
        'portfolio-grados',
        'TECNOJACK | Grados',
        'Grados para estudiantes e instituciones en una sola página.'
      );
      this.title.setTitle(pageMeta.title);
      this.meta.updateTag({ name: 'description', content: pageMeta.description });
    });

    effect((onCleanup) => {
      const open = this.isInstitutionsRequestOpen();
      const body = this.document.body;
      const root = this.document.documentElement;

      body.classList.toggle('portfolio-request-modal-open', open);
      root.classList.toggle('portfolio-request-modal-open', open);

      onCleanup(() => {
        body.classList.remove('portfolio-request-modal-open');
        root.classList.remove('portfolio-request-modal-open');
      });
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

  readonly heroFacts = computed(() => [
    { label: 'Paquetes', value: '3' },
    { label: 'Desde', value: '60.000 COP' },
    { label: 'Mín. estudiantes', value: '40' },
    { label: 'Entrega', value: '1–2 sem.' }
  ]);

  readonly heroSocialLinks = computed(() => {
    const iconMap: Record<string, string> = {
      whatsapp: 'assets/images/icons/whatsapp.svg',
      instagram: 'assets/images/icons/instagram.svg',
      facebook: 'assets/images/icons/facebook.svg',
      tiktok: 'assets/images/icons/tiktok.svg'
    };
    const order = new Map<string, number>([['whatsapp', 1], ['instagram', 2], ['tiktok', 3], ['facebook', 4]]);
    return this.content.contactLinks()
      .map((link) => ({
        platform: link.platform,
        title: link.title,
        href: link.platform === 'whatsapp'
          ? this.content.buildWhatsappHref('Hola TECNOJACK, quiero información sobre cobertura de grados.')
          : link.href,
        iconSrc: iconMap[link.platform]
      }))
      .sort((a, b) => (order.get(a.platform) ?? 99) - (order.get(b.platform) ?? 99));
  });

  openStudentsRequest(): void {
    this.closeInstitutionsRequest();

    const details = this.content.getPackageDetailsByCategory('grados');
    const defaultDetail = details.find((item) => item.featured) ?? details[0];
    if (!defaultDetail) return;

    const openModal = (attempt: number) => {
      const component = this.studentsPackages;
      if (!component) {
        if (attempt < 5) {
          setTimeout(() => openModal(attempt + 1), 0);
        }
        return;
      }

      component.openPackageModal(defaultDetail.slug);
      queueMicrotask(() => component.startRequest('base'));
    };

    openModal(0);
  }

  openInstitutionsRequest(): void {
    this.studentsPackages?.closePackageModal();
    this.studentsPackages?.closeStoryModal();
    this.hasAcceptedTerms.set(false);
    this.isSubmittingInstitutionsRequest.set(false);
    this.isInstitutionsRequestOpen.set(true);
  }

  closeInstitutionsRequest(): void {
    this.isInstitutionsRequestOpen.set(false);
    this.hasAcceptedTerms.set(false);
    this.isSubmittingInstitutionsRequest.set(false);
  }

  guardInstitutionsSubmit(event: MouseEvent): void {
    if (this.hasAcceptedTerms() && this.isInstitutionsRequestFormValid()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }

  async submitInstitutionsRequest(): Promise<void> {
    if (
      !this.hasAcceptedTerms() ||
      !this.isInstitutionsRequestFormValid() ||
      this.isSubmittingInstitutionsRequest()
    ) {
      return;
    }

    this.isSubmittingInstitutionsRequest.set(true);

    const messageLines = [
      'Hola TECNOJACK, quiero solicitar una propuesta para grados institucionales.',
      '',
      'Servicio: Grados · Instituciones',
      `Institución: ${this.institutionName().trim() || 'No definida'}`,
      `Contacto: ${this.coordinatorName().trim()}`,
      `Teléfono: ${this.coordinatorPhone().trim()}`,
      `Ciudad: ${this.eventCity().trim() || 'No definida'}`,
      `Fecha estimada: ${this.eventDate().trim() || 'No definida'}`,
      `Estudiantes: ${this.studentCount().trim() || 'No definido'}`,
      `Notas: ${this.notes().trim() || 'N/A'}`
    ];

    const message = messageLines.join('\n');

    try {
      await this.serviceRequest.createRequest({
        name: this.coordinatorName(),
        phone: this.coordinatorPhone(),
        service: 'grados institucionales',
        package: this.institutionName().trim() || undefined,
        message,
        eventDate: this.eventDate(),
        location: this.eventCity(),
      });
    } catch (error) {
      console.error('No se pudo guardar la solicitud institucional en Firestore', error);
    }

    window.open(this.institutionsWhatsappHref(), '_blank', 'noopener,noreferrer');
    this.closeInstitutionsRequest();
  }

  formatCop(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  get editable(): boolean {
    return false;
  }
}
