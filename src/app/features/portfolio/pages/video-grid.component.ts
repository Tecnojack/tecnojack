import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';

import { PortfolioPlaylistVideo } from '../portfolio.data';
import { VideoCardComponent } from './video-card.component';

@Component({
  selector: 'tj-video-grid',
  standalone: true,
  imports: [NgFor, NgIf, VideoCardComponent],
  templateUrl: './video-grid.component.html',
  styleUrl: './video-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoGridComponent {
  private readonly expandedState = signal(false);
  private readonly videosState = signal<PortfolioPlaylistVideo[]>([]);

  @Output() openVideo = new EventEmitter<PortfolioPlaylistVideo>();

  @Input({ required: true })
  set items(value: PortfolioPlaylistVideo[]) {
    this.videosState.set(value ?? []);
    this.expandedState.set(false);
  }

  readonly hasOverflow = computed(() => this.videosState().length > 6);
  readonly visibleVideos = computed(() => (this.expandedState() ? this.videosState() : this.videosState().slice(0, 6)));
  readonly expanded = this.expandedState.asReadonly();

  toggleExpanded(): void {
    this.expandedState.update((current) => !current);
  }

  handleOpen(video: PortfolioPlaylistVideo): void {
    this.openVideo.emit(video);
  }
}
