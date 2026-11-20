import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  ViewChild,
  afterNextRender,
  effect,
  inject,
  signal
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

import { PortfolioContactLink, PortfolioNavItem } from './portfolio.data';
import { PortfolioContentService } from './services/portfolio-content.service';
import { I18nService } from '../../core/services/i18n.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'tj-portfolio-shell',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './portfolio-shell.component.html',
  styleUrl: './portfolio-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioShellComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly i18n = inject(I18nService);
  readonly theme = inject(ThemeService);
  private readonly zone = inject(NgZone);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('headerEl') private headerRef?: ElementRef<HTMLElement>;
  @ViewChild('navEl') private navRef?: ElementRef<HTMLElement>;
  @ViewChild('navIndicator') private indicatorRef?: ElementRef<HTMLElement>;

  constructor() {
    effect(() => {
      this.i18n.currentLang();
      this.theme.activeTheme();
      this.cdr.markForCheck();
      // Labels change width with the language: re-measure the indicator.
      queueMicrotask(() => this.moveIndicatorToActive());
    });

    afterNextRender(() => this.zone.runOutsideAngular(() => this.initHeaderMotion()));
  }

  // ─── Header motion: scrolled state, reading progress, sliding nav indicator ──────────────────
  private initHeaderMotion(): void {
    const header = this.headerRef?.nativeElement;
    if (!header) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 8);
      header.style.setProperty('--scroll-progress', String(Math.min(1, Math.max(0, y / max))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    const nav = this.navRef?.nativeElement;
    const onOver = (event: Event) => {
      const link = (event.target as Element | null)?.closest<HTMLElement>('.portfolio-header__nav-link');
      if (link) this.moveIndicatorTo(link);
    };
    const onLeave = () => this.moveIndicatorToActive();
    nav?.addEventListener('pointerover', onOver);
    nav?.addEventListener('focusin', onOver);
    nav?.addEventListener('pointerleave', onLeave);
    nav?.addEventListener('focusout', onLeave);

    const resizeObserver = nav ? new ResizeObserver(() => this.moveIndicatorToActive()) : null;
    if (nav) resizeObserver?.observe(nav);
    const navSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => requestAnimationFrame(() => this.moveIndicatorToActive()));
    // Fonts can change link widths after first paint.
    document.fonts?.ready.then(() => this.moveIndicatorToActive());
    requestAnimationFrame(() => this.moveIndicatorToActive());

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      nav?.removeEventListener('pointerover', onOver);
      nav?.removeEventListener('focusin', onOver);
      nav?.removeEventListener('pointerleave', onLeave);
      nav?.removeEventListener('focusout', onLeave);
      resizeObserver?.disconnect();
      navSub.unsubscribe();
    });
  }

  private moveIndicatorTo(link: HTMLElement | null): void {
    const indicator = this.indicatorRef?.nativeElement;
    const nav = this.navRef?.nativeElement;
    if (!indicator || !nav) return;
    if (!link) {
      indicator.style.opacity = '0';
      return;
    }
    nav.classList.add('has-indicator');
    indicator.style.opacity = '1';
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
  }

  private moveIndicatorToActive(): void {
    const nav = this.navRef?.nativeElement;
    if (!nav) return;
    this.moveIndicatorTo(nav.querySelector<HTMLElement>('.portfolio-header__nav-link--active'));
  }

  @Input({ required: true }) navItems: PortfolioNavItem[] = [];

  get headerNavItems(): PortfolioNavItem[] {
    return this.navItems.filter(
      (item) => item.href !== '/portfolio/corporativos' && item.href !== '/otros'
    );
  }

  getNavLabel(item: PortfolioNavItem): string {
    const map: Record<string, string> = {
      '/portfolio': 'nav.home',
      '/portfolio/bodas': 'nav.bodas',
      '/portfolio/quinces': 'nav.quinces',
      '/portfolio/grados': 'nav.grados',
      '/portfolio/videos': 'nav.videos',
      '/portfolio/sesiones': 'nav.sesiones',
      '/portfolio/soluciones': 'nav.soluciones',
      '/soluciones': 'nav.soluciones',
      '/portfolio/sobre-mi': 'nav.sobre_mi',
      '/portfolio/corporativos': 'nav.corporativos',
      '/otros': 'nav.otros',
      '#services': 'nav.cotizar',
      '#contact': 'nav.contacto'
    };
    const key = map[item.href];
    return key ? this.i18n.t(key, item.label) : item.label;
  }

  @Input() brandHref = '/portfolio';
  @Input() headerCtaHref?: string;
  @Input() headerCtaLabel = 'WhatsApp';
  @Input() headerCtaExternal = true;
  @Input() subtitle = '';

  get resolvedSubtitle(): string {
    if (!this.subtitle) return '';
    if (this.i18n.isEn()) {
      const map: Record<string, string> = {
        'Bodas': 'Weddings',
        '15 Años': 'Sweet 15',
        'Grados': 'Graduations',
        'Sesiones': 'Sessions',
        'Videos': 'Cinema & Video',
        'Corporativos': 'Corporate',
        'Preboda': 'Engagement',
        'Sobre mí': 'About Me',
        'Soluciones': 'Solutions'
      };
      return map[this.subtitle] ?? this.subtitle;
    }
    return this.subtitle;
  }
  @Input() footerText?: string;
  @Input() editable = false;
  @Input() floatWaHref?: string;
  @Input() hideHeader = false;

  readonly isMenuOpen = signal(false);
  readonly isMobileNavOpen = signal(false);

  toggleFloatingMenu(): void {
    this.isMenuOpen.update((val) => !val);
  }

  closeFloatingMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleMobileNav(): void {
    this.isMobileNavOpen.update((val) => !val);
    if (this.isMobileNavOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileNav(): void {
    this.isMobileNavOpen.set(false);
    document.body.style.overflow = '';
  }

  toggleTheme(): void {
    this.theme.toggleTheme();
  }

  toggleLanguage(): void {
    this.i18n.toggleLang();
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    if (this.isMenuOpen()) {
      this.closeFloatingMenu();
    }
    if (this.isMobileNavOpen()) {
      this.closeMobileNav();
    }
  }

  get resolvedHeaderCtaHref(): string {
    return this.headerCtaHref || this.content.whatsappHref();
  }

  get resolvedFooterText(): string {
    return this.footerText || this.content.footerText();
  }

  get whatsappHref(): string {
    return this.floatWaHref ?? this.content.whatsappHref();
  }

  get contactLinks(): Array<PortfolioContactLink & { iconSrc?: string }> {
    const iconMap: Record<string, string> = {
      whatsapp: 'assets/images/icons/whatsapp.svg',
      instagram: 'assets/images/icons/instagram.svg',
      youtube: 'assets/images/icons/youtube.svg',
      facebook: 'assets/images/icons/facebook.svg',
      tiktok: 'assets/images/icons/tiktok.svg'
    };

    return this.content.contactLinks().map((link) => ({
      ...link,
      iconSrc: iconMap[link.platform]
    }));
  }

  isInternalRoute(href: string): boolean {
    return href.startsWith('/') && !href.includes('#');
  }

  useExactMatch(href: string): boolean {
    return href === '/portfolio' || href === '/brand';
  }
}
