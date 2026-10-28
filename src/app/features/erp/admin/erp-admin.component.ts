import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDatabase, faKey, faLock, faPlus, faShieldAlt, faUsers, faUserShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tj-erp-admin',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './erp-admin.component.html',
  styleUrl: './erp-admin.component.scss'
})
export class ErpAdminComponent {
  readonly activeTab = signal<'users' | 'roles' | 'audit' | 'system'>('users');
  readonly users = signal([
    { name: 'Daniela Restrepo', email: 'daniela@tecnojack.co', role: 'Owner', status: 'Activo', last: 'hace 2 h' },
    { name: 'Juan Pablo Vélez', email: 'jvelez@tecnojack.co', role: 'Photographer', status: 'Activo', last: 'hace 4 h' },
    { name: 'Andrés Mejía', email: 'amejia@tecnojack.co', role: 'Editor', status: 'Activo', last: 'hace 1 d' },
    { name: 'Valentina Castro', email: 'vcastro@tecnojack.co', role: 'Producer', status: 'Inactivo', last: 'hace 1 sem' }
  ]);
  readonly icons = {
    shield: faShieldAlt,
    userShield: faUserShield,
    users: faUsers,
    key: faKey,
    db: faDatabase,
    lock: faLock,
    plus: faPlus
  };

  readonly rolesList = signal([
    { role: 'Owner', usersCount: 1, permissions: 'Acceso Total Plataforma', color: '#ffb800' },
    { role: 'Sales', usersCount: 2, permissions: 'CRM, Pipeline, Cotizaciones', color: '#39bdd1' },
    { role: 'Finance', usersCount: 1, permissions: 'Facturación, Pagos, Contratos', color: '#2ead6b' },
    { role: 'Producer', usersCount: 3, permissions: 'Eventos, Call Sheet, Crew', color: '#8b5cf6' },
    { role: 'Photographer', usersCount: 6, permissions: 'Rodaje, Media Asset Upload', color: '#ec4899' }
  ]);
}
