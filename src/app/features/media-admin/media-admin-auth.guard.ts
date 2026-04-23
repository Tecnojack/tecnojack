import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

import { MediaAdminAuthService } from './media-admin-auth.service';

export const mediaAdminAuthGuard: CanActivateFn = (_route, state) => {
  const authService = inject(MediaAdminAuthService);
  const router = inject(Router);
  const redirectTo = state.url.startsWith('/media-admin') ? state.url : '/media-admin';

  return authService.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) =>
      isAuthenticated
        ? true
        : router.createUrlTree(['/media-admin/login'], {
            queryParams: { redirectTo }
          })
    )
  );
};

export const mediaAdminLoginRedirectGuard: CanActivateFn = () => {
  const authService = inject(MediaAdminAuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => (isAuthenticated ? router.createUrlTree(['/media-admin']) : true))
  );
};
