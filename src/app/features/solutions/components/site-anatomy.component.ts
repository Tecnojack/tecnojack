import { NgFor } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	NgZone,
	ViewChild,
	afterNextRender,
	inject,
	signal,
} from '@angular/core';

import { loadMotionRuntime, prefersReducedMotion } from '../../../shared/motion/motion-runtime';
import { ANATOMY_LAYERS, STOCK, stockPhoto } from '../solutions.content';

/**
 * "Anatomía de tu sitio": an isometric browser window made of four CSS-3D layers (strategy, code, design,
 * audiovisual content). Scrolling pins the chapter, explodes the layers apart, spotlights each one with its
 * explanation, then snaps them back together into the finished site.
 * Without motion the stack is shown already exploded and every step is listed.
 */
@Component({
	selector: 'tj-site-anatomy',
	standalone: true,
	imports: [NgFor],
	templateUrl: './site-anatomy.component.html',
	styleUrl: './site-anatomy.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteAnatomyComponent {
	private readonly zone = inject(NgZone);
	private readonly destroyRef = inject(DestroyRef);

	@ViewChild('section', { static: true }) private sectionRef!: ElementRef<HTMLElement>;
	@ViewChild('stage', { static: true }) private stageRef!: ElementRef<HTMLElement>;
	@ViewChild('stack', { static: true }) private stackRef!: ElementRef<HTMLElement>;

	readonly layers = ANATOMY_LAYERS;
	readonly contentPhoto = stockPhoto(STOCK.amberBottles, 640);
	readonly contentThumbs = [stockPhoto(STOCK.perfumeGold, 240), stockPhoto(STOCK.corporatePortrait, 240), stockPhoto(STOCK.perfumePedestal, 240)];
	readonly codeLines = [
		{ w: 62, c: 'k' },
		{ w: 40, c: 's' },
		{ w: 74, c: 't' },
		{ w: 52, c: 'k' },
		{ w: 30, c: 's' },
		{ w: 66, c: 't' },
		{ w: 44, c: 'k' },
	];

	readonly cinematic = signal(false);
	private revert: (() => void) | null = null;
	private destroyed = false;

	constructor() {
		this.destroyRef.onDestroy(() => {
			this.destroyed = true;
			this.revert?.();
		});
		afterNextRender(() => {
			if (prefersReducedMotion()) return;
			this.zone.runOutsideAngular(() => void this.init());
		});
	}

	private async init(): Promise<void> {
		const { gsap, ScrollTrigger } = await loadMotionRuntime();
		if (this.destroyed) return;

		const section = this.sectionRef.nativeElement;
		const stage = this.stageRef.nativeElement;
		const stack = this.stackRef.nativeElement;
		const steps = Array.from(section.querySelectorAll<HTMLElement>('[data-step]'));
		const layerEls = Array.from(stack.querySelectorAll<HTMLElement>('[data-layer]'));
		const finale = section.querySelector<HTMLElement>('[data-finale]');
		this.zone.run(() => this.cinematic.set(true));

		const count = this.layers.length;
		// Timeline: 0–0.14 explode · 0.14–0.84 one window per layer · 0.84–1 reassemble.
		const spot = (index: number) => {
			layerEls.forEach((el, i) => el.classList.toggle('is-dim', index >= 0 && i !== index));
			layerEls.forEach((el, i) => el.classList.toggle('is-lit', i === index));
			steps.forEach((el, i) => el.classList.toggle('is-active', i === index));
		};
		let last = -2;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: 'none' },
				scrollTrigger: {
					trigger: section,
					start: 'top top',
					end: () => `+=${window.innerHeight * 3.2}`,
					pin: stage,
					scrub: 0.9,
					anticipatePin: 1,
					invalidateOnRefresh: true,
				},
				onUpdate: () => {
					const p = tl.progress();
					const index = p < 0.14 || p > 0.86 ? -1 : Math.min(count - 1, Math.floor(((p - 0.14) / 0.72) * count));
					if (index !== last) {
						last = index;
						spot(index);
					}
				},
			});
			tl.fromTo(stack, { '--explode': 0 }, { '--explode': 1, duration: 0.14, ease: 'power2.inOut' }, 0)
				.to(stack, { '--spin': 1, duration: 0.72 }, 0.14)
				.to(stack, { '--explode': 0, duration: 0.12, ease: 'power2.inOut' }, 0.86);
			if (finale) tl.fromTo(finale, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.06 }, 0.92);
			tl.set({}, {}, 1);
		}, section);

		this.revert = () => ctx.revert();
		ScrollTrigger.refresh();
	}
}
