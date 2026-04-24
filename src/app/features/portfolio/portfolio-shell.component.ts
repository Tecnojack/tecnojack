import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { PortfolioContactLink, PortfolioNavItem } from './portfolio.data';
import { PortfolioContentService } from './services/portfolio-content.service';

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

  @Input({ required: true }) navItems: PortfolioNavItem[] = [];
  @Input() brandHref = '/portfolio';
  @Input() headerCtaHref?: string;
  @Input() headerCtaLabel = 'WhatsApp';
  @Input() headerCtaExternal = true;
  @Input() subtitle = 'Estudio audiovisual';
  @Input() footerText?: string;
  @Input() editable = false;
  @Input() floatWaHref?: string;
  @Input() hideHeader = false;

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
    return href === '/portfolio';
  }
}
