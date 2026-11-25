import { NgFor, NgIf } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	NgZone,
	afterNextRender,
	computed,
	inject,
	signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../../core/services/i18n.service';
import { prefersReducedMotion } from '../../../shared/motion/motion-runtime';
import {
	type Bilingual,
	DEV_ARCHITECTURE,
	DEV_EDUCATION,
	DEV_EXPERIENCE,
	DEV_HEADLINE,
	DEV_LINKEDIN_URL,
	DEV_MODES,
	DEV_REFERENCES,
	DEV_SKILLS,
	DEV_STATS,
} from '../data/developer-profile.content';
import { buildPortfolioWhatsappHref } from '../portfolio.data';

type WorkMode = 'company' | 'freelance';

/**
 * "Perfil desarrollador" on the about page: Jackson as a software engineer for companies and as a freelancer.
 * Interactive pieces: rotating role line, count-up stats, work-mode switch, experience explorer (tabs),
 * Micro Frontend diagram, skill filter, references and education. Content lives in developer-profile.content.ts.
 */
@Component({
	selector: 'tj-developer-profile',
	standalone: true,
	imports: [NgFor, NgIf, RouterLink],
	templateUrl: './developer-profile.component.html',
	styleUrl: './developer-profile.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeveloperProfileComponent {
	private readonly host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
	private readonly zone = inject(NgZone);
	private readonly destroyRef = inject(DestroyRef);
	readonly i18n = inject(I18nService);

	readonly headline = DEV_HEADLINE;
	readonly stats = DEV_STATS;
	readonly modes = DEV_MODES;
	readonly experience = DEV_EXPERIENCE;
	readonly skills = DEV_SKILLS;
	readonly architecture = DEV_ARCHITECTURE;
	readonly education = DEV_EDUCATION;
	readonly references = DEV_REFERENCES;
	readonly linkedinUrl = DEV_LINKEDIN_URL;

	/** Rotating role in the intro ("Senior Frontend Engineer" → "Frontend Architect" → …). */
	readonly roleIndex = signal(0);
	/** Count-up progress 0..1 for the stats. */
	readonly statProgress = signal(0);
	readonly mode = signal<WorkMode>('company');
	readonly activeJobId = signal(DEV_EXPERIENCE[0].id);
	readonly activeJob = computed(() => this.experience.find((job) => job.id === this.activeJobId()) ?? this.experience[0]);
	readonly activeNodeId = signal('shell');
	readonly activeNode = computed(() => this.architecture.find((node) => node.id === this.activeNodeId()) ?? this.architecture[0]);
	readonly skillFilter = signal<string>('all');
	readonly visibleSkills = computed(() => {
		const filter = this.skillFilter();
		return filter === 'all' ? this.skills : this.skills.filter((group) => group.id === filter);
	});

	readonly remotes = DEV_ARCHITECTURE.filter((node) => node.kind === 'remote');

	constructor() {
		afterNextRender(() => this.zone.runOutsideAngular(() => this.initMotion()));
	}

	t(copy: Bilingual): string {
		return this.i18n.isEn() ? copy.en : copy.es;
	}

	statValue(target: number): number {
		return Math.round(target * this.statProgress());
	}

	selectJob(id: string): void {
		this.activeJobId.set(id);
	}

	/** Arrow-key navigation for the experience tablist (WAI-ARIA tabs pattern). */
	onJobKey(event: KeyboardEvent, index: number): void {
		const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
		let next = index;
		if (event.key in keys) next = (index + keys[event.key] + this.experience.length) % this.experience.length;
		else if (event.key === 'Home') next = 0;
		else if (event.key === 'End') next = this.experience.length - 1;
		else return;
		event.preventDefault();
		this.activeJobId.set(this.experience[next].id);
		this.host.querySelector<HTMLElement>(`#dev-tab-${this.experience[next].id}`)?.focus();
	}

	get companyWhatsappHref(): string {
		return buildPortfolioWhatsappHref(
			this.i18n.isEn()
				? 'Hello Jackson, I saw your developer profile and would like to talk about a position on our team.'
				: 'Hola Jackson, vi tu perfil de desarrollador y quiero hablar de una vacante en nuestro equipo.'
		);
	}

	get freelanceWhatsappHref(): string {
		return buildPortfolioWhatsappHref(
			this.i18n.isEn()
				? 'Hello TECNOJACK, I would like to quote a software project.'
				: 'Hola TECNOJACK, quiero cotizar un proyecto de software.'
		);
	}

	readonly trackById = (_: number, item: { id: string }) => item.id;
	readonly trackByValue = (_: number, item: string) => item;

	private initMotion(): void {
		const reduced = prefersReducedMotion();
		const cleanups: Array<() => void> = [];

		// Rotating role line.
		if (!reduced) {
			const timer = window.setInterval(() => {
				this.zone.run(() => this.roleIndex.update((i) => (i + 1) % this.headline.roles.length));
			}, 2600);
			cleanups.push(() => window.clearInterval(timer));
		}

		// Count-up stats when they enter the screen.
		const statsEl = this.host.querySelector('[data-stats]');
		if (reduced || !statsEl || !('IntersectionObserver' in window)) {
			this.zone.run(() => this.statProgress.set(1));
		} else {
			const io = new IntersectionObserver(
				(entries) => {
					if (!entries.some((entry) => entry.isIntersecting)) return;
					io.disconnect();
					const start = performance.now();
					const tick = (now: number) => {
						const t = Math.min(1, (now - start) / 1200);
						this.zone.run(() => this.statProgress.set(1 - Math.pow(1 - t, 3)));
						if (t < 1) requestAnimationFrame(tick);
					};
					requestAnimationFrame(tick);
				},
				{ threshold: 0.4 }
			);
			io.observe(statsEl);
			cleanups.push(() => io.disconnect());
		}

		// Soft rise-in for blocks.
		const blocks = Array.from(this.host.querySelectorAll<HTMLElement>('[data-rise]'));
		if (!reduced && 'IntersectionObserver' in window) {
			this.host.classList.add('is-motion');
			const io = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (!entry.isIntersecting) return;
						entry.target.classList.add('is-in');
						io.unobserve(entry.target);
					});
				},
				{ threshold: 0.15 }
			);
			blocks.forEach((block) => io.observe(block));
			cleanups.push(() => io.disconnect());
		}

		this.destroyRef.onDestroy(() => cleanups.forEach((fn) => fn()));
	}
}
