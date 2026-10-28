import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBullseye,
  faCalendarCheck,
  faDollarSign,
  faFilter,
  faPlus,
  faSearch,
  faUserTie,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';

interface Deal {
  id: string;
  clientName: string;
  eventType: string;
  value: number;
  stage: 'lead' | 'contacted' | 'proposal' | 'won' | 'lost';
  assignedTo: string;
  expectedDate: string;
}

@Component({
  selector: 'tj-pipeline-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './pipeline-kanban.component.html',
  styleUrl: './pipeline-kanban.component.scss'
})
export class PipelineKanbanComponent {
  readonly icons = {
    bullseye: faBullseye,
    dollar: faDollarSign,
    calendar: faCalendarCheck,
    filter: faFilter,
    plus: faPlus,
    search: faSearch,
    user: faUserTie,
    more: faEllipsisV
  };

  readonly searchFilter = signal('');
  readonly deals = signal<Deal[]>([
    { id: '1', clientName: 'Carolina & Mateo', eventType: 'Boda Premium', value: 8500000, stage: 'proposal', assignedTo: 'Jackson Palacios', expectedDate: '2026-11-14' },
    { id: '2', clientName: 'Valentina & Alejandro', eventType: 'Boda Destino', value: 14000000, stage: 'contacted', assignedTo: 'Jackson Palacios', expectedDate: '2026-12-05' },
    { id: '3', clientName: 'Sofi & Andrés', eventType: 'Preboda + Boda', value: 6800000, stage: 'lead', assignedTo: 'Equipo Ventas', expectedDate: '2026-10-20' },
    { id: '4', clientName: 'Lucía XV Años', eventType: 'Quinceañero Luxury', value: 5200000, stage: 'won', assignedTo: 'Jackson Palacios', expectedDate: '2026-09-18' },
    { id: '5', clientName: 'Camila & Felipe', eventType: 'Boda Elopement', value: 4500000, stage: 'proposal', assignedTo: 'Equipo Ventas', expectedDate: '2026-11-28' },
    { id: '6', clientName: 'Mariana & Daniel', eventType: 'Boda Full Day', value: 9200000, stage: 'won', assignedTo: 'Jackson Palacios', expectedDate: '2026-10-10' }
  ]);

  readonly columns = [
    { id: 'lead', title: 'Nuevos Leads', color: '#3b82f6' },
    { id: 'contacted', title: 'Contactados', color: '#8b5cf6' },
    { id: 'proposal', title: 'Propuesta Enviada', color: '#f59e0b' },
    { id: 'won', title: 'Cerrado / Ganado', color: '#10b981' },
    { id: 'lost', title: 'Perdido', color: '#ef4444' }
  ];

  readonly totalPipelineValue = computed(() =>
    this.deals().reduce((acc, d) => acc + d.value, 0)
  );

  readonly dealsByStage = computed(() => {
    const search = this.searchFilter().toLowerCase().trim();
    const list = this.deals().filter((d) =>
      !search || d.clientName.toLowerCase().includes(search) || d.eventType.toLowerCase().includes(search)
    );

    const map: Record<string, Deal[]> = {
      lead: [],
      contacted: [],
      proposal: [],
      won: [],
      lost: []
    };

    list.forEach((d) => map[d.stage]?.push(d));
    return map;
  });

  moveStage(dealId: string, targetStage: Deal['stage']): void {
    this.deals.update((list) =>
      list.map((d) => (d.id === dealId ? { ...d, stage: targetStage } : d))
    );
  }
}
