import { Routes } from '@angular/router';

import { MediaAdminGatePageComponent } from './media-admin-gate-page.component';

export const MEDIA_ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: '',
    component: MediaAdminGatePageComponent
  }
];
