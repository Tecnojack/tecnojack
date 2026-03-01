import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TravelBackgroundComponent } from './shared/backgrounds/travel-background.component';
import { BackgroundAudioService } from './core/services/background-audio.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TravelBackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  readonly audio = inject(BackgroundAudioService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly documentTitle = inject(Title);
  appTitle = 'TECNOJACK';

  ngOnInit(): void {
    this.audio.start();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const { wedding, guest } = this.getRouteParams();
        const slug = guest || wedding;
        this.documentTitle.setTitle(slug ? `TECNOJACK | ${slug}` : 'TECNOJACK');
      });
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
}
