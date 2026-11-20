import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../../core/services/i18n.service';

/**
 * Home: a single-screen bridge to "Sobre mí" — portrait, the brand manifesto inked in on scroll,
 * one line of context and one link. The full creator story lives on /portfolio/sobre-mi.
 */
@Component({
	selector: 'tj-home-about-teaser-section',
	standalone: true,
	imports: [NgFor, NgIf, RouterLink],
	templateUrl: './home-about-teaser-section.component.html',
	styleUrl: './home-about-teaser-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeAboutTeaserSectionComponent {
	private readonly cdr = inject(ChangeDetectorRef);
	readonly i18n = inject(I18nService);

	readonly aboutHref = '/portfolio/sobre-mi';

	constructor() {
		effect(() => {
			this.i18n.currentLang();
			this.cdr.markForCheck();
		});
	}

	get quoteLead(): string {
		return this.i18n.t('brand.manifesto_quote1', 'La fotografía no captura lo que ves.');
	}

	get quoteEmphasis(): string {
		return this.i18n.t('brand.manifesto_quote2', 'Captura lo que sentiste.');
	}

	/** Words carry their index so CSS can ink them in from the scrubbed `--p` value. */
	get quoteWords(): Array<{ text: string; em: boolean }> {
		const split = (text: string, em: boolean) =>
			text
				.split(/\s+/)
				.filter(Boolean)
				.map((word) => ({ text: word, em }));
		return [...split(this.quoteLead, false), ...split(this.quoteEmphasis, true)];
	}

	trackByIndex(index: number): number {
		return index;
	}
}
