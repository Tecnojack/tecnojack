import { AsyncPipe, DOCUMENT, NgFor, NgIf } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { map, of } from 'rxjs';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { LazyImgComponent } from '../../../shared/images/lazy-img.component';
import { MediaPublicService } from '../../../shared/media/media-public.service';
import { TjImageFallbackPipe } from '../../../shared/media/tj-image-fallback.pipe';
import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { ContactSectionComponent } from '../sections/contact-section.component';
import { resolvePortfolioPackageMediaFolder } from '../utils/portfolio-media-folder.util';
import { getRealImageUrlByPath } from '../../../core/data/package-real-images';
import { optimizeImage } from '../../../core/utils/image-optimizer.util';
import { ServiceRequestService } from '../../../services/service-request.service';
import { ConversionAnalyticsService } from '../../../core/analytics/conversion-analytics.service';
import { packageShortCode } from '../package-short-codes';
import { DestinationServiceComponent } from '../../../shared/destination/destination-service.component';
import { PortfolioRequestOption, PortfolioRequestOptionGroup, PortfolioPackageDetail } from '../portfolio.data';

const copFormatter = new Intl.NumberFormat('es-CO');
type RequestMode = 'base' | 'custom';

@Component({
  selector: 'tj-portfolio-package-detail-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    ScrollingModule,
    PortfolioShellComponent,
    ContactSectionComponent,
    RevealOnScrollDirective,
    FallbackImageDirective,
    LazyImgComponent,
    TjImageFallbackPipe,
    DestinationServiceComponent,
  ],
  templateUrl: './portfolio-package-detail-page.component.html',
  styleUrl: './portfolio-package-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPackageDetailPageComponent {
  private static readonly INITIAL_VISIBLE_IMAGES = 20;
  private static readonly VISIBLE_IMAGE_STEP = 20;
  readonly placeholderImage = 'assets/images/placeholder.jpg';
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly content = inject(PortfolioContentService);
  private readonly mediaPublic = inject(MediaPublicService);
  private readonly serviceRequest = inject(ServiceRequestService);
  private readonly conversionAnalytics = inject(ConversionAnalyticsService);
  private lastTrackedPackage: string | null = null;
  private readonly router = inject(Router);

  @Input() coverImage?: string;

  @ViewChild('requestDialogRef') requestDialogRef?: ElementRef<HTMLDialogElement>;
  @ViewChild('requestPanelRef') requestPanelRef?: ElementRef<HTMLElement>;

  readonly isRequestModalOpen = signal(false);
  readonly visibleVisualImages = signal(
    PortfolioPackageDetailPageComponent.INITIAL_VISIBLE_IMAGES,
  );
  readonly hasAcceptedTerms = signal(false);
  readonly isDestinationService = signal(false);
  readonly customerName = signal('');
  readonly customerPhone = signal('');
  readonly eventDate = signal('');
  readonly eventCity = signal('');
  readonly venueName = signal('');
  readonly guestCount = signal('');
  readonly customerNotes = signal('');
  readonly requestSelections = signal<Record<string, boolean>>({});
  readonly selectedBaseQuoteId = signal('');
  readonly requestMode = signal<RequestMode>('base');
  readonly isSubmittingRequest = signal(false);
  private readonly routeData = toSignal(this.route.data, {
    initialValue: this.route.snapshot.data as Data,
  });
  private readonly routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly packageDetail = computed(() => {
    const category = this.routeData()['category'] as string | undefined;
    const slug = this.routeParams().get('package');
    return this.content.getPackageDetail(category, slug);
  });

  readonly packageMediaFolder = computed(() =>
    resolvePortfolioPackageMediaFolder(this.packageDetail()),
  );

  readonly heroCoverImage = computed(() => {
    const detail = this.packageDetail();
    if (detail) {
      const videoImages: Record<string, string> = {
        'video-esencial': 'https://images.pexels.com/photos/29379918/pexels-photo-29379918.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop',
        'quince-video-esencial': 'https://images.pexels.com/photos/29379918/pexels-photo-29379918.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop',
        'video-pro': 'https://images.pexels.com/photos/30697924/pexels-photo-30697924.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop',
        'quince-video-pro': 'https://images.pexels.com/photos/30697924/pexels-photo-30697924.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop',
        'video-cinematico': 'https://images.pexels.com/photos/28613680/pexels-photo-28613680.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop',
        'quince-video-cinematico': 'https://images.pexels.com/photos/28613680/pexels-photo-28613680.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop',
        'video-personalizado': 'https://images.pexels.com/photos/9179882/pexels-photo-9179882.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop',
        'video-cortometraje': 'https://images.pexels.com/photos/1327099/pexels-photo-1327099.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'
      };

      if (videoImages[detail.slug]) {
        return videoImages[detail.slug];
      }
    }
    // Card photo travels as navigation state; `?coverImage=` is still read so old shared links keep working.
    const stateImage = (this.document.defaultView?.history.state as { coverImage?: unknown } | null)?.coverImage;
    const queryParamImage = this.route.snapshot.queryParamMap.get('coverImage');
    const resolvedUrl = this.coverImage || (typeof stateImage === 'string' ? stateImage : null) || queryParamImage;
    if (resolvedUrl) {
      return resolvedUrl;
    }
    if (!detail) {
      return this.placeholderImage;
    }
    if (detail.image && (detail.image.startsWith('http://') || detail.image.startsWith('https://'))) {
      return detail.image;
    }
    const folder = resolvePortfolioPackageMediaFolder(detail);
    const realImage = getRealImageUrlByPath(folder);
    return realImage || detail.image || this.placeholderImage;
  });

  readonly shellSubtitle = computed(() => {
    const detail = this.packageDetail();
    if (!detail) {
      return 'Portafolio';
    }
    if (detail.category === 'bodas') {
      return 'Paquetes de boda';
    }
    if (detail.category === 'preboda') {
      return 'Sesiones de preboda';
    }
    if (detail.category === 'sesiones') {
      return 'Sesiones fotográficas';
    }
    if (detail.category === 'quinces') {
      return 'Paquetes de quinceañeros';
    }
    return detail.categoryLabel;
  });
  readonly headerCtaLabel = computed(() =>
    this.isWeddingDetail(this.packageDetail())
      ? 'Solicitar propuesta'
      : 'WhatsApp directo',
  );
  readonly footerText = computed(() => {
    const detail = this.packageDetail();
    return detail
      ? `TECNOJACK · ${detail.categoryLabel} · ${detail.title}.`
      : 'TECNOJACK · fotografía y video para celebraciones especiales.';
  });

  readonly proposalHighlights = computed(() => {
    const detail = this.packageDetail();
    if (!detail || !this.isWeddingDetail(detail)) {
      return [] as string[];
    }

    const items = detail.sections.flatMap((section) => section.items);
    return items.slice(0, 4);
  });

  readonly proposalIncludeBlocks = computed(() => {
    const detail = this.packageDetail();
    if (!detail) {
      return [] as Array<{
        title: string;
        eyebrow: string;
        role: string;
        items: string[];
      }>;
    }

    return detail.sections.map((section) => {
      const role = this.classifyIncludeSection(section.title);
      return {
        title: section.title,
        eyebrow: this.includeSectionEyebrow(role),
        role,
        items: section.items,
      };
    });
  });

  readonly proposalPillars = computed(() => {
    const detail = this.packageDetail();
    if (!detail) {
      return [] as Array<{ title: string; text: string }>;
    }

    const type = detail.packageTypeLabel.toLowerCase();
    const coverageText = type.includes('foto') && type.includes('video')
      ? 'Foto y video coordinados en una sola cobertura, con el mismo criterio visual.'
      : type.includes('video')
        ? 'Video con dirección clara para narrar el día sin perder lo esencial.'
        : (type.includes('sesion') || type.includes('sesión'))
          ? 'Sesión fotográfica con dirección clara, entrega ágil y formatos digitales e impresos.'
          : type.includes('preboda')
          ? 'Sesión pensada para conectar antes del gran día, con dirección y entrega definida.'
          : 'Fotografía con dirección para capturar lo importante y entregarlo ordenado.';

    return [
      {
        title: detail.packageTypeLabel,
        text: coverageText,
      },
      {
        title: 'Qué recibes, por escrito',
        text: 'Cobertura, entregables y momentos listados con claridad para que decidas sin dudar.',
      },
      {
        title: 'Cierre directo',
        text: 'Armas la solicitud en esta misma vista y la enviamos lista por WhatsApp.',
      },
    ];
  });

  readonly extrasOptionsCount = computed(() =>
    this.simpleAdditionalGroups().reduce((total, group) => total + group.options.length, 0),
  );

  readonly relatedOptionsCount = computed(() =>
    this.relatedPackageGroups().reduce((total, group) => total + group.options.length, 0),
  );

  readonly selectedRequestItems = computed(() => {
    const includedLabels =
      this.requestMode() === 'base'
        ? this.fixedIncludedGroups().flatMap((group) =>
            group.options.map((option) => option.label),
          )
        : this.selectedIncludedOptions().map((option) => option.label);

    const extraLabels = this.selectedAdditionalOptions().map((option) => {
      const name = this.getOptionName(option.label);
      return option.priceLabel ? `${name} (${option.priceLabel})` : name;
    });

    return [...includedLabels, ...extraLabels];
  });

  readonly selectedBaseQuote = computed(() => {
    const detail = this.packageDetail();

    if (!detail) {
      return undefined;
    }

    return (
      detail.baseQuoteOptions.find(
        (option) => option.id === this.selectedBaseQuoteId(),
      ) ?? detail.baseQuoteOptions[0]
    );
  });

  readonly selectedAdditionalOptions = computed(() => {
    const detail = this.packageDetail();
    const selected = this.requestSelections();

    if (!detail) {
      return [];
    }

    const options = detail.requestOptionGroups
      .filter((group) => group.selectable)
      .flatMap((group) =>
        group.options.filter((option) => selected[option.id]),
      );

    if (detail.category !== 'sesiones') {
      return options;
    }

    const hasExtendedVideo = options.some((option) => option.id.endsWith('-video'));
    return hasExtendedVideo
      ? options.filter((option) => !option.id.endsWith('-drone'))
      : options;
  });

  readonly selectedIncludedOptions = computed(() => {
    const selected = this.requestSelections();

    return this.fixedIncludedGroups().flatMap((group) =>
      group.options.filter((option) => selected[option.id]),
    );
  });

  readonly additionalServicesTotalCop = computed(() =>
    this.selectedAdditionalOptions().reduce(
      (total, option) => total + (option.priceAmountCop ?? 0),
      0,
    ),
  );

  readonly estimatedTotalCop = computed(() => {
    const baseAmount = this.selectedBaseQuote()?.amountCop;

    if (baseAmount === undefined) {
      return undefined;
    }

    return baseAmount + this.additionalServicesTotalCop();
  });

  readonly cartExtrasCount = computed(
    () => this.selectedAdditionalOptions().length,
  );

  readonly cartDisplayTotal = computed(() => {
    const total = this.estimatedTotalCop();
    if (total !== undefined) {
      return this.formatCop(total);
    }

    const baseLabel = this.selectedBaseQuote()?.label;
    if (baseLabel) {
      return baseLabel;
    }

    return this.packageDetail()?.priceLines[0] ?? 'Por definir';
  });

  readonly fixedIncludedGroups = computed(
    () =>
      this.packageDetail()?.requestOptionGroups.filter(
        (group) => !group.selectable,
      ) ?? [],
  );

  readonly customAdditionalGroups = computed(
    () =>
      this.packageDetail()?.requestOptionGroups.filter(
        (group) => group.selectable,
      ) ?? [],
  );

  readonly simpleAdditionalGroups = computed(() =>
    this.customAdditionalGroups().filter((group) => !this.isRelatedPackageGroup(group)),
  );

  readonly relatedPackageGroups = computed(() =>
    this.customAdditionalGroups().filter((group) => this.isRelatedPackageGroup(group)),
  );

  readonly isBaseRequestMode = computed(() => this.requestMode() === 'base');
  readonly isCustomRequestMode = computed(
    () => this.requestMode() === 'custom',
  );
  readonly isRequestFormValid = computed(() => {
    const detail = this.packageDetail();
    if (!detail) {
      return false;
    }

    return (
      this.customerName().trim().length > 1 &&
      this.customerPhone().trim().length > 6
    );
  });

  readonly isCartExpanded = signal(false);

  // ─── Decision-first layout ─────────────────────────────────────────────────────────────────
  /** Booking process shown instead of generic copy: answers "¿y ahora qué pasa?" before asking. */
  readonly bookingSteps = [
    { title: 'Envía tu solicitud', text: 'Elige tu paquete y déjanos tu nombre, fecha y ciudad. Toma menos de un minuto.' },
    { title: 'Confirmamos tu fecha', text: 'Te escribimos por WhatsApp para confirmar disponibilidad y resolver tus dudas.' },
    { title: 'Reservas tu cupo', text: 'Separamos tu fecha y empezamos a planear la cobertura contigo.' },
  ] as const;

  /** Long include lists start short; the visitor can open the full list. */
  static readonly INCLUDE_PREVIEW = 5;
  /** Add-on groups show a few options first. */
  static readonly EXTRAS_PREVIEW = 4;
  private readonly expandedIncludeBlocks = signal<ReadonlySet<string>>(new Set());
  private readonly expandedExtraGroups = signal<ReadonlySet<string>>(new Set());

  isIncludeBlockExpanded(title: string): boolean {
    return this.expandedIncludeBlocks().has(title);
  }

  visibleIncludeItems(block: { title: string; items: string[] }): string[] {
    return this.isIncludeBlockExpanded(block.title)
      ? block.items
      : block.items.slice(0, PortfolioPackageDetailPageComponent.INCLUDE_PREVIEW);
  }

  hiddenIncludeCount(block: { items: string[] }): number {
    return Math.max(0, block.items.length - PortfolioPackageDetailPageComponent.INCLUDE_PREVIEW);
  }

  toggleIncludeBlock(title: string): void {
    this.expandedIncludeBlocks.update((set) => this.toggledSet(set, title));
  }

  visibleExtraOptions<T>(group: { title: string; options: T[] }): T[] {
    return this.expandedExtraGroups().has(group.title)
      ? group.options
      : group.options.slice(0, PortfolioPackageDetailPageComponent.EXTRAS_PREVIEW);
  }

  hiddenExtraCount(group: { title: string; options: unknown[] }): number {
    return this.expandedExtraGroups().has(group.title)
      ? 0
      : Math.max(0, group.options.length - PortfolioPackageDetailPageComponent.EXTRAS_PREVIEW);
  }

  toggleExtraGroup(title: string): void {
    this.expandedExtraGroups.update((set) => this.toggledSet(set, title));
  }

  private toggledSet(set: ReadonlySet<string>, key: string): ReadonlySet<string> {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    return next;
  }

  // ─── Sharing ───────────────────────────────────────────────────────────────────────────────
  /** Short link (`/p/b3`) when the package has a code, else the clean canonical path. Never carries query params. */
  readonly shareUrl = computed(() => {
    const detail = this.packageDetail();
    const origin = this.document.defaultView?.location.origin ?? 'https://tecnojack.co';
    if (!detail) return origin;
    const code = packageShortCode(detail.category, detail.slug);
    return code ? `${origin}/p/${code}` : `${origin}${detail.categoryHref}/${detail.slug}`;
  });

  readonly shareFeedback = signal<string | null>(null);
  private shareFeedbackTimer: ReturnType<typeof setTimeout> | null = null;

  async sharePackage(): Promise<void> {
    const detail = this.packageDetail();
    if (!detail) return;
    const url = this.shareUrl();
    const nav = this.document.defaultView?.navigator;
    this.conversionAnalytics.track('share_package', { package_slug: detail.slug, service: detail.category });

    // Phones: native share sheet (WhatsApp, Instagram, etc.).
    if (nav?.share) {
      try {
        await nav.share({ title: `${detail.title} · TECNOJACK`, text: `Mira este paquete de TECNOJACK: ${detail.title}`, url });
        return;
      } catch (error) {
        if ((error as DOMException)?.name === 'AbortError') return; // visitor closed the sheet
      }
    }

    // Desktop: copy the short link.
    try {
      await nav?.clipboard.writeText(url);
      this.flashShareFeedback('Enlace copiado');
    } catch {
      this.flashShareFeedback(url);
    }
  }

  private flashShareFeedback(message: string): void {
    this.shareFeedback.set(message);
    if (this.shareFeedbackTimer) clearTimeout(this.shareFeedbackTimer);
    this.shareFeedbackTimer = setTimeout(() => this.shareFeedback.set(null), 2600);
  }

  // ─── Two-step request form ─────────────────────────────────────────────────────────────────
  /** Step 1: who and when (required). Step 2: optional details, terms and send. */
  readonly requestStep = signal<1 | 2>(1);
  /** Inline errors appear only after the visitor tries to continue. */
  readonly showRequestErrors = signal(false);
  readonly nameError = computed(() =>
    this.showRequestErrors() && this.customerName().trim().length < 2 ? 'Escribe tu nombre para saber cómo llamarte.' : null,
  );
  readonly phoneError = computed(() =>
    this.showRequestErrors() && this.customerPhone().replace(/\D/g, '').length < 7
      ? 'Escribe un número de WhatsApp válido para responderte.'
      : null,
  );
  /** Native date input lower bound: an event can't happen in the past. */
  readonly todayIso = new Date().toISOString().slice(0, 10);

  continueRequest(): void {
    if (!this.isRequestFormValid()) {
      this.showRequestErrors.set(true);
      return;
    }
    this.showRequestErrors.set(false);
    this.requestStep.set(2);
  }

  backToRequestStep1(): void {
    this.requestStep.set(1);
  }

  readonly requestWhatsappHref = computed(() => {
    const detail = this.packageDetail();

    if (!detail) {
      return '/portfolio';
    }

    return this.content.buildWhatsappHref(this.buildWhatsappMessage(detail));
  });

  private buildWhatsappMessage(detail: NonNullable<ReturnType<PortfolioPackageDetailPageComponent['packageDetail']>>): string {

    const lines = [
      `Hola TECNOJACK, quiero solicitar el paquete ${detail.title}.`,
      '',
      `Categoría: ${detail.categoryLabel}`,
      `Modalidad: ${this.requestMode() === 'base' ? 'Paquete base' : 'Cotización personalizada'}`,
    ];

    if (this.customerName().trim()) {
      lines.push(`Nombre: ${this.customerName().trim()}`);
    }

    if (this.eventCity().trim()) {
      lines.push(`Ciudad: ${this.eventCity().trim()}`);
    }

    if (this.customerPhone().trim()) {
      lines.push(`Teléfono: ${this.customerPhone().trim()}`);
    }

    if (this.eventDate().trim()) {
      lines.push(`Fecha estimada: ${this.eventDate().trim()}`);
    }

    if (this.venueName().trim()) {
      lines.push(`Lugar o locación: ${this.venueName().trim()}`);
    }

    if (this.guestCount().trim()) {
      lines.push(`Cantidad de invitados: ${this.guestCount().trim()}`);
    }

    const selectedItems = this.selectedRequestItems();

    if (selectedItems.length) {
      lines.push('', 'Elementos seleccionados del paquete:');
      selectedItems.forEach((item) => lines.push(`- ${item}`));
    }

    const selectedBaseQuote = this.selectedBaseQuote();

    if (selectedBaseQuote?.label) {
      lines.push('', `Paquete base: ${selectedBaseQuote.label}`);
    }

    const additionalTotal = this.additionalServicesTotalCop();

    if (additionalTotal > 0) {
      lines.push(
        `Adicionales seleccionados: ${this.formatCop(additionalTotal)}`,
      );
    }

    const total = this.estimatedTotalCop();

    if (total !== undefined) {
      lines.push(`Total estimado: ${this.formatCop(total)}`);
    }

    lines.push(
      '',
      `Modalidad Destination: ${this.isDestinationService() ? 'SÃ­, solicito cotizaciÃ³n de viaje' : 'No seleccionada'}`,
    );
    if (this.isDestinationService()) {
      lines.push('Entiendo que transporte y gastos de viaje se cotizan por separado y son asumidos por el cliente.');
    }

    if (this.customerNotes().trim()) {
      lines.push('', `Notas: ${this.customerNotes().trim()}`);
    }

    return lines.join('\n');
  }

  constructor() {
    effect(() => {
      const detail = this.packageDetail();

      if (!detail) {
        this.title.setTitle('Paquete no encontrado | TECNOJACK');
        this.meta.updateTag({
          name: 'description',
          content:
            'El paquete solicitado no está disponible. Explora las categorías del portafolio de TECNOJACK.',
        });
        return;
      }

      // One view per package even if this effect re-runs for other signal changes.
      if (this.lastTrackedPackage !== detail.slug) {
        this.lastTrackedPackage = detail.slug;
        this.conversionAnalytics.track('view_package', { package_slug: detail.slug, service: detail.category });
      }

      this.requestSelections.set(
        Object.fromEntries(
          detail.requestOptionGroups.flatMap((group) =>
            group.options.map((option) => [
              option.id,
              group.selectable ? option.selectedByDefault === true : true,
            ]),
          ),
        ),
      );
      this.selectedBaseQuoteId.set(
        detail.baseQuoteOptions.find(
          (option) => option.selectedByDefault !== false,
        )?.id ??
          detail.baseQuoteOptions[0]?.id ??
          '',
      );
      this.requestMode.set('base');
      this.customerName.set('');
      this.customerPhone.set('');
      this.eventDate.set('');
      this.eventCity.set('');
      this.venueName.set('');
      this.guestCount.set('');
      this.customerNotes.set('');
      this.hasAcceptedTerms.set(false);
      this.isDestinationService.set(false);
      this.isRequestModalOpen.set(false);
      this.isCartExpanded.set(false);
      this.visibleVisualImages.set(
        PortfolioPackageDetailPageComponent.INITIAL_VISIBLE_IMAGES,
      );
      this.title.setTitle(
        `${detail.title} | ${detail.categoryLabel} | TECNOJACK`,
      );
      this.meta.updateTag({ name: 'description', content: detail.lead });
    });

    effect((onCleanup) => {
      const modalOpen = this.isRequestModalOpen();
      const body = this.document.body;
      const root = this.document.documentElement;

      body.classList.toggle('portfolio-request-modal-open', modalOpen);
      root.classList.toggle('portfolio-request-modal-open', modalOpen);

      onCleanup(() => {
        body.classList.remove('portfolio-request-modal-open');
        root.classList.remove('portfolio-request-modal-open');
      });
    });
  }

  packageMediaState() {
    return this.mediaPublic.getResolvedMediaStateByFolder(
      this.packageMediaFolder(),
    );
  }

  coverByDetail(detail: PortfolioPackageDetail | null | undefined) {
    if (detail?.image && (detail.image.startsWith('http://') || detail.image.startsWith('https://'))) {
      return of(detail.image);
    }
    return this.mediaPublic.getRealImage(
      resolvePortfolioPackageMediaFolder(detail),
    );
  }

  optimizeImage(url: string, width = 400): string {
    return optimizeImage(url, width);
  }

  getVisibleGalleryItems(
    galleryUrls: string[],
  ): Array<{ id: string; url: string }> {
    return galleryUrls
      .slice(0, this.visibleVisualImages())
      .map((url, index) => ({ id: `${index}-${url}`, url }));
  }

  hasMoreVisualImages(galleryUrls: string[]): boolean {
    return galleryUrls.length > this.visibleVisualImages();
  }

  loadMoreVisualImages(): void {
    this.visibleVisualImages.update(
      (current) => current + PortfolioPackageDetailPageComponent.VISIBLE_IMAGE_STEP,
    );
  }

  trackById(index: number, item: { id: string }): string {
    return item.id;
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    const destinationDialog = this.document.querySelector('dialog.destination-modal[open]');
    if (destinationDialog) {
      return;
    }
    if (this.isRequestModalOpen()) {
      this.closeRequestModal();
    }
  }

  openRequestModal(): void {
    const opened = this.packageDetail();
    if (opened) {
      this.conversionAnalytics.track('begin_request', { package_slug: opened.slug, service: opened.category });
    }
    this.hasAcceptedTerms.set(false);
    this.isDestinationService.set(false);
    this.isSubmittingRequest.set(false);
    this.requestStep.set(1);
    this.showRequestErrors.set(false);
    this.isRequestModalOpen.set(true);
    setTimeout(() => {
      const dialog = this.requestDialogRef?.nativeElement;
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
      this.document.body.style.overflow = 'hidden';
    });
  }

  closeRequestModal(): void {
    const dialog = this.requestDialogRef?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
    this.isRequestModalOpen.set(false);
    this.hasAcceptedTerms.set(false);
    this.isDestinationService.set(false);
    this.isSubmittingRequest.set(false);
    this.document.body.style.overflow = '';
  }

  onRequestDialogClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.closest?.('.destination-modal') || target?.closest?.('tj-destination-service')) {
      return;
    }
    if (target && !target.isConnected) {
      return;
    }
    if (this.requestPanelRef?.nativeElement.contains(target as Node)) {
      return;
    }
    this.closeRequestModal();
  }

  toggleCartExpanded(): void {
    this.isCartExpanded.update((open) => !open);
  }

  addCartOption(optionId: string): void {
    this.toggleRequestOption(optionId, true);
  }

  removeCartOption(optionId: string): void {
    this.toggleRequestOption(optionId, false);
  }

  toggleCartOption(optionId: string): void {
    if (this.isOptionSelected(optionId)) {
      this.removeCartOption(optionId);
      return;
    }

    this.addCartOption(optionId);
  }

  guardRequestSubmit(event: MouseEvent): void {

    if (this.hasAcceptedTerms() && this.isRequestFormValid()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }

  async submitRequest(): Promise<void> {
    const detail = this.packageDetail();

    if (
      !detail ||
      !this.hasAcceptedTerms() ||
      !this.isRequestFormValid() ||
      this.isSubmittingRequest()
    ) {
      return;
    }

    this.isSubmittingRequest.set(true);
    this.conversionAnalytics.track('submit_request', {
      package_slug: detail.slug,
      service: detail.category,
      request_mode: this.isDestinationService() ? 'destination' : 'local',
    });

    const message = this.buildWhatsappMessage(detail);
    const locationParts = [this.eventCity().trim(), this.venueName().trim()].filter((part) => part.length > 0);

    try {
      await this.serviceRequest.createRequest({
        name: this.customerName(),
        phone: this.customerPhone(),
        service: detail.categoryLabel,
        package: detail.title,
        message,
        eventDate: this.eventDate(),
        location: locationParts.join(' - ') || undefined,
      });
    } catch (error) {
      console.error('No se pudo guardar la solicitud del paquete en Firestore', error);
    }

    const href = this.requestWhatsappHref();
    window.open(href, '_blank', 'noopener,noreferrer');
    this.closeRequestModal();
  }

  updateCustomerName(value: string): void {
    this.customerName.set(value);
  }

  updateCustomerPhone(value: string): void {
    this.customerPhone.set(value);
  }

  updateEventDate(value: string): void {
    this.eventDate.set(value);
  }

  updateEventCity(value: string): void {
    this.eventCity.set(value);
  }

  updateVenueName(value: string): void {
    this.venueName.set(value);
  }

  updateGuestCount(value: string): void {
    this.guestCount.set(value);
  }

  updateCustomerNotes(value: string): void {
    this.customerNotes.set(value);
  }

  toggleRequestOption(optionId: string, checked: boolean): void {
    this.requestSelections.update((current) => ({
      ...current,
      [optionId]: checked,
    }));
  }

  updateBaseQuote(optionId: string): void {
    this.selectedBaseQuoteId.set(optionId);
  }

  updateRequestMode(mode: RequestMode): void {
    this.requestMode.set(mode);
  }

  isOptionSelected(optionId: string): boolean {
    return !!this.requestSelections()[optionId];
  }

  getLinkedPackageHref(option: PortfolioRequestOption): string | null {
    if (!option.linkedPackageCategory || !option.linkedPackageSlug) {
      return null;
    }

    const linked = this.content.getPackageDetail(
      option.linkedPackageCategory,
      option.linkedPackageSlug,
    );
    return linked ? `${linked.categoryHref}/${linked.slug}` : null;
  }

  private isRelatedPackageGroup(group: PortfolioRequestOptionGroup): boolean {
    return group.options.some(
      (option) => !!option.linkedPackageCategory && !!option.linkedPackageSlug,
    );
  }

  getOptionName(label: string): string {
    return String(label ?? '').split('||')[0]?.trim() ?? '';
  }

  getOptionDescription(label: string): string {
    return String(label ?? '').split('||').slice(1).join('||').trim();
  }

  isWeddingDetail(
    detail: PortfolioPackageDetail | null | undefined,
  ): boolean {
    return true; // Apply premium detail view to all categories
  }

  heroTitleParts(title: string): { first: string; middle: string; last: string } {
    const words = String(title ?? '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 0) {
      return { first: '', middle: '', last: '' };
    }

    if (words.length === 1) {
      return { first: words[0], middle: '', last: '' };
    }

    if (words.length === 2) {
      return { first: words[0], middle: ' ', last: words[1] };
    }

    return {
      first: words[0],
      middle: ` ${words.slice(1, -1).join(' ')} `,
      last: words[words.length - 1],
    };
  }

  private classifyIncludeSection(
    title: string,
  ): 'coverage' | 'deliverables' | 'moments' | 'other' {
    const normalized = title.toLowerCase();
    if (normalized.includes('entreg')) {
      return 'deliverables';
    }
    if (normalized.includes('moment')) {
      return 'moments';
    }
    if (
      normalized.includes('cobertura') ||
      normalized.includes('incluye') ||
      normalized.includes('servicio') ||
      normalized.includes('caracter')
    ) {
      return 'coverage';
    }
    return 'other';
  }

  private includeSectionEyebrow(
    role: 'coverage' | 'deliverables' | 'moments' | 'other',
  ): string {
    switch (role) {
      case 'deliverables':
        return 'Esto te llevas';
      case 'moments':
        return 'Momentos cubiertos';
      case 'coverage':
        return 'Así te acompañamos';
      default:
        return 'Incluido';
    }
  }

  formatCop(value: number): string {
    return `${copFormatter.format(value)} COP`;
  }

  get navItems() {
    return this.content.navItems();
  }

  get editable(): boolean {
    return false;
  }
}
