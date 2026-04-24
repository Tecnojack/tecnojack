import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';

import { PortfolioPlaylistVideo } from '../portfolio.data';
import { VideoGridComponent } from './video-grid.component';

export type VideoAccordionCategory = {
  key: string;
  title: string;
  summary: string;
  playlistUrl?: string;
  videos: PortfolioPlaylistVideo[];
};

@Component({
  selector: 'tj-video-accordion',
  standalone: true,
  imports: [NgFor, NgIf, VideoGridComponent],
  templateUrl: './video-accordion.component.html',
  styleUrl: './video-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoAccordionComponent {
  @Input({ required: true }) categories: VideoAccordionCategory[] = [];
  @Output() openVideo = new EventEmitter<PortfolioPlaylistVideo>();

  readonly openCategoryKey = signal<string | null>('musicales');

  toggleCategory(key: string): void {
    this.openCategoryKey.update((current) => (current === key ? null : key));
  }

  isOpen(key: string): boolean {
    return this.openCategoryKey() === key;
  }

  handleOpenVideo(video: PortfolioPlaylistVideo): void {
    this.openVideo.emit(video);
  }
}
