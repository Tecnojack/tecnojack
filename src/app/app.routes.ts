import { Routes } from '@angular/router';

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
		path: ':wedding/:guest/:count',
		loadComponent: () =>
			import('./features/wedding-page/wedding-page.component').then(
				(m) => m.WeddingPageComponent
			)
	},
	{
		path: ':wedding/:guest',
		loadComponent: () =>
			import('./features/wedding-page/wedding-page.component').then(
				(m) => m.WeddingPageComponent
			)
	},
	{
		path: ':wedding',
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
