import { Routes } from '@angular/router';

import { MEDIA_ADMIN_ROUTES } from './features/media-admin/media-admin.routes';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'brand'
	},
	{
		path: 'brand',
		loadComponent: () =>
			import('./features/brand-mode/brand-mode.component').then(
				(m) => m.BrandModeComponent
			)
	},
	{
		path: 'portfolio/videos',
		loadComponent: () =>
			import('./features/portfolio/pages/video-page.component').then(
				(m) => m.VideoPageComponent
			)
	},
	{
		path: 'portfolio/corporativos/:package',
		data: { category: 'corporativos' },
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-package-detail-page.component').then(
				(m) => m.PortfolioPackageDetailPageComponent
			)
	},
	{
		path: 'portfolio/corporativos',
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-corporate-page.component').then(
				(m) => m.PortfolioCorporatePageComponent
			)
	},
	{
		path: 'portfolio/bodas/:package',
		data: { category: 'bodas' },
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-package-detail-page.component').then(
				(m) => m.PortfolioPackageDetailPageComponent
			)
	},
	{
		path: 'portfolio/bodas',
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-weddings-page.component').then(
				(m) => m.PortfolioWeddingsPageComponent
			)
	},
	{
		path: 'portfolio/quinces/:package',
		data: { category: 'quinces' },
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-package-detail-page.component').then(
				(m) => m.PortfolioPackageDetailPageComponent
			)
	},
	{
		path: 'portfolio/quinces',
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-quinces-page.component').then(
				(m) => m.PortfolioQuincesPageComponent
			)
	},
	{
		path: 'portfolio/grados/instituciones',
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-grades-institutions-page.component').then(
				(m) => m.PortfolioGradesInstitutionsPageComponent
			)
	},
	{
		path: 'portfolio/grados/estudiantes',
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-grades-students-page.component').then(
				(m) => m.PortfolioGradesStudentsPageComponent
			)
	},
	{
		path: 'portfolio/grados/:package',
		data: { category: 'grados' },
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-package-detail-page.component').then(
				(m) => m.PortfolioPackageDetailPageComponent
			)
	},
	{
		path: 'portfolio/grados',
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-grades-page.component').then(
				(m) => m.PortfolioGradesPageComponent
			)
	},
	{
		path: 'portfolio/preboda/:package',
		data: { category: 'preboda' },
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-package-detail-page.component').then(
				(m) => m.PortfolioPackageDetailPageComponent
			)
	},
	{
		path: 'portfolio/preboda',
		loadComponent: () =>
			import('./features/portfolio/pages/portfolio-preboda-page.component').then(
				(m) => m.PortfolioPrebodaPageComponent
			)
	},
	{
		path: 'portfolio/sobre-mi',
		loadComponent: () =>
			import('./features/portfolio/pages/about-page.component').then(
				(m) => m.AboutPageComponent
			)
	},
	{
		path: 'otros',
		loadComponent: () =>
			import('./features/otros/otros-page.component').then(
				(m) => m.OtrosPageComponent
			)
	},
	{
		path: 'terminos-y-condiciones',
		loadComponent: () =>
			import('./features/portfolio/pages/terms-and-conditions-page.component').then(
				(m) => m.TermsAndConditionsPageComponent
			)
	},
	{
		path: 'portfolio',
		loadComponent: () =>
			import('./features/portfolio/portfolio-page.component').then(
				(m) => m.PortfolioPageComponent
			)
	},
	{
		path: 'soluciones',
		loadComponent: () =>
			import('./features/solutions/solutions-page.component').then(
				(m) => m.SolutionsPageComponent
			)
	},
	{
		path: 'media-admin',
		children: MEDIA_ADMIN_ROUTES
	},
	{
		path: 'admin',
		redirectTo: 'media-admin'
	},
	{
		path: 'clientes/:service/:slug',
		loadComponent: () =>
			import('./features/portfolio/components/client-detail.component').then(
				(m) => m.ClientDetailComponent
			)
	},
	{
		path: 'clientes',
		loadComponent: () =>
			import('./features/portfolio/pages/clients-page.component').then(
				(m) => m.ClientsPageComponent
			)
	},
	{
		path: ':wedding/:guest/:count',
		data: { audio: true },
		loadComponent: () =>
			import('./features/wedding-page/wedding-page.component').then(
				(m) => m.WeddingPageComponent
			)
	},
	{
		path: ':wedding/:guest',
		data: { audio: true },
		loadComponent: () =>
			import('./features/wedding-page/wedding-page.component').then(
				(m) => m.WeddingPageComponent
			)
	},
	{
		path: ':wedding',
		data: { audio: true },
		loadComponent: () =>
			import('./features/wedding-page/wedding-page.component').then(
				(m) => m.WeddingPageComponent
			)
	},
	{
		path: '**',
		redirectTo: 'brand'
	}
];
