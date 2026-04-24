import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

export const adminAuthGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);
  const redirectTo = state.url.startsWith('/admin') ? state.url : '/admin/dashboard';

  return authService.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) =>
      isAuthenticated
        ? true
        : router.createUrlTree(['/admin/login'], {
            queryParams: { redirectTo }
          })
    )
  );
};

export const adminAuthChildGuard: CanActivateChildFn = (route, state) => adminAuthGuard(route, state);

export const adminLoginRedirectGuard: CanActivateFn = () => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => (isAuthenticated ? router.createUrlTree(['/admin/dashboard']) : true))
  );
};
