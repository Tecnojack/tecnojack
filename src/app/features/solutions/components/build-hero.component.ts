import { NgFor } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	EventEmitter,
	NgZone,
	Output,
	ViewChild,
	afterNextRender,
	inject,
	signal,
} from '@angular/core';

import { loadMotionRuntime, prefersReducedMotion } from '../../../shared/motion/motion-runtime';
import { HERO, HERO_CODE, HERO_PRODUCTS, HERO_STEPS, HERO_STEP_NOTES, STOCK, stockPhoto } from '../solutions.content';

interface CodeToken {
	text: string;
	kind: 'tag' | 'attr' | 'str' | 'text' | 'punct';
}

/** Extra "typing units" per line so line breaks read as a short pause. */
const LINE_PAUSE = 6;

/**
 * "Mira cómo nace tu sitio": the hero pins while scroll types the code in the editor and the browser beside
 * it renders each piece as soon as its lines are written. The first lines type themselves on load so the
 * first view is already alive; the rest follows the scroll (forward and backward).
 * Reduced motion / no JS: finished code and finished site, no pinning.
 */
@Component({
	selector: 'tj-build-hero',
	standalone: true,
	imports: [NgFor],
	templateUrl: './build-hero.component.html',
	styleUrl: './build-hero.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildHeroComponent {
	private readonly zone = inject(NgZone);
	private readonly destroyRef = inject(DestroyRef);

	@Output() readonly quote = new EventEmitter<void>();

	@ViewChild('section', { static: true }) private sectionRef!: ElementRef<HTMLElement>;
	@ViewChild('stage', { static: true }) private stageRef!: ElementRef<HTMLElement>;
	@ViewChild('codeScroll', { static: true }) private codeScrollRef!: ElementRef<HTMLElement>;
	@ViewChild('codeBody', { static: true }) private codeBodyRef!: ElementRef<HTMLElement>;
	@ViewChild('viewport', { static: true }) private viewportRef!: ElementRef<HTMLElement>;
	@ViewChild('site', { static: true }) private siteRef!: ElementRef<HTMLElement>;
	@ViewChild('stepLabel', { static: true }) private stepLabelRef!: ElementRef<HTMLElement>;
	@ViewChild('stepCount', { static: true }) private stepCountRef!: ElementRef<HTMLElement>;
	@ViewChild('story', { static: true }) private storyRef!: ElementRef<HTMLElement>;
	@ViewChild('storyText', { static: true }) private storyTextRef!: ElementRef<HTMLElement>;
	@ViewChild('workspace', { static: true }) private workspaceRef!: ElementRef<HTMLElement>;
	@ViewChild('head', { static: true }) private headRef!: ElementRef<HTMLElement>;
	@ViewChild('log', { static: true }) private logRef!: ElementRef<HTMLElement>;

	readonly hero = HERO;
	readonly lines = HERO_CODE.map((line, index) => ({ ...line, index, tokens: highlight(line.text) }));
	readonly heroPhoto = stockPhoto(STOCK.perfumePedestal, 700);
	readonly products = HERO_PRODUCTS.map((product) => ({ ...product, src: stockPhoto(product.photo, 300) }));
	readonly slots = ['10:00', '11:30', '15:00', '17:30'];
	readonly steps = HERO_STEPS;
	readonly stepNotes = HERO_STEP_NOTES;
	/** Floating code glyphs: position (%), depth (0 far … 1 near) and float period (s). */
	readonly glyphs = [
		{ t: '</>', x: 6, y: 22, z: 0.9, d: 9 },
		{ t: '{ }', x: 88, y: 16, z: 0.5, d: 11 },
		{ t: '=>', x: 14, y: 78, z: 0.35, d: 13 },
		{ t: '<div>', x: 80, y: 82, z: 0.75, d: 10 },
		{ t: ';', x: 50, y: 10, z: 0.25, d: 12 },
		{ t: '( )', x: 95, y: 52, z: 0.6, d: 14 },
		{ t: '#', x: 3, y: 50, z: 0.45, d: 15 },
		{ t: '[ ]', x: 62, y: 92, z: 0.3, d: 12 },
	];
	readonly cinematic = signal(false);
	/** Presentation intro: windows stay hidden until they unfold (never when motion is reduced). */
	readonly booting = signal(!prefersReducedMotion());

	/** Cumulative typing units at the end of each line. */
	private readonly lineEnds: number[] = [];
	private readonly totalUnits: number;
	/** Units auto-typed on load (the whole nav: step 1). */
	private readonly introUnits: number;

	private lineEls: HTMLElement[] = [];
	private pieceEls: HTMLElement[] = [];
	private segmentEls: HTMLElement[] = [];
	private lastUnits = -1;
	private lastNoteStep = 1;
	private introUnitsDone = 0;
	private scrollUnits = 0;
	private cleanup: Array<() => void> = [];
	private destroyed = false;

	constructor() {
		let acc = 0;
		for (const line of HERO_CODE) {
			acc += line.text.length + LINE_PAUSE;
			this.lineEnds.push(acc);
		}
		this.totalUnits = acc;
		const lastIntroLine = HERO_CODE.map((line) => line.step).lastIndexOf(1);
		this.introUnits = this.lineEnds[lastIntroLine] ?? 0;

		this.destroyRef.onDestroy(() => {
			this.destroyed = true;
			this.cleanup.forEach((fn) => fn());
			this.cleanup = [];
		});

		afterNextRender(() => this.zone.runOutsideAngular(() => void this.init()));
	}

	private async init(): Promise<void> {
		const section = this.sectionRef.nativeElement;
		this.lineEls = Array.from(section.querySelectorAll<HTMLElement>('[data-line]'));
		this.pieceEls = Array.from(section.querySelectorAll<HTMLElement>('[data-piece]'));
		this.segmentEls = Array.from(section.querySelectorAll<HTMLElement>('[data-segment]'));

		if (prefersReducedMotion()) {
			this.render(this.totalUnits);
			return;
		}

		this.render(0);
		// Failsafe: never leave the windows hidden if the motion runtime is slow or blocked.
		const failsafe = window.setTimeout(() => {
			this.zone.run(() => this.booting.set(false));
			this.playIntro();
		}, 4000);
		this.cleanup.push(() => window.clearTimeout(failsafe));

		const { gsap, ScrollTrigger } = await loadMotionRuntime();
		if (this.destroyed) return;
		window.clearTimeout(failsafe);
		this.zone.run(() => this.cinematic.set(true));
		this.playPresentation(gsap);

		const mobile = window.matchMedia('(max-width: 899px)').matches;
		const workspace = this.workspaceRef.nativeElement;
		const headItems = Array.from(this.headRef.nativeElement.querySelectorAll<HTMLElement>('[data-head]'));
		const log = this.logRef.nativeElement;
		const story = this.storyRef.nativeElement;
		/** Share of the pin used to write the code; the rest moves the build aside and reveals the copy. */
		const TYPE_END = 0.66;

		const ctx = gsap.context(() => {
			gsap.set(headItems, { autoAlpha: 0, y: 34 });

			// Phase 2: the finished build steps back to the right (bottom on phones) and the copy enters.
			const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
			// Phones keep the build on top and bring the copy in underneath it.
			tl.to([log, story], { autoAlpha: 0, y: 12, duration: 0.06 }, TYPE_END + 0.04)
				.to(
					workspace,
					mobile
						? { scale: 0.96, transformOrigin: '50% 0%', duration: 0.16 }
						: { scale: 0.55, xPercent: 1, transformOrigin: '100% 55%', duration: 0.16 },
					TYPE_END + 0.06,
				)
				.to(headItems, { autoAlpha: 1, y: 0, duration: 0.09, stagger: 0.035, ease: 'power3.out' }, TYPE_END + 0.14)
				.set({}, {}, 1);

			ScrollTrigger.create({
				trigger: section,
				start: 'top top',
				end: () => `+=${window.innerHeight * (mobile ? 3 : 3.4)}`,
				pin: this.stageRef.nativeElement,
				animation: tl,
				scrub: 0.6,
				anticipatePin: 1,
				invalidateOnRefresh: true,
				onUpdate: (self) => {
					// Phase 1: scroll types everything after the intro; going back "un-types" it.
					this.stageRef.nativeElement.style.setProperty('--sp', self.progress.toFixed(3));
					const typed = Math.min(1, self.progress / TYPE_END);
					this.scrollUnits = this.introUnits + typed * (this.totalUnits - this.introUnits);
					this.render(Math.max(this.introUnitsDone, this.scrollUnits));
				},
			});
		}, section);

		// Pointer parallax (fine pointers): CSS reads --px/--py (-1..1) for glyphs and the workspace tilt.
		const stage = this.stageRef.nativeElement;
		let raf = 0;
		let tx = 0;
		let ty = 0;
		let cx = 0;
		let cy = 0;
		const ease = () => {
			raf = 0;
			cx += (tx - cx) * 0.08;
			cy += (ty - cy) * 0.08;
			stage.style.setProperty('--px', cx.toFixed(3));
			stage.style.setProperty('--py', cy.toFixed(3));
			if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) raf = requestAnimationFrame(ease);
		};
		const onPointer = (event: PointerEvent) => {
			if (event.pointerType !== 'mouse') return;
			const rect = stage.getBoundingClientRect();
			tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
			ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
			if (!raf) raf = requestAnimationFrame(ease);
		};
		const onLeave = () => {
			tx = 0;
			ty = 0;
			if (!raf) raf = requestAnimationFrame(ease);
		};
		stage.addEventListener('pointermove', onPointer);
		stage.addEventListener('pointerleave', onLeave);
		this.cleanup.push(() => {
			cancelAnimationFrame(raf);
			stage.removeEventListener('pointermove', onPointer);
			stage.removeEventListener('pointerleave', onLeave);
		});

		this.cleanup.push(() => ctx.revert());
		ScrollTrigger.refresh();
	}

	/**
	 * Presentation mode on entry: atmosphere fades in, the editor unfolds from a thin line out of black,
	 * then the browser, then the build log; only then does the code start typing itself.
	 */
	private playPresentation(gsap: typeof import('gsap').gsap): void {
		const section = this.sectionRef.nativeElement;
		const atmos = section.querySelector<HTMLElement>('.bh__atmos');
		const editor = section.querySelector<HTMLElement>('.bh__editor');
		const browser = section.querySelector<HTMLElement>('.bh__browser');
		const log = this.logRef.nativeElement;
		const story = this.storyRef.nativeElement;
		const closed = { clipPath: 'inset(49% 0% 49% 0% round 14px)', filter: 'brightness(0)', autoAlpha: 1 };
		const open = { clipPath: 'inset(0% 0% 0% 0% round 14px)', filter: 'brightness(1)', duration: 1.05, ease: 'expo.inOut' };

		// Set the starting frames first, then lift the CSS guard in the same frame: no flash.
		if (atmos) gsap.set(atmos, { autoAlpha: 0 });
		// The copy waits for the end of the build (the scroll timeline reveals it).
		gsap.set(this.headRef.nativeElement.querySelectorAll('[data-head]'), { autoAlpha: 0, y: 34 });
		gsap.set([editor, browser], closed);
		gsap.set([log, story], { autoAlpha: 0, y: 12 });
		this.zone.run(() => this.booting.set(false));

		const tl = gsap.timeline({ onComplete: () => this.playIntro(0) });
		if (atmos) tl.to(atmos, { autoAlpha: 1, duration: 1.4, ease: 'power2.out' }, 0);
		tl.to(editor, { ...open, clearProps: 'clipPath,filter' }, 0.25)
			.to(browser, { ...open, clearProps: 'clipPath,filter' }, 0.7)
			.to([log, story], { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.15 }, 1.45);
		this.cleanup.push(() => tl.kill());
	}

	/** First view: the nav lines type themselves, like someone already coding. */
	private playIntro(delayMs = 500): void {
		const start = performance.now();
		const duration = 2200;
		let frame = 0;
		const step = (now: number) => {
			const t = Math.min(1, (now - start) / duration);
			this.introUnitsDone = this.introUnits * t;
			this.render(Math.max(this.introUnitsDone, this.scrollUnits));
			if (t < 1 && !this.destroyed) frame = requestAnimationFrame(step);
		};
		const delay = window.setTimeout(() => (frame = requestAnimationFrame(step)), delayMs);
		this.cleanup.push(() => {
			window.clearTimeout(delay);
			cancelAnimationFrame(frame);
		});
	}

	/** Paints the editor and the preview for a number of typed units (monotonic in scroll, reversible). */
	private render(unitsRaw: number): void {
		const units = Math.floor(unitsRaw);
		if (units === this.lastUnits) return;
		this.lastUnits = units;

		let activeIndex = -1;
		let doneStep = 0;
		let lineStart = 0;
		this.lines.forEach((line, i) => {
			const el = this.lineEls[i];
			if (!el) return;
			const typed = Math.max(0, Math.min(line.text.length, units - lineStart));
			const finished = units >= this.lineEnds[i] - LINE_PAUSE;
			el.style.setProperty('--typed', finished ? 'none' : `${typed}ch`);
			el.classList.toggle('is-written', typed > 0);
			const active = typed > 0 && !finished;
			el.classList.toggle('is-active', active);
			if (active) activeIndex = i;
			if (finished && units >= this.lineEnds[i] - LINE_PAUSE) {
				const nextStep = this.lines[i + 1]?.step;
				// A step is shown once its last line is written.
				if (nextStep !== line.step) doneStep = Math.max(doneStep, line.step);
			}
			lineStart = this.lineEnds[i];
		});
		if (activeIndex < 0) {
			// Between lines: the caret waits at the start of the next line.
			activeIndex = this.lines.findIndex((_, i) => units < this.lineEnds[i]);
			if (activeIndex >= 0) this.lineEls[activeIndex]?.classList.add('is-caret');
		}
		this.lineEls.forEach((el, i) => i !== activeIndex && el.classList.remove('is-caret'));

		this.pieceEls.forEach((el) => el.classList.toggle('is-on', Number(el.dataset['piece']) <= doneStep));

		// Build log: the step being written right now (or the last one once everything is done).
		const complete = units >= this.totalUnits;
		const writingStep = this.lines[activeIndex]?.step ?? Math.min(this.steps.length, doneStep + 1);
		const currentStep = complete ? this.steps.length : Math.max(1, writingStep);
		this.stepCountRef.nativeElement.textContent = `Paso ${currentStep}/${this.steps.length}`;
		this.stepLabelRef.nativeElement.textContent = this.steps[currentStep - 1] + (complete ? ' ✓' : '');
		this.showNote(currentStep);
		this.segmentEls.forEach((el, i) => {
			el.classList.toggle('is-done', i < doneStep);
			el.classList.toggle('is-current', !complete && i === currentStep - 1 && i >= doneStep);
		});
		this.sectionRef.nativeElement.classList.toggle('is-published', complete);

		this.followCaret(activeIndex < 0 ? this.lines.length - 1 : activeIndex);
		this.followSite(doneStep);
	}

	/** Phones: swaps the narrative line under the build when the step changes (soft rise-in). */
	private showNote(step: number): void {
		if (step === this.lastNoteStep) return;
		this.lastNoteStep = step;
		const el = this.storyTextRef.nativeElement;
		el.textContent = this.stepNotes[step - 1] ?? '';
		el.animate?.(
			[
				{ opacity: 0, transform: 'translateY(10px)' },
				{ opacity: 1, transform: 'none' },
			],
			{ duration: 380, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
		);
	}

	/** Keeps the line being typed inside the editor viewport. */
	private followCaret(index: number): void {
		const scroller = this.codeScrollRef.nativeElement;
		const line = this.lineEls[index];
		if (!line) return;
		const target = Math.max(0, line.offsetTop - scroller.clientHeight * 0.6);
		this.codeBodyRef.nativeElement.style.transform = `translateY(${-target}px)`;
	}

	/** Scrolls the mock browser so the newest piece of the site is in view. */
	private followSite(step: number): void {
		const viewport = this.viewportRef.nativeElement;
		const site = this.siteRef.nativeElement;
		// Only in-flow pieces drive the scroll (the floating WhatsApp button lives outside the site column).
		const piece = this.pieceEls.filter((el) => site.contains(el) && Number(el.dataset['piece']) <= step).pop();
		if (!piece) {
			this.siteRef.nativeElement.style.transform = 'translateY(0)';
			return;
		}
		const bottom = piece.offsetTop + piece.offsetHeight + 16;
		const target = Math.max(0, bottom - viewport.clientHeight);
		this.siteRef.nativeElement.style.transform = `translateY(${-target}px)`;
	}
}

/** Tiny HTML-ish highlighter for the hero snippet: tags, attributes, strings and text. */
function highlight(source: string): CodeToken[] {
	const tokens: CodeToken[] = [];
	const re = /(<\/?[a-z][a-z0-9-]*)|(\s\*?[\[(]?[a-zA-Z-]+[\])]?=)|("[^"]*")|(\/?>)|([^<"]+)/g;
	let match: RegExpExecArray | null;
	while ((match = re.exec(source))) {
		if (match[1]) tokens.push({ text: match[1], kind: 'tag' });
		else if (match[2]) tokens.push({ text: match[2], kind: 'attr' });
		else if (match[3]) tokens.push({ text: match[3], kind: 'str' });
		else if (match[4]) tokens.push({ text: match[4], kind: 'punct' });
		else if (match[5]) tokens.push({ text: match[5], kind: 'text' });
	}
	return tokens;
}
