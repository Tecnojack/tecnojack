import type { gsap as GsapInstance } from 'gsap';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';

/**
 * Lazily loaded motion runtime shared by the portfolio landing (page motion layer + pinned lens scene).
 * GSAP, ScrollTrigger and Lenis live in their own chunk so the initial bundle is untouched.
 */
export interface MotionRuntime {
	gsap: typeof GsapInstance;
	ScrollTrigger: typeof ScrollTriggerClass;
	/** Starts (or reuses) smooth scrolling. Returns a detach function; Lenis stops when the last user detaches. */
	attachLenis: () => () => void;
}

let runtimePromise: Promise<MotionRuntime> | null = null;

export function prefersReducedMotion(): boolean {
	return typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function loadMotionRuntime(): Promise<MotionRuntime> {
	runtimePromise ??= (async () => {
		const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
			import('gsap'),
			import('gsap/ScrollTrigger'),
			import('lenis'),
		]);
		gsap.registerPlugin(ScrollTrigger);

		let lenis: InstanceType<typeof Lenis> | null = null;
		let users = 0;
		const tick = (time: number) => lenis?.raf(time * 1000);

		const attachLenis = () => {
			users += 1;
			// Touch devices keep native momentum scrolling; Lenis only smooths wheel/trackpad input.
			if (!lenis) {
				lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9, anchors: true });
				lenis.on('scroll', ScrollTrigger.update);
				gsap.ticker.add(tick);
				gsap.ticker.lagSmoothing(0);
				document.documentElement.classList.add('lenis', 'lenis-smooth');
			}
			let detached = false;
			return () => {
				if (detached) return;
				detached = true;
				users -= 1;
				if (users > 0 || !lenis) return;
				gsap.ticker.remove(tick);
				gsap.ticker.lagSmoothing(500, 33);
				lenis.destroy();
				lenis = null;
				document.documentElement.classList.remove('lenis', 'lenis-smooth');
			};
		};

		return { gsap, ScrollTrigger, attachLenis };
	})();
	return runtimePromise;
}
