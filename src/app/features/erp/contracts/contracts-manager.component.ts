import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faFileContract, faFileDownload, faPlus, faSignature } from '@fortawesome/free-solid-svg-icons';

@Component({ selector: 'tj-contracts-manager', standalone: true, imports: [CommonModule, FontAwesomeModule], templateUrl: './contracts-manager.component.html', styleUrl: './contracts-manager.component.scss' })
export class ContractsManagerComponent {
  readonly icons = { contract: faFileContract, signature: faSignature, check: faCheckCircle, download: faFileDownload, plus: faPlus };
  readonly contracts = signal([
    { code: 'CTR-2026-004', client: 'Carolina & Mateo', type: 'Cobertura Fotografía y Video', event: 'Boda Carolina & Mateo', value: 8500000, signedAt: '2026-07-15', status: 'signed' },
    { code: 'CTR-2026-003', client: 'Valentina & Alejandro', type: 'Boda Destino', event: 'Boda Destino Cartagena', value: 14000000, signedAt: '2026-07-28', status: 'signed' },
    { code: 'CTR-2026-002', client: 'Lucía XV', type: 'Evento Quinceañero', event: 'Quinceañero Lucía', value: 5200000, signedAt: 'Pendiente', status: 'pending' }
  ]);
}
