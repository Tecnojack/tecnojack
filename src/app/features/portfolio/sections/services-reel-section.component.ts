import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DestroyRef,
	ElementRef,
	NgZone,
	ViewChild,
	afterNextRender,
	effect,
	inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../../core/services/i18n.service';
import { ResponsiveImageDirective } from '../../../shared/media/responsive-image.directive';
import { loadMotionRuntime, prefersReducedMotion } from '../../../shared/motion/motion-runtime';
import { PortfolioContentService } from '../services/portfolio-content.service';

/**
 * Home funnel: every service as a large cinematic card that links to its own page.
 * Desktop: the section pins and the cards travel horizontally with scroll (velocity skew + inner parallax).
 * Mobile / reduced motion: a native swipeable row with scroll-snap — no scroll hijacking.
 */
@Component({
	selector: 'tj-services-reel-section',
	standalone: true,
	imports: [NgFor, NgIf, NgTemplateOutlet, RouterLink, ResponsiveImageDirective],
	templateUrl: './services-reel-section.component.html',
	styleUrl: './services-reel-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesReelSectionComponent {
	private readonly content = inject(PortfolioContentService);
	private readonly cdr = inject(ChangeDetectorRef);
	private readonly zone = inject(NgZone);
	private readonly destroyRef = inject(DestroyRef);
	readonly i18n = inject(I18nService);

	@ViewChild('section', { static: true }) private sectionRef!: ElementRef<HTMLElement>;
	@ViewChild('viewport', { static: true }) private viewportRef!: ElementRef<HTMLElement>;
	@ViewChild('track', { static: true }) private trackRef!: ElementRef<HTMLElement>;
	@ViewChild('count', { static: true }) private countRef!: ElementRef<HTMLElement>;
	@ViewChild('bar', { static: true }) private barRef!: ElementRef<HTMLElement>;

	private revert: (() => void) | null = null;
	private destroyed = false;

	constructor() {
		effect(() => {
			this.i18n.currentLang();
			this.cdr.markForCheck();
		});

		this.destroyRef.onDestroy(() => {
			this.destroyed = true;
			this.revert?.();
		});

		afterNextRender(() => {
			if (prefersReducedMotion()) return;
			this.zone.runOutsideAngular(() => void this.initMotion());
		});
	}

	get services() {
		return this.content.services().map((s) => ({
			id: s.id ?? s.href,
			href: s.href,
			image: s.image,
			title: this.i18n.t(`services.${s.id}.title`, s.title),
			description: this.i18n.t(`services.${s.id}.desc`, s.description),
		}));
	}

	get whatsappHref(): string {
		return this.content.buildWhatsappHref(
			this.i18n.isEn()
				? 'Hello TECNOJACK, I would like advice choosing the right service for my project.'
				: 'Hola TECNOJACK, quiero asesoría para elegir el servicio ideal para mi proyecto.',
		);
	}

	isInternalLink(href: string): boolean {
		return href.startsWith('/') && !href.includes('#');
	}

	trackById(_: number, item: { id: string }): string {
		return item.id;
	}

	pad(n: number): string {
		return n < 10 ? `0${n}` : String(n);
	}

	private async initMotion(): Promise<void> {
		const { gsap, ScrollTrigger } = await loadMotionRuntime();
		if (this.destroyed) return;

		const section = this.sectionRef.nativeElement;
		const viewport = this.viewportRef.nativeElement;
		const track = this.trackRef.nativeElement;
		const total = this.services.length;
		const mm = gsap.matchMedia();

		mm.add('(min-width: 900px)', () => {
			section.classList.add('is-pinned');
			const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
			const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3.out' });
			let lastIndex = -1;

			const travel = gsap.to(track, {
				x: () => -distance(),
				ease: 'none',
				scrollTrigger: {
					trigger: section,
					start: 'top top',
					end: () => `+=${distance()}`,
					pin: true,
					scrub: 0.8,
					anticipatePin: 1,
					invalidateOnRefresh: true,
					refreshPriority: 1,
					onUpdate: (self) => {
						// Velocity skew: a little film-strip bend while moving, settles to 0 at rest.
						skewTo(gsap.utils.clamp(-5, 5, self.getVelocity() / -320));
						this.barRef.nativeElement.style.transform = `scaleX(${self.progress})`;
						const index = Math.min(total, Math.round(self.progress * total));
						if (index !== lastIndex) {
							lastIndex = index;
							this.countRef.nativeElement.textContent = this.pad(Math.max(1, Math.min(total, index + 1)));
						}
					},
					onLeave: () => skewTo(0),
					onLeaveBack: () => skewTo(0),
				},
			});

			// Inner parallax: each photograph drifts against the card as it crosses the screen.
			gsap.utils.toArray<HTMLElement>('[data-reel-img]', section).forEach((img) => {
				gsap.fromTo(
					img,
					{ xPercent: -7 },
					{
						xPercent: 7,
						ease: 'none',
						scrollTrigger: {
							trigger: img.closest('.reel-card') ?? img,
							containerAnimation: travel,
							start: 'left right',
							end: 'right left',
							scrub: true,
						},
					},
				);
			});

			// Cards rise in as the section arrives.
			gsap.from(section.querySelectorAll('.reel-card'), {
				y: 80,
				autoAlpha: 0,
				duration: 1.1,
				ease: 'power4.out',
				stagger: 0.07,
				scrollTrigger: { trigger: section, start: 'top 75%', once: true },
			});

			return () => {
				section.classList.remove('is-pinned');
				gsap.set(track, { clearProps: 'transform' });
			};
		});

		this.revert = () => mm.revert();
		ScrollTrigger.refresh();
	}
}
