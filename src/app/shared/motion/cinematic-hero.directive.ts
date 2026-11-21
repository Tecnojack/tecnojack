import { DestroyRef, Directive, ElementRef, Input, NgZone, afterNextRender, inject } from '@angular/core';

import { loadMotionRuntime, prefersReducedMotion } from './motion-runtime';

const FPS = 24;

/**
 * `<section tjCinematicHero>`: shared page-hero language for the public site.
 *
 * - Adds a camera viewfinder overlay (corner marks, REC dot, a timecode driven by scroll, a scroll cue).
 * - Tags the copy (siblings of the `h1`) with `data-hero-item` + `--i` so CSS can play a staggered
 *   entrance on the first paint (the title is unmasked line-first). CSS owns the intro, so there is no flash.
 * - With motion allowed, scrolling out of the hero pushes the backdrop (`[data-hero-backdrop]` or
 *   `.service-category-hero__backdrop`) down and in, lifts the copy and fades the viewfinder.
 *
 * Decorative elements are `aria-hidden`; nothing is added to the accessibility tree.
 */
@Directive({
	selector: '[tjCinematicHero]',
	standalone: true,
	host: { class: 'tj-hero' },
})
export class CinematicHeroDirective {
	private readonly host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
	private readonly zone = inject(NgZone);
	private readonly destroyRef = inject(DestroyRef);

	/** Short label shown next to the REC dot (e.g. the page name). */
	@Input() tjCinematicHero = '';

	private cleanup: Array<() => void> = [];
	private destroyed = false;

	constructor() {
		this.destroyRef.onDestroy(() => {
			this.destroyed = true;
			this.cleanup.forEach((fn) => fn());
			this.cleanup = [];
		});
		afterNextRender(() => {
			const timecode = this.decorate();
			this.tagItems();
			if (prefersReducedMotion()) return;
			this.zone.runOutsideAngular(() => void this.initScroll(timecode));
		});
	}

	private decorate(): HTMLElement {
		const doc = this.host.ownerDocument;
		const frame = doc.createElement('div');
		frame.className = 'tj-hero__frame';
		frame.setAttribute('aria-hidden', 'true');
		frame.innerHTML =
			'<i class="tj-hero__corner tj-hero__corner--tl"></i><i class="tj-hero__corner tj-hero__corner--tr"></i>' +
			'<i class="tj-hero__corner tj-hero__corner--bl"></i><i class="tj-hero__corner tj-hero__corner--br"></i>' +
			'<span class="tj-hero__rec"><b></b>REC</span><span class="tj-hero__tc">00:00:00:00</span>' +
			'<span class="tj-hero__cue"><span>Desliza</span><i></i></span>';
		const label = frame.querySelector('.tj-hero__rec');
		if (label && this.tjCinematicHero) label.append(` · ${this.tjCinematicHero}`);
		this.host.appendChild(frame);
		this.cleanup.push(() => frame.remove());
		return frame.querySelector<HTMLElement>('.tj-hero__tc')!;
	}

	/** Staggered entrance order: the title's siblings, then the columns that follow its column. */
	private tagItems(): void {
		const title = this.host.querySelector('h1');
		const column = title?.parentElement;
		if (!title || !column) return;
		const items: Element[] = Array.from(column.children);
		let next = column.nextElementSibling;
		while (next) {
			items.push(next);
			next = next.nextElementSibling;
		}
		items.forEach((el, i) => {
			el.setAttribute('data-hero-item', el === title ? 'title' : '');
			(el as HTMLElement).style.setProperty('--i', String(i));
		});
		this.host.classList.add('tj-hero--intro');
	}

	private async initScroll(timecode: HTMLElement): Promise<void> {
		const { gsap, ScrollTrigger } = await loadMotionRuntime();
		if (this.destroyed) return;

		const backdrop =
			this.host.querySelector<HTMLElement>('[data-hero-backdrop]') ??
			this.host.querySelector<HTMLElement>('.service-category-hero__backdrop');
		const content =
			this.host.querySelector<HTMLElement>('[data-hero-content]') ??
			this.host.querySelector<HTMLElement>('.service-category-hero__content');
		const frame = this.host.querySelector<HTMLElement>('.tj-hero__frame');

		let lastFrame = -1;
		const paintTimecode = (progress: number) => {
			const frames = Math.round(progress * 14 * FPS);
			if (frames === lastFrame) return;
			lastFrame = frames;
			const pad = (n: number) => String(n).padStart(2, '0');
			const secs = Math.floor(frames / FPS);
			timecode.textContent = `00:00:${pad(secs)}:${pad(frames % FPS)}`;
		};

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: 'none' },
				scrollTrigger: {
					trigger: this.host,
					start: 'top top',
					end: 'bottom top',
					scrub: 0.5,
					invalidateOnRefresh: true,
					onUpdate: (self) => paintTimecode(self.progress),
				},
			});
			if (backdrop) tl.to(backdrop, { yPercent: 16, scale: 1.08, filter: 'brightness(0.55)' }, 0);
			if (content) tl.to(content, { y: -90, autoAlpha: 0.15 }, 0);
			if (frame) tl.to(frame, { autoAlpha: 0, scale: 1.04 }, 0);
		}, this.host);

		this.cleanup.push(() => ctx.revert());
		ScrollTrigger.refresh();
	}
}
