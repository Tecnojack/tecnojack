import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  inject,
  signal
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  readonly i18n = inject(I18nService);
  readonly theme = inject(ThemeService);

  @Input({ required: true }) navItems: PortfolioNavItem[] = [];

  get headerNavItems(): PortfolioNavItem[] {
    return this.navItems.filter(
      (item) => item.href !== '/portfolio/corporativos' && item.href !== '/otros'
    );
  }

  @Input() brandHref = '/portfolio';
  @Input() headerCtaHref?: string;
  @Input() headerCtaLabel = 'WhatsApp';
  @Input() headerCtaExternal = true;
  @Input() subtitle = '';
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
