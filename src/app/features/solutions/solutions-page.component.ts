import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ConversionAnalyticsService } from '../../core/analytics/conversion-analytics.service';
import { ServiceRequestService } from '../../services/service-request.service';
import { loadMotionRuntime, prefersReducedMotion } from '../../shared/motion/motion-runtime';
import { PortfolioShellComponent } from '../portfolio/portfolio-shell.component';
import { PortfolioContentService } from '../portfolio/services/portfolio-content.service';
import { BuildHeroComponent } from './components/build-hero.component';
import { SiteAnatomyComponent } from './components/site-anatomy.component';
import {
  FAQ,
  INDUSTRIES,
  MEDIA_SERVICES,
  PRINCIPLES,
  PROCESS,
  PROOF,
  SERVICES,
  SOLUTION_OPTIONS,
  STOCK,
  SolutionKind,
  stockPhoto,
} from './solutions.content';

/**
 * /soluciones — software-first landing page: web & software development, with TECNOJACK's own photo and
 * video production as the differentiator. Own visual identity (graphite / bone / signal orange); keeps the
 * shared portfolio header. Content lives in `solutions.content.ts`.
 */
@Component({
  selector: 'tj-solutions-page',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, PortfolioShellComponent, BuildHeroComponent, SiteAnatomyComponent],
  templateUrl: './solutions-page.component.html',
  styleUrl: './solutions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionsPageComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly serviceRequest = inject(ServiceRequestService);
  private readonly analytics = inject(ConversionAnalyticsService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  readonly principles = PRINCIPLES;
  readonly services = SERVICES;
  readonly mediaServices = MEDIA_SERVICES;
  readonly industries = INDUSTRIES;
  readonly process = PROCESS;
  readonly proof = PROOF;
  readonly faq = FAQ;
  readonly solutionOptions = SOLUTION_OPTIONS;

  readonly mediaPhotos = {
    main: stockPhoto(STOCK.videoStudio, 1100),
    product: stockPhoto(STOCK.perfumePedestal, 700),
    portrait: stockPhoto(STOCK.corporatePortrait, 700),
    detail: stockPhoto(STOCK.amberBottles, 700),
  };

  // ─── Industries tabs ────────────────────────────────────────────────────────────────────────
  readonly activeIndustryKey = signal(INDUSTRIES[0].key);
  readonly activeIndustry = computed(() => INDUSTRIES.find((item) => item.key === this.activeIndustryKey()) ?? INDUSTRIES[0]);

  selectIndustry(key: string): void {
    this.activeIndustryKey.set(key);
  }

  industryPhoto(id: number): string {
    return stockPhoto(id, 900);
  }

  // ─── FAQ ────────────────────────────────────────────────────────────────────────────────────
  readonly openFaq = signal<number | null>(0);

  toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? null : index));
  }

  // ─── Request form (stored in Firestore, then continued on WhatsApp) ─────────────────────────
  readonly solutionKind = signal<SolutionKind>('landing');
  readonly isSubmitting = signal(false);
  readonly feedback = signal<string | null>(null);

  readonly name = signal('');
  readonly phone = signal('');
  readonly businessName = signal('');
  readonly need = signal('');
  readonly location = signal('');
  readonly date = signal('');
  readonly budgetRange = signal('');

  readonly solutionLabel = computed(
    () => this.solutionOptions.find((option) => option.value === this.solutionKind())?.label ?? 'Proyecto web',
  );

  readonly canSubmit = computed(
    () => this.name().trim().length > 1 && this.phone().trim().length > 6 && this.need().trim().length > 5 && !this.isSubmitting(),
  );

  readonly whatsappHref = computed(() => {
    const lines = [
      'Hola TECNOJACK, quiero cotizar un proyecto web.',
      '',
      `Necesito: ${this.solutionLabel()}`,
      `Nombre: ${this.name().trim() || 'No definido'}`,
      `Teléfono: ${this.phone().trim() || 'No definido'}`,
      `Negocio: ${this.businessName().trim() || 'No definido'}`,
      `Ciudad: ${this.location().trim() || 'No definida'}`,
      `Fecha objetivo: ${this.date().trim() || 'No definida'}`,
      `Rango de inversión: ${this.budgetRange().trim() || 'Por definir'}`,
      '',
      `Sobre el proyecto: ${this.need().trim() || 'Sin detalle'}`,
    ];
    return this.content.buildWhatsappHref(lines.join('\n'));
  });

  readonly directWhatsappHref = this.content.buildWhatsappHref(
    'Hola TECNOJACK, quiero cotizar un sitio web o sistema para mi negocio.',
  );

  get navItems() {
    return this.content.navItems();
  }

  private revertMotion: (() => void) | null = null;
  private destroyed = false;

  constructor() {
    this.title.setTitle('TECNOJACK | Desarrollo web y software con fotografía y video propios');
    this.meta.updateTag({
      name: 'description',
      content:
        'Creamos landing pages, sitios corporativos, tiendas en línea, portales de citas y sistemas a medida, con fotografía de producto y video hechos por nuestro equipo.',
    });

    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.revertMotion?.();
    });

    afterNextRender(() => {
      if (prefersReducedMotion()) return;
      this.zone.runOutsideAngular(() => void this.initMotion());
    });
  }

  /** Staggered reveals for sections + Lenis smooth scrolling (the anatomy chapter pins itself). */
  private async initMotion(): Promise<void> {
    const { gsap, ScrollTrigger, attachLenis } = await loadMotionRuntime();
    if (this.destroyed) return;
    const root: HTMLElement = this.host.nativeElement;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-rv]', root);
      gsap.set(items, { autoAlpha: 0, y: 28 });
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
      });
    }, root);
    const detachLenis = attachLenis();

    this.revertMotion = () => {
      ctx.revert();
      detachLenis();
    };
    ScrollTrigger.refresh();
  }

  // ─── Form handlers ──────────────────────────────────────────────────────────────────────────
  selectSolution(value: string): void {
    this.solutionKind.set(value as SolutionKind);
  }

  updateName(value: string): void {
    this.name.set(value);
  }

  updatePhone(value: string): void {
    this.phone.set(value);
  }

  updateBusinessName(value: string): void {
    this.businessName.set(value);
  }

  updateNeed(value: string): void {
    this.need.set(value);
  }

  updateLocation(value: string): void {
    this.location.set(value);
  }

  updateDate(value: string): void {
    this.date.set(value);
  }

  updateBudgetRange(value: string): void {
    this.budgetRange.set(value);
  }

  scrollToForm(): void {
    document.getElementById('soluciones-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async submit(): Promise<void> {
    if (!this.canSubmit()) {
      this.feedback.set('Completa nombre, WhatsApp y cuéntanos un poco de tu proyecto para continuar.');
      return;
    }

    this.isSubmitting.set(true);
    this.feedback.set(null);
    const kind = this.solutionKind();
    this.analytics.track('submit_request', { service: 'soluciones', package_slug: `solucion-${kind}` });

    try {
      await this.serviceRequest.createRequest({
        name: this.name(),
        phone: this.phone(),
        service: 'Soluciones Digitales',
        package: `solucion-${kind}`,
        message: this.need(),
        location: this.location(),
        eventDate: this.date(),
        businessName: this.businessName(),
        type: 'negocio',
        need: `${this.solutionLabel()} — ${this.need()}`,
        date: this.date(),
        budgetRange: this.budgetRange(),
      });

      window.open(this.whatsappHref(), '_blank', 'noopener,noreferrer');
      this.feedback.set('¡Listo! Abrimos WhatsApp con tu solicitud para continuar la conversación.');
    } catch (error) {
      console.error('No se pudo guardar la solicitud de soluciones', error);
      this.feedback.set('No pudimos enviar la solicitud. Intenta de nuevo o escríbenos directo por WhatsApp.');
    }

    this.isSubmitting.set(false);
  }
}
