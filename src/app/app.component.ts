import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TravelBackgroundComponent } from './shared/backgrounds/travel-background.component';
import { BackgroundAudioService } from './core/services/background-audio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TravelBackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  readonly audio = inject(BackgroundAudioService);
  title = 'tecnojack-wedding-engine';

  ngOnInit(): void {
    this.audio.start();
  }
}
