import { DOCUMENT, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { ContactSectionComponent } from '../sections/contact-section.component';

const copFormatter = new Intl.NumberFormat('es-CO');
type RequestMode = 'base' | 'custom';

@Component({
  selector: 'tj-portfolio-package-detail-page',
  standalone: true,
  imports: [NgFor, NgIf, PortfolioShellComponent, ContactSectionComponent, RevealOnScrollDirective, FallbackImageDirective],
  templateUrl: './portfolio-package-detail-page.component.html',
  styleUrl: './portfolio-package-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioPackageDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly content = inject(PortfolioContentService);

  readonly isRequestModalOpen = signal(false);
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
  private readonly routeData = toSignal(this.route.data, { initialValue: this.route.snapshot.data as Data });
  private readonly routeParams = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  readonly packageDetail = computed(() => {
    const category = this.routeData()['category'] as string | undefined;
    const slug = this.routeParams().get('package');
    return this.content.getPackageDetail(category, slug);
  });

  readonly shellSubtitle = computed(() => this.packageDetail()?.categoryLabel ?? 'Portafolio');
  readonly footerText = computed(() => {
    const detail = this.packageDetail();
    return detail
      ? `TECNOJACK Studio · ${detail.categoryLabel} · ${detail.title}.`
      : 'TECNOJACK Studio · fotografía y cine para celebraciones especiales.';
  });

  readonly selectedRequestItems = computed(() => {
    if (this.requestMode() === 'base') {
      return this.fixedIncludedGroups().flatMap((group) => group.options.map((option) => option.label));
    }

    return [...this.selectedIncludedOptions(), ...this.selectedAdditionalOptions()].map((option) => option.label);
  });

  readonly selectedBaseQuote = computed(() => {
    const detail = this.packageDetail();

    if (!detail) {
      return undefined;
    }

    return detail.baseQuoteOptions.find((option) => option.id === this.selectedBaseQuoteId()) ?? detail.baseQuoteOptions[0];
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
      .flatMap((group) => group.options.filter((option) => selected[option.id]));
  });

  readonly selectedIncludedOptions = computed(() => {
    const selected = this.requestSelections();

    return this.fixedIncludedGroups().flatMap((group) =>
      group.options.filter((option) => selected[option.id])
    );
  });

  readonly additionalServicesTotalCop = computed(() =>
    this.selectedAdditionalOptions().reduce((total, option) => total + (option.priceAmountCop ?? 0), 0)
  );

  readonly estimatedTotalCop = computed(() => {
    const baseAmount = this.selectedBaseQuote()?.amountCop;

    if (baseAmount === undefined) {
      return undefined;
    }

    return baseAmount + this.additionalServicesTotalCop();
  });

  readonly fixedIncludedGroups = computed(() =>
    this.packageDetail()?.requestOptionGroups.filter((group) => !group.selectable) ?? []
  );

  readonly customAdditionalGroups = computed(() =>
    this.packageDetail()?.requestOptionGroups.filter((group) => group.selectable) ?? []
  );

  readonly isBaseRequestMode = computed(() => this.requestMode() === 'base');
  readonly isCustomRequestMode = computed(() => this.requestMode() === 'custom');

  readonly requestWhatsappHref = computed(() => {
    const detail = this.packageDetail();

    if (!detail) {
      return '/portfolio';
    }

    const lines = [
      `Hola TECNOJACK, quiero solicitar el paquete ${detail.title}.`,
      '',
      `Categoría: ${detail.categoryLabel}`,
      `Modalidad: ${this.requestMode() === 'base' ? 'Paquete base' : 'Cotización personalizada'}`
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
      lines.push(`Adicionales seleccionados: ${this.formatCop(additionalTotal)}`);
    }

    const total = this.estimatedTotalCop();

    if (total !== undefined) {
      lines.push(`Total estimado: ${this.formatCop(total)}`);
    }

    if (this.customerNotes().trim()) {
      lines.push('', `Notas: ${this.customerNotes().trim()}`);
    }

    return this.content.buildWhatsappHref(lines.join('\n'));
  });

  constructor() {
    effect(() => {
      const detail = this.packageDetail();

      if (!detail) {
        this.title.setTitle('Paquete no encontrado | TECNOJACK');
        this.meta.updateTag({
          name: 'description',
          content: 'El paquete solicitado no está disponible. Explora las categorías del portafolio de TECNOJACK.'
        });
        return;
      }

      this.requestSelections.set(
        Object.fromEntries(
          detail.requestOptionGroups.flatMap((group) =>
            group.options.map((option) => [option.id, group.selectable ? option.selectedByDefault === true : true])
          )
        )
      );
      this.selectedBaseQuoteId.set(
        detail.baseQuoteOptions.find((option) => option.selectedByDefault !== false)?.id ?? detail.baseQuoteOptions[0]?.id ?? ''
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
      this.title.setTitle(`${detail.title} | ${detail.categoryLabel} | TECNOJACK`);
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

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isRequestModalOpen()) {
      this.closeRequestModal();
    }
  }

  openRequestModal(): void {
    this.hasAcceptedTerms.set(false);
    this.isRequestModalOpen.set(true);
  }

  closeRequestModal(): void {
    this.isRequestModalOpen.set(false);
    this.hasAcceptedTerms.set(false);
  }

  guardRequestSubmit(event: MouseEvent): void {
    if (this.hasAcceptedTerms()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
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
      [optionId]: checked
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
