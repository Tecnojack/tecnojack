import { AsyncPipe, DOCUMENT, NgFor, NgIf } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { map } from 'rxjs';

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
  private readonly router = inject(Router);

  @Input() coverImage?: string;

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
    const queryParamImage = this.route.snapshot.queryParamMap.get('coverImage');
    const resolvedUrl = this.coverImage || queryParamImage;
    if (resolvedUrl) {
      return resolvedUrl;
    }
    if (!detail) {
      return this.placeholderImage;
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

    return detail.requestOptionGroups
      .filter((group) => group.selectable)
      .flatMap((group) =>
        group.options.filter((option) => selected[option.id]),
      );
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
    if (this.isRequestModalOpen()) {
      this.closeRequestModal();
    }
  }

  openRequestModal(): void {
    this.hasAcceptedTerms.set(false);
    this.isDestinationService.set(false);
    this.isSubmittingRequest.set(false);
    this.isRequestModalOpen.set(true);
  }

  closeRequestModal(): void {
    this.isRequestModalOpen.set(false);
    this.hasAcceptedTerms.set(false);
    this.isDestinationService.set(false);
    this.isSubmittingRequest.set(false);
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
    console.log('[WA_FLOW][PACKAGE_DETAIL] click:guard', {
      hasAcceptedTerms: this.hasAcceptedTerms(),
      isRequestFormValid: this.isRequestFormValid(),
      isSubmittingRequest: this.isSubmittingRequest(),
    });

    if (this.hasAcceptedTerms() && this.isRequestFormValid()) {
      return;
    }

    console.log('[WA_FLOW][PACKAGE_DETAIL] blocked:invalid-state');
    event.preventDefault();
    event.stopPropagation();
  }

  async submitRequest(): Promise<void> {
    const detail = this.packageDetail();

    console.log('[WA_FLOW][PACKAGE_DETAIL] click:submitRequest', {
      hasDetail: !!detail,
      hasAcceptedTerms: this.hasAcceptedTerms(),
      isRequestFormValid: this.isRequestFormValid(),
      isSubmittingRequest: this.isSubmittingRequest(),
      href: this.requestWhatsappHref(),
    });

    if (
      !detail ||
      !this.hasAcceptedTerms() ||
      !this.isRequestFormValid() ||
      this.isSubmittingRequest()
    ) {
      console.log('[WA_FLOW][PACKAGE_DETAIL] blocked:submit-invalid-state');
      return;
    }

    this.isSubmittingRequest.set(true);

    const message = this.buildWhatsappMessage(detail);
    const locationParts = [this.eventCity().trim(), this.venueName().trim()].filter((part) => part.length > 0);

    try {
      console.log('[WA_FLOW][PACKAGE_DETAIL] firestore:creating-request');
      await this.serviceRequest.createRequest({
        name: this.customerName(),
        phone: this.customerPhone(),
        service: detail.categoryLabel,
        package: detail.title,
        message,
        eventDate: this.eventDate(),
        location: locationParts.join(' - ') || undefined,
      });
      console.log('[WA_FLOW][PACKAGE_DETAIL] firestore:request-created');
    } catch (error) {
      console.error('No se pudo guardar la solicitud del paquete en Firestore', error);
    }

    const href = this.requestWhatsappHref();
    console.log('[WA_FLOW][PACKAGE_DETAIL] whatsapp:opening', { href });
    const popup = window.open(href, '_blank', 'noopener,noreferrer');
    console.log('[WA_FLOW][PACKAGE_DETAIL] whatsapp:open-result', {
      opened: !!popup,
      blockedByBrowser: !popup,
    });
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
