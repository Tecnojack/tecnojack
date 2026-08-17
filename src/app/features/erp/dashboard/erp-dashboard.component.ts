import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faBatteryQuarter,
  faBoxOpen,
  faBullseye,
  faCalendarAlt,
  faCamera,
  faChartLine,
  faCheckCircle,
  faCircleInfo,
  faClock,
  faDollarSign,
  faExclamationTriangle,
  faFilm,
  faPlus,
  faUserGroup,
  faUserPlus,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tj-erp-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './erp-dashboard.component.html',
  styleUrl: './erp-dashboard.component.scss'
})
export class ErpDashboardComponent {
  readonly currentDate = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  readonly icons = {
    film: faFilm,
    package: faBoxOpen,
    users: faUserGroup,
    userPlus: faUserPlus,
    clock: faClock,
    trendingUp: faChartLine,
    arrowRight: faArrowRight,
    calendar: faCalendarAlt,
    dollar: faDollarSign,
    warning: faExclamationTriangle,
    alert: faCircleInfo,
    check: faCheckCircle,
    battery: faBatteryQuarter,
    plus: faPlus,
    bullseye: faBullseye,
    camera: faCamera
  };

  readonly stats = [
    { label: 'Producciones Activas', value: '12', trend: '+3 este mes', color: '#6366f1', icon: faFilm },
    { label: 'Equipos Registrados', value: '234', trend: '12 en uso hoy', color: '#14b8a6', icon: faBoxOpen },
    { label: 'Miembros del Equipo', value: '18', trend: '3 en rodaje', color: '#f59e0b', icon: faUserGroup },
    { label: 'Rodajes Próximos', value: '7', trend: 'Próximo: Mañana', color: '#ec4899', icon: faClock }
  ];

  readonly recentProductions = signal([
    { id: '1', name: 'Boda Martínez & Ospina', client: 'Laura Martínez', status: 'En Progreso', date: '2026-08-24', progress: 65 },
    { id: '2', name: 'Lanzamiento Nike Colombia', client: 'Nike Corp', status: 'Planificación', date: '2026-08-31', progress: 40 },
    { id: '3', name: 'Video Musical — Maluma', client: 'Sony Music', status: 'Postproducción', date: '2026-09-07', progress: 85 },
    { id: '4', name: 'Quince años — Isabella Cano', client: 'Familia Cano', status: 'Completado', date: '2026-09-14', progress: 100 }
  ]);

  readonly upcomingEvents = signal([
    { id: 'E001', name: 'Boda Martínez & Ospina', date: '24 Ago 2026', status: 'Confirmado', type: 'Boda' },
    { id: 'E002', name: 'Lanzamiento Nike Colombia', date: '31 Ago 2026', status: 'En producción', type: 'Corporativo' },
    { id: 'E003', name: 'Video Musical — Maluma', date: '07 Sep 2026', status: 'Pre-producción', type: 'Video' },
    { id: 'E004', name: 'Quince años — Isabella Cano', date: '14 Sep 2026', status: 'Cotizado', type: 'Quinces' }
  ]);

  readonly hotPipeline = signal([
    { id: 'OP001', title: 'Boda Rodríguez & Peña', stage: 'Nuevo lead', value: 9200000, prob: 20 },
    { id: 'OP002', title: 'Sesión Marca Bancolombia', stage: 'Propuesta enviada', value: 22000000, prob: 60 },
    { id: 'OP003', title: 'Campaña Coca-Cola', stage: 'Negociación', value: 38000000, prob: 75 },
    { id: 'OP004', title: 'Video Institucional EPM', stage: 'Calificado', value: 14500000, prob: 50 }
  ]);

  readonly pendingPayments = signal([
    { id: 'P001', event: 'Boda Martínez & Ospina', client: 'Laura Martínez', pendingAmount: 4250000, dueDate: '2026-08-20', status: 'Parcial' },
    { id: 'P003', event: 'Video Musical Maluma', client: 'Sony Music', pendingAmount: 16666667, dueDate: '2026-09-01', status: 'Parcial' },
    { id: 'P004', event: 'Quince Isabella Cano', client: 'Familia Cano', pendingAmount: 4200000, dueDate: '2026-08-10', status: 'Vencido' }
  ]);

  readonly equipmentAlerts = signal([
    { id: '1', item: 'Sony A7S III #2', issue: 'Batería críticamente baja (12%)', priority: 'high' },
    { id: '2', item: 'DJI Ronin RS3', issue: 'Mantenimiento preventivo pendiente', priority: 'medium' },
    { id: '3', item: 'SanDisk 256GB #7', issue: 'Memoria casi llena (94%)', priority: 'low' }
  ]);

  get overduePayments() {
    return this.pendingPayments().filter((payment) => payment.status === 'Vencido');
  }

  get overdueTotal(): number {
    return this.overduePayments.reduce((total, payment) => total + payment.pendingAmount, 0);
  }

  get pendingTotal(): number {
    return this.pendingPayments().reduce((total, payment) => total + payment.pendingAmount, 0);
  }

  get pipelineTotal(): number {
    return this.hotPipeline().reduce((total, opportunity) => total + opportunity.value, 0);
  }

  constructor(private readonly router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([`/app/${path}`]);
  }
}
