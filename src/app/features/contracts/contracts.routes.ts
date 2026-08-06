import { Routes } from '@angular/router';

import { mediaAdminAuthGuard } from '../media-admin/media-admin-auth.guard';
import { AdminContractsListPageComponent } from './pages/admin-contracts-list-page.component';
import { AdminContractFormPageComponent } from './pages/admin-contract-form-page.component';
import { AdminContractDetailPageComponent } from './pages/admin-contract-detail-page.component';

export const CONTRACT_ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [mediaAdminAuthGuard],
    component: AdminContractsListPageComponent,
  },
  {
    path: 'nuevo',
    canActivate: [mediaAdminAuthGuard],
    component: AdminContractFormPageComponent,
  },
  {
    path: ':id/editar',
    canActivate: [mediaAdminAuthGuard],
    component: AdminContractFormPageComponent,
  },
  {
    path: ':id',
    canActivate: [mediaAdminAuthGuard],
    component: AdminContractDetailPageComponent,
  },
];
