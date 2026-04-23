import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
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
  imports: [NgIf, NgFor, FallbackImageDirective],
  templateUrl: './video-modal.component.html',
  styleUrl: './video-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoModalComponent implements OnChanges {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly content = inject(PortfolioContentService);

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

  readonly baseQuoteOptions = computed<Array<{ id: string; label: string }>>(() => {
    const pkg = this.videoPackage;
    if (!pkg) {
      return [];
    }

    return [{ id: 'base', label: this.packagePriceLabel() }];
  });

  readonly selectedBaseQuote = computed<{ id: string; label: string } | undefined>(() =>
    this.baseQuoteOptions().find((o) => o.id === this.selectedBaseQuoteId()) ?? this.baseQuoteOptions()[0]
  );

  readonly requestOptions = computed<VideoRequestOption[]>(() => {
    const pkg = this.videoPackage;
    if (!pkg) {
      return [];
    }

    return [
      ...pkg.features.map((label, index) => ({ id: `feature-${index}`, label })),
      ...pkg.deliverables.map((label, index) => ({ id: `deliverable-${index}`, label }))
    ];
  });

  readonly additionalRequestOptions = computed<VideoAdditionalRequestOption[]>(() => {
    const pkg = this.videoPackage;
    if (!pkg) {
      return [];
    }

    return pkg.additionalServices.map((item, index) => ({
      id: `additional-${index}`,
      name: item.name,
      price: item.price,
      description: item.description
    }));
  });

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
        description: 'Características y entregables que componen el servicio de video.',
        options
      }
    ];
  });

  readonly customAdditionalGroups = computed<VideoAdditionalRequestOptionGroup[]>(() => {
    const options = this.additionalRequestOptions();
    if (!options.length) {
      return [];
    }

    return [
      {
        title: 'Servicios adicionales',
        description: 'Elige los adicionales que quieres incluir en tu solicitud.',
        options
      }
    ];
  });

  readonly selectedAdditionalOptions = computed(() => {
    const selected = this.requestSelections();
    return this.customAdditionalGroups().flatMap((group) => group.options.filter((option) => selected[option.id]));
  });

  readonly selectedIncludedOptions = computed(() => {
    const selected = this.requestSelections();
    return this.fixedIncludedGroups().flatMap((group) => group.options.filter((option) => selected[option.id]));
  });

  readonly requestSummaryServices = computed(() => {
    if (this.requestMode() === 'base') {
      return this.fixedIncludedGroups().flatMap((group) => group.options.map((option) => option.label));
    }

    return this.selectedIncludedOptions().map((option) => option.label);
  });

  readonly requestSummaryAdditionalsDetailed = computed(() =>
    this.selectedAdditionalOptions().map((option) => ({
      name: option.name,
      priceLabel: `${this.formatCop(option.price)} COP`,
      priceAmountCop: option.price
    }))
  );

  readonly requestTotalLabel = computed(() => {
    if (this.requestMode() !== 'base' || !this.videoPackage) {
      return '';
    }

    const additionalTotal = this.selectedAdditionalOptions().reduce((total, option) => total + option.price, 0);
    const total = this.videoPackage.price + additionalTotal;
    return `${this.formatCop(total)} COP`;
  });

  readonly requestSubmitLabel = computed(() => (this.requestMode() === 'base' ? 'Enviar por WhatsApp' : 'Enviar propuesta'));

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
      `Solicitud: ${isBase ? 'Usar paquete base' : 'Personalizar paquete'}`
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
      additionals.forEach((item) => lines.push(`- ${item.name} — ${item.priceLabel}`));
    }

    const totalLabel = this.requestTotalLabel();
    if (totalLabel) {
      lines.push('', `Total estimado: ${totalLabel}`);
    }

    if (pkg.isBasePrice) {
      lines.push('', 'Nota: Entiendo que el valor final depende de los requerimientos del proyecto.');
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
      `https://www.youtube-nocookie.com/embed/${this.video.videoId}?autoplay=1&rel=0&modestbranding=1`
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

  packageHeroImage(pkg: VideoServicePackage): string {
    switch (pkg.name) {
      case 'Video Esencial':
        return 'assets/images/galery/M&D-29.jpg';
      case 'Video Pro':
        return 'assets/images/galery/M&D-19.jpg';
      case 'Video Cinemático':
        return 'assets/images/galery/M&D-23.jpg';
      case 'Video Personalizado':
        return 'assets/images/galery/M&D-32.jpg';
      case 'Video Cortometraje':
        return 'assets/images/galery/M&D-18.jpg';
      default:
        return 'assets/images/fotos/main.jpg';
    }
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
    if (this.hasAcceptedTerms()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
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
      [optionId]: checked
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

  private resetRequestState(): void {
    this.requestSelections.set(
      {
        ...Object.fromEntries(this.requestOptions().map((option) => [option.id, true])),
        ...Object.fromEntries(this.additionalRequestOptions().map((option) => [option.id, false]))
      }
    );
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
  }
}
