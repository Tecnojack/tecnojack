import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { PortfolioPlaylistVideo } from '../portfolio.data';

@Component({
  selector: 'tj-video-card',
  standalone: true,
  imports: [FallbackImageDirective],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoCardComponent {
  @Input({ required: true }) video!: PortfolioPlaylistVideo;
  @Output() open = new EventEmitter<PortfolioPlaylistVideo>();

  handleOpen(): void {
    this.open.emit(this.video);
  }
}
