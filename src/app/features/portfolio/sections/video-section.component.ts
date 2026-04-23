import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { PortfolioContentService } from '../services/portfolio-content.service';

type VideoCard = {
  title: string;
  description: string;
  duration: string;
  format: string;
  embedUrl: SafeResourceUrl;
};

@Component({
  selector: 'tj-video-section',
  standalone: true,
  imports: [NgFor, NgIf, RevealOnScrollDirective],
  templateUrl: './video-section.component.html',
  styleUrl: './video-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoSectionComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly sanitizer = inject(DomSanitizer);

  @Input() editable = false;
  readonly heading = computed(() => this.content.videoSectionHeading());

  private readonly itemsSignal = computed<VideoCard[]>(() =>
    this.content.landingVideos().map((item) => ({
      title: item.title,
      description: item.description,
      duration: item.duration,
      format: item.format,
      embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0&modestbranding=1&controls=1`
      )
    }))
  );

  get items() {
    return this.itemsSignal();
  }
}
