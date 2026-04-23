import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SimpleService, SimpleServiceAddOn } from '../models/simple-service.model';

const PHONE = '573145406467';

export interface SimpleServiceInquiryForm {
  name: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'tj-simple-service-modal',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './simple-service-modal.component.html',
  styleUrl: './simple-service-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleServiceModalComponent implements OnChanges {
  @Input() service: SimpleService | null = null;
  @Output() closeModal = new EventEmitter<void>();

  form: SimpleServiceInquiryForm = { name: '', phone: '', message: '' };
  selectedAddOnIds = new Set<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['service'] && changes['service'].currentValue) {
      this.form = { name: '', phone: '', message: '' };
      this.selectedAddOnIds = new Set<string>();
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

  sendWhatsApp(): void {
    if (!this.service || !this.isFormValid) return;

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

    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
