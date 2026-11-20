import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { resolvePackageShortCode } from './package-short-codes';

/**
 * `/p/:code` → the package's canonical page (e.g. `/p/b3` → `/portfolio/bodas/esencial-hibrido-foto-video`).
 * Unknown codes land on the portfolio home instead of an error page.
 */
export const packageShortLinkGuard: CanActivateFn = (route) => {
	const router = inject(Router);
	const target = resolvePackageShortCode(route.paramMap.get('code'));
	return target ? router.createUrlTree(['/portfolio', target.category, target.slug]) : router.createUrlTree(['/portfolio']);
};
