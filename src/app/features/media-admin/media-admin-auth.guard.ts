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

export const mediaAdminLoginRedirectGuard: CanActivateFn = (route) => {
  const authService = inject(MediaAdminAuthService);
  const router = inject(Router);
  const redirectTo = route.queryParamMap.get('redirectTo') ?? '/media-admin';
  const normalizedRedirect =
    redirectTo.startsWith('/media-admin') && redirectTo !== '/media-admin/login'
      ? redirectTo
      : '/media-admin';

  return authService.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) =>
      isAuthenticated ? router.createUrlTree([normalizedRedirect]) : true,
    )
  );
};
