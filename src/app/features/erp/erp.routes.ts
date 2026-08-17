import { Routes } from '@angular/router';

import { ERP_IDENTITY_PORT } from '../../core/auth/erp-identity.port';
import { ErpIdentityFacade } from '../../core/auth/erp-identity.facade';
import { FirebaseErpIdentityAdapter } from '../../core/auth/firebase-erp-identity.adapter';

export const ERP_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: ERP_IDENTITY_PORT, useExisting: FirebaseErpIdentityAdapter },
      ErpIdentityFacade
    ],
    loadComponent: () =>
      import('./shell/erp-shell.component').then((m) => m.ErpShellComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        title: 'Dashboard | TECNOJACK ERP',
        loadComponent: () =>
          import('./dashboard/erp-dashboard.component').then(
            (m) => m.ErpDashboardComponent
          )
      },
      {
        path: 'people',
        title: 'Personas y Clientes | TECNOJACK ERP',
        loadComponent: () =>
          import('./people/people-directory.component').then(
            (m) => m.PeopleDirectoryComponent
          )
      },
      {
        path: 'pipeline',
        title: 'Pipeline CRM | TECNOJACK ERP',
        loadComponent: () =>
          import('./pipeline/pipeline-kanban.component').then(
            (m) => m.PipelineKanbanComponent
          )
      },
      {
        path: 'quotations',
        title: 'Cotizaciones | TECNOJACK ERP',
        loadComponent: () =>
          import('./quotations/quotations-list.component').then(
            (m) => m.QuotationsListComponent
          )
      },
      {
        path: 'events',
        title: 'Eventos | TECNOJACK ERP',
        loadComponent: () =>
          import('./events/events-list.component').then(
            (m) => m.EventsListComponent
          )
      },
      {
        path: 'production',
        title: 'Producción Workspace | TECNOJACK ERP',
        loadComponent: () =>
          import('./production/production-workspace.component').then(
            (m) => m.ProductionWorkspaceComponent
          )
      },
      {
        path: 'crew',
        title: 'Equipo & Crew | TECNOJACK ERP',
        loadComponent: () =>
          import('./crew/crew-management.component').then(
            (m) => m.CrewManagementComponent
          )
      },
      {
        path: 'equipment',
        title: 'Inventario de Equipamiento | TECNOJACK ERP',
        loadComponent: () =>
          import('./equipment/equipment-inventory.component').then(
            (m) => m.EquipmentInventoryComponent
          )
      },
      {
        path: 'media',
        title: 'Media Library | TECNOJACK ERP',
        loadComponent: () =>
          import('./media/media-library.component').then(
            (m) => m.MediaLibraryComponent
          )
      },
      {
        path: 'galleries',
        title: 'Galerías de Clientes | TECNOJACK ERP',
        loadComponent: () =>
          import('./galleries/galleries-manager.component').then(
            (m) => m.GalleriesManagerComponent
          )
      },
      {
        path: 'deliverables',
        title: 'Entregables | TECNOJACK ERP',
        loadComponent: () =>
          import('./deliverables/deliverables-tracker.component').then(
            (m) => m.DeliverablesTrackerComponent
          )
      },
      {
        path: 'contracts',
        title: 'Contratos | TECNOJACK ERP',
        loadComponent: () =>
          import('./contracts/contracts-manager.component').then(
            (m) => m.ContractsManagerComponent
          )
      },
      {
        path: 'payments',
        title: 'Control de Pagos | TECNOJACK ERP',
        loadComponent: () =>
          import('./payments/payments-manager.component').then(
            (m) => m.PaymentsManagerComponent
          )
      },
      {
        path: 'invitations',
        title: 'Invitaciones Digitales | TECNOJACK ERP',
        loadComponent: () =>
          import('./invitations/invitations-manager.component').then(
            (m) => m.InvitationsManagerComponent
          )
      },
      {
        path: 'portal',
        title: 'Portal Cliente | TECNOJACK ERP',
        loadComponent: () =>
          import('./portal/client-portal.component').then(
            (m) => m.ClientPortalComponent
          )
      },
      {
        path: 'admin',
        title: 'Administración | TECNOJACK ERP',
        loadComponent: () =>
          import('./admin/erp-admin.component').then(
            (m) => m.ErpAdminComponent
          )
      },
      {
        path: 'settings',
        title: 'Configuración | TECNOJACK ERP',
        loadComponent: () =>
          import('./settings/erp-settings.component').then(
            (m) => m.ErpSettingsComponent
          )
      }
    ]
  }
];
