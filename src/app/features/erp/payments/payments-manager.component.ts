import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCreditCard, faDollarSign, faFileInvoice, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({ selector: 'tj-payments-manager', standalone: true, imports: [CommonModule, FontAwesomeModule], templateUrl: './payments-manager.component.html', styleUrl: './payments-manager.component.scss' })
export class PaymentsManagerComponent {
  readonly icons = { card: faCreditCard, dollar: faDollarSign, invoice: faFileInvoice, plus: faPlus };
  readonly payments = signal([
    { code: 'PAY-0091', client: 'Carolina & Mateo', concept: 'Boda Carolina & Mateo', total: 8500000, paid: 4250000, date: '2026-11-10', status: 'partial' },
    { code: 'PAY-0092', client: 'Valentina & Alejandro', concept: 'Boda Destino Cartagena', total: 14000000, paid: 4200000, date: '2026-10-28', status: 'partial' },
    { code: 'PAY-0093', client: 'Lucía XV', concept: 'Quinceañero Lucía', total: 5200000, paid: 5200000, date: '2026-09-10', status: 'paid' },
    { code: 'PAY-0094', client: 'Mariana & Daniel', concept: 'Boda Mariana & Daniel', total: 6200000, paid: 2000000, date: '2026-08-10', status: 'overdue' }
  ]);
}
