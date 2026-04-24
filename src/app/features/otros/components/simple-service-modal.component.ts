import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { MediaPublicService } from '../../../shared/media/media-public.service';
import { TjImageFallbackPipe } from '../../../shared/media/tj-image-fallback.pipe';
import { ServiceRequestService } from '../../../services/service-request.service';
import { SimpleService, SimpleServiceAddOn } from '../models/simple-service.model';

const PHONE = '573145406467';

export interface SimpleServiceInquiryForm {
  name: string;
  phone: string;
  eventDate: string;
  location: string;
  message: string;
}

@Component({
  selector: 'tj-simple-service-modal',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, FormsModule, FallbackImageDirective, TjImageFallbackPipe],
  templateUrl: './simple-service-modal.component.html',
  styleUrl: './simple-service-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleServiceModalComponent implements OnChanges {
  private readonly mediaPublic = inject(MediaPublicService);
  private readonly serviceRequest = inject(ServiceRequestService);

  @Input() service: SimpleService | null = null;
  @Output() closeModal = new EventEmitter<void>();

  form: SimpleServiceInquiryForm = {
    name: '',
    phone: '',
    eventDate: '',
    location: '',
    message: ''
  };
  selectedAddOnIds = new Set<string>();
  coverImage$: Observable<string> = of('');
  isSubmitting = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['service'] && changes['service'].currentValue) {
      this.form = { name: '', phone: '', eventDate: '', location: '', message: '' };
      this.selectedAddOnIds = new Set<string>();
      this.coverImage$ = this.resolveCoverImage();
      this.isSubmitting = false;
    }
  }

  get isFormValid(): boolean {
    return this.form.name.trim().length > 1 && this.form.phone.trim().length > 6;
  }

  close(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('ssm__backdrop')) {
      this.close();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByAddOn(_: number, addOn: SimpleServiceAddOn): string {
    return addOn.id;
  }

  get selectedAddOns(): SimpleServiceAddOn[] {
    return (this.service?.addOns ?? []).filter((addOn) => this.selectedAddOnIds.has(addOn.id));
  }

  get totalPrice(): number {
    return (this.service?.basePrice ?? 0) + this.selectedAddOns.reduce((sum, addOn) => sum + (addOn.price ?? 0), 0);
  }

  get totalPriceLabel(): string {
    return `$${this.formatCop(this.totalPrice)} COP`;
  }

  get selectedIncludes(): string[] {
    return [
      ...(this.service?.includes ?? []),
      ...this.selectedAddOns.map((addOn) => `+ ${addOn.label}`)
    ];
  }

  isAddOnSelected(addOnId: string): boolean {
    return this.selectedAddOnIds.has(addOnId);
  }

  toggleAddOn(addOnId: string): void {
    const next = new Set(this.selectedAddOnIds);

    if (next.has(addOnId)) {
      next.delete(addOnId);
    } else {
      next.add(addOnId);
    }

    this.selectedAddOnIds = next;
  }

  formatCop(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  async sendWhatsApp(): Promise<void> {
    console.log('[WA_FLOW][SIMPLE_MODAL] click:sendWhatsApp', {
      hasService: !!this.service,
      isFormValid: this.isFormValid,
      isSubmitting: this.isSubmitting,
      nameLen: this.form.name.trim().length,
      phoneLen: this.form.phone.trim().length,
    });

    if (!this.service || !this.isFormValid || this.isSubmitting) {
      console.log('[WA_FLOW][SIMPLE_MODAL] blocked:invalid-state');
      return;
    }

    this.isSubmitting = true;

    const selectedAddOnLines = this.selectedAddOns.length
      ? this.selectedAddOns.map((addOn) => `- ${addOn.label}: ${addOn.priceLabel}`)
      : ['- Ninguno'];

    const includeLines = this.selectedIncludes.map((item) => `- ${item}`);

    const text = [
      `Hola Jackson, quiero cotizar este servicio:`,
      ``,
      `*${this.service.name}*`,
      ``,
      `Nombre: ${this.form.name}`,
      `WhatsApp: ${this.form.phone}`,
      `Servicio: ${this.service.name}`,
      `Fecha del evento: ${this.form.eventDate.trim() || 'No definida'}`,
      `Ubicación: ${this.form.location.trim() || 'No definida'}`,
      `Precio base: ${this.service.priceLabel}`,
      `Total estimado: ${this.totalPriceLabel}`,
      ``,
      `Incluye:`,
      ...includeLines,
      ``,
      `Adicionales seleccionados:`,
      ...selectedAddOnLines,
      ``,
      `Detalles:`,
      this.form.message.trim() || '(sin detalles adicionales)'
    ].join('\n');

    const detailsMessage = [
      this.form.message.trim(),
      `Adicionales: ${this.selectedAddOns.map((addOn) => addOn.label).join(', ') || 'Ninguno'}`,
      `Incluye: ${this.selectedIncludes.join(', ')}`,
      `Total estimado: ${this.totalPriceLabel}`
    ]
      .filter((line) => line && line.trim().length)
      .join(' | ');

    try {
      console.log('[WA_FLOW][SIMPLE_MODAL] firestore:creating-request');
      await this.serviceRequest.createRequest({
        name: this.form.name,
        phone: this.form.phone,
        service: this.service.name,
        package: this.service.id,
        message: detailsMessage,
        eventDate: this.form.eventDate,
        location: this.form.location
      });
      console.log('[WA_FLOW][SIMPLE_MODAL] firestore:request-created');
    } catch (error) {
      console.error('No se pudo guardar la solicitud en Firestore', error);
    }

    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
    console.log('[WA_FLOW][SIMPLE_MODAL] whatsapp:opening', { url });
    const popup = window.open(url, '_blank', 'noopener,noreferrer');
    console.log('[WA_FLOW][SIMPLE_MODAL] whatsapp:open-result', {
      opened: !!popup,
      blockedByBrowser: !popup,
    });
    this.isSubmitting = false;
  }

  private resolveCoverImage(): Observable<string> {
    if (!this.service) {
      return of('');
    }

    return this.mediaPublic.getRealImage(
      `servicios/otros/${this.service.category}/${this.service.id}`,
    );
  }
}
