import { Routes } from '@angular/router';

import {
  mediaAdminAuthGuard,
  mediaAdminLoginRedirectGuard,
} from './media-admin-auth.guard';
import { MediaAdminLoginPageComponent } from './media-admin-login-page.component';
import { MediaAdminPageComponent } from './media-admin-page.component';
import { AdminClientsShellComponent } from './components/admin-clients-shell.component';
import { RequestsPageComponent } from './requests-page.component';

export const MEDIA_ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [mediaAdminLoginRedirectGuard],
    component: MediaAdminLoginPageComponent,
  },
  {
    canActivate: [mediaAdminAuthGuard],
    path: 'clientes',
    component: AdminClientsShellComponent,
  },
  {
    canActivate: [mediaAdminAuthGuard],
    path: 'solicitudes',
    component: RequestsPageComponent,
  },
  {
    canActivate: [mediaAdminAuthGuard],
    path: '',
    pathMatch: 'full',
    component: MediaAdminPageComponent,
  },
];
