import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, map, shareReplay, startWith } from 'rxjs';

import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { MediaPublicService } from '../../../shared/media/media-public.service';
import { ServiceRequestService } from '../../../services/service-request.service';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { PortfolioPlaylistVideo } from '../portfolio.data';

export type VideoServicePackage = {
  name: string;
  price: number;
  description: string;
  tagline?: string;
  categoryTag?: string;
  features: string[];
  deliverables: string[];
  additionalServices: Array<{
    name: string;
    price: number;
    description: string;
  }>;
  isBasePrice?: boolean;
};

type ExperienceSection = {
  title: string;
  items: string[];
};

type ServiceModalStep = 'detail' | 'request';
type RequestMode = 'base' | 'custom';
type VideoRequestOption = {
  id: string;
  label: string;
};

type VideoAdditionalRequestOption = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type VideoRequestOptionGroup = {
  title: string;
  description: string;
  options: VideoRequestOption[];
};

type VideoAdditionalRequestOptionGroup = {
  title: string;
  description: string;
  options: VideoAdditionalRequestOption[];
};

@Component({
  selector: 'tj-video-modal',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, FallbackImageDirective],
  templateUrl: './video-modal.component.html',
  styleUrl: './video-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoModalComponent implements OnChanges {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly content = inject(PortfolioContentService);
  private readonly mediaPublic = inject(MediaPublicService);
  private readonly serviceRequest = inject(ServiceRequestService);
  readonly defaultCoverImage = 'assets/images/fotos/default-cover.png';
  private readonly packageHeroImageCache = new Map<
    string,
    Observable<string>
  >();

  @Input() video: PortfolioPlaylistVideo | null = null;

  private readonly _videoPackage = signal<VideoServicePackage | null>(null);

  get videoPackage(): VideoServicePackage | null {
    return this._videoPackage();
  }

  @Input()
  set videoPackage(value: VideoServicePackage | null) {
    this._videoPackage.set(value);
  }

  @Output() close = new EventEmitter<void>();

  readonly modalStep = signal<ServiceModalStep>('detail');
  readonly requestMode = signal<RequestMode>('base');
  readonly selectedBaseQuoteId = signal('base');
  readonly requestSelections = signal<Record<string, boolean>>({});
  readonly customerName = signal('');
  readonly customerPhone = signal('');
  readonly eventDate = signal('');
  readonly eventCity = signal('');
  readonly venueName = signal('');
  readonly guestCount = signal('');
  readonly customerNotes = signal('');
  readonly hasAcceptedTerms = signal(false);
  readonly isSubmittingRequest = signal(false);

  readonly baseQuoteOptions = computed<Array<{ id: string; label: string }>>(
    () => {
      const pkg = this.videoPackage;
      if (!pkg) {
        return [];
      }

      return [{ id: 'base', label: this.packagePriceLabel() }];
    },
  );

  readonly selectedBaseQuote = computed<
    { id: string; label: string } | undefined
  >(
    () =>
      this.baseQuoteOptions().find(
        (o) => o.id === this.selectedBaseQuoteId(),
      ) ?? this.baseQuoteOptions()[0],
  );

  readonly requestOptions = computed<VideoRequestOption[]>(() => {
    const pkg = this.videoPackage;
    if (!pkg) {
      return [];
    }

    return [
      ...pkg.features.map((label, index) => ({
        id: `feature-${index}`,
        label,
      })),
      ...pkg.deliverables.map((label, index) => ({
        id: `deliverable-${index}`,
        label,
      })),
    ];
  });

  readonly additionalRequestOptions = computed<VideoAdditionalRequestOption[]>(
    () => {
      const pkg = this.videoPackage;
      if (!pkg) {
        return [];
      }

      return pkg.additionalServices.map((item, index) => ({
        id: `additional-${index}`,
        name: item.name,
        price: item.price,
        description: item.description,
      }));
    },
  );

  readonly detailPrimarySections = computed<ExperienceSection[]>(() => {
    const pkg = this.videoPackage;
    if (!pkg) {
      return [];
    }

    const sections: ExperienceSection[] = [];
    if (pkg.features.length) {
      sections.push({ title: 'Qué incluye', items: pkg.features });
    }

    return sections;
  });

  readonly detailSecondarySections = computed<ExperienceSection[]>(() => {
    const pkg = this.videoPackage;
    if (!pkg) {
      return [];
    }

    const sections: ExperienceSection[] = [];
    if (pkg.deliverables.length) {
      sections.push({ title: 'Entregables', items: pkg.deliverables });
    }

    return sections;
  });

  readonly fixedIncludedGroups = computed<VideoRequestOptionGroup[]>(() => {
    const options = this.requestOptions();
    if (!options.length) {
      return [];
    }

    return [
      {
        title: 'Servicios del paquete',
        description:
          'Características y entregables que componen el servicio de video.',
        options,
      },
    ];
  });

  readonly customAdditionalGroups = computed<
    VideoAdditionalRequestOptionGroup[]
  >(() => {
    const options = this.additionalRequestOptions();
    if (!options.length) {
      return [];
    }

    return [
      {
        title: 'Servicios adicionales',
        description:
          'Elige los adicionales que quieres incluir en tu solicitud.',
        options,
      },
    ];
  });

  readonly selectedAdditionalOptions = computed(() => {
    const selected = this.requestSelections();
    return this.customAdditionalGroups().flatMap((group) =>
      group.options.filter((option) => selected[option.id]),
    );
  });

  readonly selectedIncludedOptions = computed(() => {
    const selected = this.requestSelections();
    return this.fixedIncludedGroups().flatMap((group) =>
      group.options.filter((option) => selected[option.id]),
    );
  });

  readonly requestSummaryServices = computed(() => {
    if (this.requestMode() === 'base') {
      return this.fixedIncludedGroups().flatMap((group) =>
        group.options.map((option) => option.label),
      );
    }

    return this.selectedIncludedOptions().map((option) => option.label);
  });

  readonly requestSummaryAdditionalsDetailed = computed(() =>
    this.selectedAdditionalOptions().map((option) => ({
      name: option.name,
      priceLabel: `${this.formatCop(option.price)} COP`,
      priceAmountCop: option.price,
    })),
  );

  readonly requestTotalLabel = computed(() => {
    if (this.requestMode() !== 'base' || !this.videoPackage) {
      return '';
    }

    const additionalTotal = this.selectedAdditionalOptions().reduce(
      (total, option) => total + option.price,
      0,
    );
    const total = this.videoPackage.price + additionalTotal;
    return `${this.formatCop(total)} COP`;
  });

  readonly requestSubmitLabel = computed(() => {
    if (this.isSubmittingRequest()) {
      return 'Enviando...';
    }

    return this.requestMode() === 'base' ? 'Enviar por WhatsApp' : 'Enviar propuesta';
  });

  readonly canSubmitRequest = computed(
    () =>
      this.hasAcceptedTerms() &&
      this.customerName().trim().length > 1 &&
      this.customerPhone().trim().length > 6 &&
      !this.isSubmittingRequest(),
  );

  readonly requestWhatsappHref = computed(() => {
    const pkg = this.videoPackage;
    if (!pkg) {
      return this.content.whatsappHref();
    }

    const isBase = this.requestMode() === 'base';
    const lines = [
      `Hola TECNOJACK, quiero ${isBase ? 'solicitar' : 'personalizar'} el paquete ${pkg.name}.`,
      '',
      'Tipo de servicio: Video',
      `Solicitud: ${isBase ? 'Usar paquete base' : 'Personalizar paquete'}`,
    ];

    if (this.customerName().trim()) {
      lines.push(`Nombre: ${this.customerName().trim()}`);
    }
    if (this.customerPhone().trim()) {
      lines.push(`Teléfono: ${this.customerPhone().trim()}`);
    }
    if (this.eventCity().trim()) {
      lines.push(`Ciudad: ${this.eventCity().trim()}`);
    }
    if (this.eventDate().trim()) {
      lines.push(`Fecha estimada: ${this.eventDate().trim()}`);
    }
    if (this.venueName().trim()) {
      lines.push(`Locación: ${this.venueName().trim()}`);
    }
    if (this.guestCount().trim()) {
      lines.push(`Participantes: ${this.guestCount().trim()}`);
    }
    if (this.selectedBaseQuote()?.label) {
      lines.push(`Referencia base: ${this.selectedBaseQuote()?.label}`);
    }

    const services = this.requestSummaryServices();
    if (services.length) {
      lines.push('', 'Servicios seleccionados:');
      services.forEach((item) => lines.push(`- ${item}`));
    }

    const additionals = this.requestSummaryAdditionalsDetailed();
    if (additionals.length) {
      lines.push('', 'Adicionales:');
      additionals.forEach((item) =>
        lines.push(`- ${item.name} — ${item.priceLabel}`),
      );
    }

    const totalLabel = this.requestTotalLabel();
    if (totalLabel) {
      lines.push('', `Total estimado: ${totalLabel}`);
    }

    if (pkg.isBasePrice) {
      lines.push(
        '',
        'Nota: Entiendo que el valor final depende de los requerimientos del proyecto.',
      );
    }

    if (this.customerNotes().trim()) {
      lines.push('', `Notas: ${this.customerNotes().trim()}`);
    }

    return this.content.buildWhatsappHref(lines.join('\n'));
  });

  ngOnChanges(changes: SimpleChanges): void {
    if ('videoPackage' in changes) {
      this.resetRequestState();
    }
  }

  get embedUrl(): SafeResourceUrl | null {
    if (!this.video) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${this.video.videoId}?autoplay=1&rel=0&modestbranding=1`,
    );
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.video || this.videoPackage) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.resetRequestState();
    this.close.emit();
  }

  formatCop(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  packagePriceLabel(): string {
    if (!this.videoPackage) {
      return '';
    }

    const value = `$${this.formatCop(this.videoPackage.price)}`;
    return this.videoPackage.isBasePrice ? `Desde ${value}` : value;
  }

  packageHeroImage$(pkg: VideoServicePackage): Observable<string> {
    const folder = this.videoPackageFolder(pkg);
    const cached = this.packageHeroImageCache.get(folder);
    if (cached) {
      return cached;
    }

    const image$ = this.mediaPublic.getRealImage(folder).pipe(
      map((url) => (url ? url : this.defaultCoverImage)),
      startWith(this.defaultCoverImage),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.packageHeroImageCache.set(folder, image$);
    return image$;
  }

  startRequest(mode: RequestMode): void {
    this.requestMode.set(mode);
    this.hasAcceptedTerms.set(false);
    this.modalStep.set('request');
  }

  returnToDetail(): void {
    this.modalStep.set('detail');
  }

  guardRequestSubmit(event: MouseEvent): void {
    console.log('[WA_FLOW][VIDEO_MODAL] click:guard', {
      canSubmitRequest: this.canSubmitRequest(),
      hasAcceptedTerms: this.hasAcceptedTerms(),
      nameLen: this.customerName().trim().length,
      phoneLen: this.customerPhone().trim().length,
      isSubmittingRequest: this.isSubmittingRequest(),
    });

    if (!this.canSubmitRequest()) {
      console.log('[WA_FLOW][VIDEO_MODAL] blocked:invalid-state');
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    console.log('[WA_FLOW][VIDEO_MODAL] allowed:submit-start');
    void this.submitRequest();
  }

  private async submitRequest(): Promise<void> {
    const pkg = this.videoPackage;
    console.log('[WA_FLOW][VIDEO_MODAL] submitRequest', {
      hasPackage: !!pkg,
      canSubmitRequest: this.canSubmitRequest(),
      href: this.requestWhatsappHref(),
    });

    if (!pkg || !this.canSubmitRequest()) {
      console.log('[WA_FLOW][VIDEO_MODAL] blocked:submit-invalid-state');
      return;
    }

    this.isSubmittingRequest.set(true);

    const locationParts = [this.eventCity().trim(), this.venueName().trim()].filter(
      (part) => part.length > 0,
    );
    const summaryLines = [
      `Tipo de servicio: Video`,
      `Modalidad: ${this.requestMode() === 'base' ? 'Paquete base' : 'Personalizado'}`,
      `Servicios: ${this.requestSummaryServices().join(', ') || 'No especificado'}`,
      `Adicionales: ${this.requestSummaryAdditionalsDetailed().map((item) => item.name).join(', ') || 'Ninguno'}`,
      `Total estimado: ${this.requestTotalLabel() || 'A confirmar'}`,
      this.customerNotes().trim() ? `Notas: ${this.customerNotes().trim()}` : '',
    ]
      .filter((line) => line.length > 0)
      .join(' | ');

    try {
      console.log('[WA_FLOW][VIDEO_MODAL] firestore:creating-request');
      await this.serviceRequest.createRequest({
        name: this.customerName(),
        phone: this.customerPhone(),
        service: 'Video',
        package: pkg.name,
        message: summaryLines,
        eventDate: this.eventDate(),
        location: locationParts.join(' - ') || undefined,
      });
      console.log('[WA_FLOW][VIDEO_MODAL] firestore:request-created');
    } catch (error) {
      console.error('No se pudo guardar la solicitud del paquete de video en Firestore', error);
    }

    const href = this.requestWhatsappHref();
    console.log('[WA_FLOW][VIDEO_MODAL] whatsapp:opening', { href });
    const popup = window.open(href, '_blank', 'noopener');
    console.log('[WA_FLOW][VIDEO_MODAL] whatsapp:open-result', {
      opened: !!popup,
      blockedByBrowser: !popup,
    });
    this.isSubmittingRequest.set(false);
    this.closeModal();
  }

  updateRequestMode(mode: RequestMode): void {
    this.requestMode.set(mode);
  }

  updateBaseQuote(id: string): void {
    this.selectedBaseQuoteId.set(id);
  }

  toggleRequestOption(optionId: string, checked: boolean): void {
    this.requestSelections.update((current) => ({
      ...current,
      [optionId]: checked,
    }));
  }

  isOptionSelected(optionId: string): boolean {
    return !!this.requestSelections()[optionId];
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

  private videoPackageFolder(pkg: VideoServicePackage): string {
    return `servicios/video/${this.videoPackageSlug(pkg)}`;
  }

  private videoPackageSlug(pkg: VideoServicePackage): string {
    return pkg.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }

  private resetRequestState(): void {
    this.requestSelections.set({
      ...Object.fromEntries(
        this.requestOptions().map((option) => [option.id, true]),
      ),
      ...Object.fromEntries(
        this.additionalRequestOptions().map((option) => [option.id, false]),
      ),
    });
    this.modalStep.set('detail');
    this.requestMode.set('base');
    this.selectedBaseQuoteId.set('base');
    this.customerName.set('');
    this.customerPhone.set('');
    this.eventDate.set('');
    this.eventCity.set('');
    this.venueName.set('');
    this.guestCount.set('');
    this.customerNotes.set('');
    this.hasAcceptedTerms.set(false);
    this.isSubmittingRequest.set(false);
  }
}
