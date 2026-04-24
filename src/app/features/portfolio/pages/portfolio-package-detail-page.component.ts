import { AsyncPipe, DOCUMENT, NgFor, NgIf } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { LazyImgComponent } from '../../../shared/images/lazy-img.component';
import { MediaPublicService } from '../../../shared/media/media-public.service';
import { TjImageFallbackPipe } from '../../../shared/media/tj-image-fallback.pipe';
import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { ContactSectionComponent } from '../sections/contact-section.component';
import { resolvePortfolioPackageMediaFolder } from '../utils/portfolio-media-folder.util';
import { optimizeImage } from '../../../core/utils/image-optimizer.util';
import { ServiceRequestService } from '../../../services/service-request.service';

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

  readonly isRequestModalOpen = signal(false);
  readonly visibleVisualImages = signal(
    PortfolioPackageDetailPageComponent.INITIAL_VISIBLE_IMAGES,
  );
  readonly hasAcceptedTerms = signal(false);
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

  readonly shellSubtitle = computed(
    () => this.packageDetail()?.categoryLabel ?? 'Portafolio',
  );
  readonly footerText = computed(() => {
    const detail = this.packageDetail();
    return detail
      ? `TECNOJACK Studio · ${detail.categoryLabel} · ${detail.title}.`
      : 'TECNOJACK Studio · fotografía y cine para celebraciones especiales.';
  });

  readonly selectedRequestItems = computed(() => {
    if (this.requestMode() === 'base') {
      return this.fixedIncludedGroups().flatMap((group) =>
        group.options.map((option) => option.label),
      );
    }

    return [
      ...this.selectedIncludedOptions(),
      ...this.selectedAdditionalOptions(),
    ].map((option) => option.label);
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
    if (this.requestMode() !== 'custom') {
      return [];
    }

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

  readonly isBaseRequestMode = computed(() => this.requestMode() === 'base');
  readonly isCustomRequestMode = computed(
    () => this.requestMode() === 'custom',
  );
  readonly isRequestFormValid = computed(
    () =>
      this.customerName().trim().length > 1 &&
      this.customerPhone().trim().length > 6 &&
      !!this.packageDetail(),
  );

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
      lines.push('', 'Servicios seleccionados:');
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
      this.isRequestModalOpen.set(false);
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
    this.isSubmittingRequest.set(false);
    this.isRequestModalOpen.set(true);
  }

  closeRequestModal(): void {
    this.isRequestModalOpen.set(false);
    this.hasAcceptedTerms.set(false);
    this.isSubmittingRequest.set(false);
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
