import { NgIf } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TravelBackgroundComponent } from './shared/backgrounds/travel-background.component';
import { BackgroundAudioService } from './core/services/background-audio.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterOutlet, TravelBackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  readonly audio = inject(BackgroundAudioService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly documentTitle = inject(Title);
  private readonly documentRef = inject(DOCUMENT);
  appTitle = 'TECNOJACK';
  showTravelShell = true;

  ngOnInit(): void {
    this.syncShellState(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.syncShellState(event.urlAfterRedirects);
        const { wedding, guest } = this.getRouteParams();
        if (this.isPortfolioRoute(this.router.url)) {
          this.documentTitle.setTitle('TECNOJACK | Portfolio');
          return;
        }

        if (this.isMediaAdminRoute(this.router.url)) {
          this.documentTitle.setTitle('TECNOJACK | Media Admin');
          return;
        }

        const slug = guest || wedding;
        this.documentTitle.setTitle(slug ? `TECNOJACK | ${slug}` : 'TECNOJACK');
      });
  }

  private syncShellState(url: string): void {
    const isPortfolio = this.isPortfolioRoute(url);
    const isAdmin = this.isMediaAdminRoute(url);
    this.showTravelShell = !isPortfolio && !isAdmin;
    this.documentRef.body.classList.toggle('portfolio-route', isPortfolio);
    this.documentRef.documentElement.classList.toggle('portfolio-route', isPortfolio);
    this.documentRef.body.classList.toggle('media-admin-route', isAdmin);
    this.documentRef.documentElement.classList.toggle('media-admin-route', isAdmin);

    const isWeddingInvitation = this.getRouteData<boolean>('audio') === true;

    if (isWeddingInvitation) {
      this.audio.start();
    } else {
      this.audio.pause();
    }
  }

  private isPortfolioRoute(url: string): boolean {
    const normalized = String(url ?? '').split('?')[0]?.split('#')[0] ?? '';
    return normalized === '/portfolio' || normalized.startsWith('/portfolio/');
  }

  private isMediaAdminRoute(url: string): boolean {
    const normalized = String(url ?? '').split('?')[0]?.split('#')[0] ?? '';
    return normalized === '/media-admin' || normalized.startsWith('/media-admin/');
  }

  private getRouteParams(): { wedding: string; guest: string } {
    let current: ActivatedRoute | null = this.route;
    while (current?.firstChild) current = current.firstChild;

    const snapshot = current?.snapshot;
    return {
      wedding: String(snapshot?.paramMap.get('wedding') ?? ''),
      guest: String(snapshot?.paramMap.get('guest') ?? '')
    };
  }

  private getRouteData<T>(key: string): T | undefined {
    let current: ActivatedRoute | null = this.route;
    while (current?.firstChild) current = current.firstChild;
    return current?.snapshot?.data?.[key] as T | undefined;
  }
}
