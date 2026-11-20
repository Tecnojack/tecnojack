import { DestroyRef, Directive, ElementRef, NgZone, afterNextRender, inject } from '@angular/core';

import type { LensScene } from './lens-scene';
import { loadMotionRuntime, prefersReducedMotion, type MotionRuntime } from '../../../shared/motion/motion-runtime';

/**
 * Cinematic motion layer for the portfolio landing.
 *
 * Reads small data attributes from the page and wires GSAP + ScrollTrigger + Lenis once the DOM exists:
 *  - [data-hero]                hero intro timeline + scroll-out (backdrop push-in, content lift)
 *  - [data-reveal]              fade/blur reveal once in view   (value: fade-up | blur-in | scale)
 *  - [data-reveal-group]        staggered reveal of its [data-reveal-item] children
 *  - [data-mask-reveal]         clip-path curtain reveal for media blocks
 *  - [data-parallax]            scrubbed vertical drift (value: speed, default 0.12)
 *  - [data-scrub-words]         drives `--p` (0..1) for per-word ink fill written in CSS
 *  - [data-magnetic]            pointer-following CTA (fine pointers only)
 *  - [data-scroll-progress]     page progress bar (scaleX)
 *
 * Content stays fully visible without JS or with reduced motion: nothing is hidden by CSS until the
 * `tj-motion` class is set on the host by this directive.
 */
@Directive({
	selector: '[tjCinematicMotion]',
	standalone: true,
})
export class CinematicMotionDirective {
	private readonly host = inject(ElementRef<HTMLElement>);
	private readonly zone = inject(NgZone);
	private readonly destroyRef = inject(DestroyRef);

	private cleanup: Array<() => void> = [];
	private destroyed = false;

	constructor() {
		this.destroyRef.onDestroy(() => {
			this.destroyed = true;
			this.cleanup.forEach((fn) => fn());
			this.cleanup = [];
		});

		if (!prefersReducedMotion()) {
			// Hide the hero's opening beats from the very first paint so the intro never flashes.
			const root: HTMLElement = this.host.nativeElement;
			root.classList.add('tj-motion-boot');
			const failsafe = window.setTimeout(() => root.classList.remove('tj-motion-boot'), 5000);
			this.cleanup.push(() => window.clearTimeout(failsafe));
		}

		afterNextRender(() => {
			if (prefersReducedMotion()) return;
			this.zone.runOutsideAngular(() => void this.init());
		});
	}

	private async init(): Promise<void> {
		const root: HTMLElement = this.host.nativeElement;
		const lensCanvas = root.querySelector<HTMLCanvasElement>('[data-hero-lens]');

		// Three.js loads in parallel with GSAP so the shutter is ready for the opening shot.
		const lensModules = lensCanvas
			? Promise.all([import('three'), import('./lens-scene')]).catch(() => null)
			: Promise.resolve(null);
		const [runtime, modules] = await Promise.all([loadMotionRuntime(), lensModules]);
		if (this.destroyed) return;

		root.classList.add('tj-motion');

		let lens: LensScene | null = null;
		if (lensCanvas && modules) {
			try {
				lensCanvas.classList.add('is-live');
				lens = modules[1].createLensScene(modules[0], lensCanvas);
				lens.setProgress(0);
			} catch {
				// WebGL unavailable: fall back to the photographic intro.
				lensCanvas.classList.remove('is-live');
				lens = null;
			}
		}
		const disposeLens = () => {
			lens?.dispose();
			lens = null;
			lensCanvas?.classList.remove('is-live');
		};

		const { gsap, ScrollTrigger } = runtime;
		const ctx = gsap.context(() => {
			this.initHero(runtime, root, lens, disposeLens);
			this.initReveals(runtime, root);
			this.initMaskReveals(runtime, root);
			this.initParallax(runtime, root);
			this.initScrubWords(runtime, root);
			this.initProgress(runtime, root);
		}, root);
		root.classList.remove('tj-motion-boot');

		const detachMagnetic = this.initMagnetic(runtime, root);
		const detachLenis = runtime.attachLenis();

		// CMS content, fonts and lazy images change the layout after first paint: keep trigger positions honest.
		let refreshTimer = 0;
		const resizeObserver = new ResizeObserver(() => {
			window.clearTimeout(refreshTimer);
			refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
		});
		resizeObserver.observe(root);

		this.cleanup.push(() => {
			window.clearTimeout(refreshTimer);
			resizeObserver.disconnect();
			detachMagnetic();
			ctx.revert();
			disposeLens();
			detachLenis();
			root.classList.remove('tj-motion', 'tj-motion-boot');
		});

		ScrollTrigger.refresh();
	}

	// ─── Hero: opening shot + scroll-out push-in ──────────────────────────────────────────────
	private initHero({ gsap }: MotionRuntime, root: HTMLElement, lens: LensScene | null, disposeLens: () => void): void {
		const hero = root.querySelector<HTMLElement>('[data-hero]');
		if (!hero) return;

		const backdrop = hero.querySelector('[data-hero-backdrop]');
		const content = hero.querySelector('[data-hero-content]');
		const beats = hero.querySelectorAll('[data-hero-beat]');
		const lines = hero.querySelectorAll('[data-hero-line]');

		const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

		if (lens) {
			// Opening shot: the brand name lands on a closed lens, the iris opens and the camera
			// passes through the barrel into the photograph. The canvas is released afterwards.
			const shutter = { p: 0 };
			if (backdrop) intro.fromTo(backdrop, { scale: 1.3, autoAlpha: 1 }, { scale: 1.04, duration: 3.2, ease: 'expo.out' }, 0.55);
			if (lines.length) {
				intro.fromTo(lines, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.14 }, 0.15);
			}
			intro.to(
				shutter,
				{
					p: 1,
					duration: 2.6,
					ease: 'power2.inOut',
					onUpdate: () => lens.setProgress(shutter.p),
					onComplete: disposeLens,
				},
				0.55,
			);
			if (beats.length) {
				intro.fromTo(
					beats,
					{ y: 26, autoAlpha: 0, filter: 'blur(8px)' },
					{ y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.95, stagger: 0.09, clearProps: 'filter' },
					1.9,
				);
			}
		} else {
			if (backdrop) {
				intro.fromTo(backdrop, { scale: 1.22, autoAlpha: 0 }, { scale: 1.04, autoAlpha: 1, duration: 2.2, ease: 'expo.out' }, 0);
			}
			if (lines.length) {
				intro.fromTo(lines, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.15, stagger: 0.12 }, 0.35);
			}
			if (beats.length) {
				intro.fromTo(
					beats,
					{ y: 26, autoAlpha: 0, filter: 'blur(8px)' },
					{ y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.95, stagger: 0.09, clearProps: 'filter' },
					0.7,
				);
			}
		}

		// Scroll-out: the camera pushes into the photograph while the copy lifts away.
		const out = gsap.timeline({
			scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
		});
		if (backdrop) out.to(backdrop, { scale: 1.16, yPercent: 8, ease: 'none' }, 0);
		if (content) out.to(content, { y: -90, autoAlpha: 0, ease: 'none' }, 0);
	}

	// ─── Reveals ────────────────────────────────────────────────────────────────────────────────
	private initReveals({ gsap }: MotionRuntime, root: HTMLElement): void {
		const presets: Record<string, gsap.TweenVars> = {
			'fade-up': { y: 36, autoAlpha: 0 },
			'blur-in': { y: 18, autoAlpha: 0, filter: 'blur(10px)' },
			scale: { scale: 0.96, autoAlpha: 0 },
		};

		gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach((el) => {
			const from = presets[el.dataset['reveal'] || 'fade-up'] ?? presets['fade-up'];
			gsap.from(el, {
				...from,
				duration: 1,
				ease: 'power4.out',
				delay: Number(el.dataset['revealDelay'] || 0),
				clearProps: 'filter',
				scrollTrigger: { trigger: el, start: 'top 84%', once: true },
			});
		});

		gsap.utils.toArray<HTMLElement>('[data-reveal-group]', root).forEach((group) => {
			const items = group.querySelectorAll('[data-reveal-item]');
			if (!items.length) return;
			gsap.from(items, {
				y: 40,
				autoAlpha: 0,
				filter: 'blur(8px)',
				duration: 0.95,
				ease: 'power4.out',
				stagger: 0.085,
				clearProps: 'filter',
				scrollTrigger: { trigger: group, start: 'top 82%', once: true },
			});
		});
	}

	private initMaskReveals({ gsap }: MotionRuntime, root: HTMLElement): void {
		gsap.utils.toArray<HTMLElement>('[data-mask-reveal]', root).forEach((el) => {
			const img = el.querySelector('img');
			const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
			tl.fromTo(el, { clipPath: 'inset(18% 8% 18% 8% round 18px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.3, ease: 'expo.out', clearProps: 'clipPath' }, 0);
			// Parallax images keep a little overscan so their drift never exposes an edge.
			const rest = img?.hasAttribute('data-parallax') ? 1.12 : 1;
			if (img) tl.fromTo(img, { scale: rest + 0.18 }, { scale: rest, duration: 1.6, ease: 'expo.out' }, 0);
		});
	}

	private initParallax({ gsap }: MotionRuntime, root: HTMLElement): void {
		gsap.utils.toArray<HTMLElement>('[data-parallax]', root).forEach((el) => {
			const speed = Number(el.dataset['parallax'] || 0.12);
			const section = el.closest<HTMLElement>('[data-parallax-section]') ?? el.parentElement ?? el;
			gsap.fromTo(
				el,
				{ yPercent: -speed * 50 },
				{
					yPercent: speed * 50,
					ease: 'none',
					scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2, invalidateOnRefresh: true },
				},
			);
		});
	}

	/** Per-word ink fill: CSS reads `--p` and each word's `--i` / `--n`, so re-rendered i18n words keep working. */
	private initScrubWords({ gsap }: MotionRuntime, root: HTMLElement): void {
		gsap.utils.toArray<HTMLElement>('[data-scrub-words]', root).forEach((el) => {
			gsap.fromTo(
				el,
				{ '--p': 0 },
				{ '--p': 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 42%', scrub: 0.9 } },
			);
		});
	}

	private initProgress({ gsap }: MotionRuntime, root: HTMLElement): void {
		const bar = root.querySelector('[data-scroll-progress]');
		if (!bar) return;
		gsap.fromTo(
			bar,
			{ scaleX: 0 },
			{ scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.4 } },
		);
	}

	private initMagnetic({ gsap }: MotionRuntime, root: HTMLElement): () => void {
		if (!window.matchMedia('(pointer: fine)').matches) return () => undefined;

		const offs: Array<() => void> = [];
		root.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
			const strength = Number(el.dataset['magnetic'] || 0.22);
			const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
			const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
			const move = (event: PointerEvent) => {
				const rect = el.getBoundingClientRect();
				xTo((event.clientX - rect.left - rect.width / 2) * strength);
				yTo((event.clientY - rect.top - rect.height / 2) * strength);
			};
			const leave = () => {
				xTo(0);
				yTo(0);
			};
			el.addEventListener('pointermove', move);
			el.addEventListener('pointerleave', leave);
			offs.push(() => {
				el.removeEventListener('pointermove', move);
				el.removeEventListener('pointerleave', leave);
				gsap.set(el, { clearProps: 'transform' });
			});
		});
		return () => offs.forEach((off) => off());
	}
}
