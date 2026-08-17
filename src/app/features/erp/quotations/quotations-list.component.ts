import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faClock,
  faFileDownload,
  faFileInvoice,
  faPlus,
  faSearch,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

interface Quotation {
  id: string;
  code: string;
  clientName: string;
  servicePackage: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'expired';
  createdAt: string;
  expiresAt: string;
}

@Component({
  selector: 'tj-quotations-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './quotations-list.component.html',
  styleUrl: './quotations-list.component.scss'
})
export class QuotationsListComponent {
  readonly icons = {
    invoice: faFileInvoice,
    plus: faPlus,
    search: faSearch,
    download: faFileDownload,
    check: faCheckCircle,
    clock: faClock,
    times: faTimesCircle
  };

  readonly filterSearch = signal('');
  readonly statusFilter = signal<'all' | Quotation['status']>('all');

  readonly quotations = signal<Quotation[]>([
    { id: '1', code: 'COT-2026-008', clientName: 'Carolina & Mateo', servicePackage: 'Boda Magistral + Drone + DKA', amount: 8500000, status: 'sent', createdAt: '2026-08-01', expiresAt: '2026-08-20' },
    { id: '2', code: 'COT-2026-007', clientName: 'Valentina & Alejandro', servicePackage: 'Boda Destino Cartagena', amount: 14000000, status: 'sent', createdAt: '2026-08-05', expiresAt: '2026-08-25' },
    { id: '3', code: 'COT-2026-006', clientName: 'Lucía XV Años', servicePackage: 'Quinceañero Luxury VIP', amount: 5200000, status: 'accepted', createdAt: '2026-07-28', expiresAt: '2026-08-15' },
    { id: '4', code: 'COT-2026-005', clientName: 'Mariana & Daniel', servicePackage: 'Boda Esencial 8 Horas', amount: 6200000, status: 'accepted', createdAt: '2026-07-20', expiresAt: '2026-08-05' },
    { id: '5', code: 'COT-2026-004', clientName: 'Sofía & Andrés', servicePackage: 'Preboda + Boda Estándar', amount: 4800000, status: 'expired', createdAt: '2026-06-15', expiresAt: '2026-07-01' }
  ]);

  readonly filteredQuotations = computed(() => {
    const query = this.filterSearch().toLowerCase().trim();
    const st = this.statusFilter();
    return this.quotations().filter((q) => {
      const matchSearch = !query || q.clientName.toLowerCase().includes(query) || q.code.toLowerCase().includes(query);
      const matchStatus = st === 'all' || q.status === st;
      return matchSearch && matchStatus;
    });
  });

  readonly totalValueAccepted = computed(() =>
    this.quotations()
      .filter((q) => q.status === 'accepted')
      .reduce((sum, q) => sum + q.amount, 0)
  );

  readonly totalValueSent = computed(() =>
    this.quotations()
      .filter((q) => q.status === 'sent')
      .reduce((sum, q) => sum + q.amount, 0)
  );
}
