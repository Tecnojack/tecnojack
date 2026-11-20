import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import type { Analytics } from 'firebase/analytics';

/** Funnel events reported to Google Analytics 4 (Firebase Analytics, measurementId in firebase.options). */
export type ConversionEvent =
	| 'view_package' // package detail page opened
	| 'begin_request' // request form opened
	| 'submit_request' // request sent to WhatsApp
	| 'whatsapp_click' // any WhatsApp link tapped
	| 'share_package'; // package link shared or copied

type EventParams = Record<string, string | number | undefined>;

/**
 * Lightweight conversion tracking. Firebase Analytics loads lazily after the page is interactive and
 * only where the browser supports it; until then events are queued. Any failure is silent: tracking
 * must never block a visitor from contacting the studio.
 */
@Injectable({ providedIn: 'root' })
export class ConversionAnalyticsService {
	private readonly app = inject(FirebaseApp);
	private readonly zone = inject(NgZone);
	private readonly document = inject(DOCUMENT);

	private analytics: Analytics | null = null;
	private logEventFn: ((analytics: Analytics, name: string, params?: EventParams) => void) | null = null;
	private loading: Promise<void> | null = null;
	private readonly queue: Array<[ConversionEvent, EventParams]> = [];

	/** Starts analytics and the global WhatsApp click listener. Call once from the root component. */
	init(): void {
		const win = this.document.defaultView;
		if (!win) return;

		this.zone.runOutsideAngular(() => {
			// Any link to WhatsApp counts, wherever it lives (header, floating button, cards, forms).
			this.document.addEventListener(
				'click',
				(event) => {
					const link = (event.target as Element | null)?.closest?.('a[href*="wa.me"], a[href*="whatsapp.com"]');
					if (!link) return;
					this.track('whatsapp_click', {
						link_text: (link.textContent || '').trim().slice(0, 60) || undefined,
						link_context: link.closest('[data-track-context]')?.getAttribute('data-track-context') ?? undefined,
					});
				},
				{ capture: true, passive: true },
			);

			const start = () => void this.load();
			if ('requestIdleCallback' in win) {
				(win as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(start, {
					timeout: 4000,
				});
			} else {
				setTimeout(start, 2500);
			}
		});
	}

	track(event: ConversionEvent, params: EventParams = {}): void {
		const payload: EventParams = { page_path: this.document.location?.pathname, ...params };
		if (this.analytics && this.logEventFn) {
			this.safeLog(event, payload);
			return;
		}
		this.queue.push([event, payload]);
		void this.load();
	}

	private load(): Promise<void> {
		this.loading ??= (async () => {
			try {
				const { getAnalytics, isSupported, logEvent } = await import('firebase/analytics');
				if (!(await isSupported())) return;
				this.analytics = getAnalytics(this.app);
				this.logEventFn = logEvent as unknown as typeof this.logEventFn;
				for (const [event, params] of this.queue.splice(0)) this.safeLog(event, params);
			} catch {
				// Blocked by an extension, offline, or unsupported: stay silent.
			}
		})();
		return this.loading;
	}

	private safeLog(event: ConversionEvent, params: EventParams): void {
		try {
			this.logEventFn?.(this.analytics as Analytics, event, params);
		} catch {
			// ignore
		}
	}
}
