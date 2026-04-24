import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  computed,
  effect,
  inject,
  Input,
  signal
} from '@angular/core';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { PortfolioGalleryItem } from '../portfolio.data';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { optimizeImage } from '../../../core/utils/image-optimizer.util';

type PhotoSwipeLightboxModule = typeof import('photoswipe/lightbox');
type PhotoSwipeLightboxType = InstanceType<PhotoSwipeLightboxModule['default']>;

type GallerySize = { w: number; h: number };

@Component({
  selector: 'tj-gallery-section',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RevealOnScrollDirective, FallbackImageDirective],
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GallerySectionComponent implements AfterViewInit {
  readonly placeholderImage = 'assets/images/placeholder.jpg';
  private readonly destroyRef = inject(DestroyRef);
  private readonly content = inject(PortfolioContentService);

  @Input() editable = false;

  @ViewChild('pswpGallery', { read: ElementRef })
  private readonly pswpGallery?: ElementRef<HTMLElement>;

  private pswp?: PhotoSwipeLightboxType;
  private readonly gallerySizes = signal<Record<string, GallerySize>>({});
  readonly isExpanded = signal(false);
  readonly allItems = computed(() => this.content.galleryItems());
  readonly heading = computed(() => this.content.gallerySectionHeading());
  readonly hasMoreItems = computed(() => this.allItems().length > 6);

  readonly items = computed(() => (this.isExpanded() ? this.allItems() : this.allItems().slice(0, 6)));
  readonly galleryMeta = computed(() => {
    const sizes = this.gallerySizes();
    return this.items().map((item, index) => {
      const size = sizes[item.src];
      return {
        ...item,
        width: size?.w ?? 1600,
        height: size?.h ?? 1067,
        layoutClass: this.galleryLayoutClass(index)
      };
    });
  });

  constructor() {
    effect(() => {
      this.loadGallerySizes(this.allItems());
    });

    this.destroyRef.onDestroy(() => {
      this.pswp?.destroy();
      this.pswp = undefined;
    });
  }

  async ngAfterViewInit(): Promise<void> {
    const host = this.pswpGallery?.nativeElement;
    if (!host) return;

    const mod = (await import('photoswipe/lightbox')) as PhotoSwipeLightboxModule;
    const PhotoSwipeLightbox = mod.default;

    this.pswp = new PhotoSwipeLightbox({
      gallery: host,
      children: 'a',
      pswpModule: () => import('photoswipe')
    });

    this.pswp.init();
  }

  private galleryLayoutClass(index: number): string {
    const pattern = ['gallery-item--tall', '', 'gallery-item--wide', '', 'gallery-item--tall', '', 'gallery-item--wide'];
    return pattern[index % pattern.length] ?? '';
  }

  private loadGallerySizes(items: PortfolioGalleryItem[]): void {
    items.forEach((item) => {
      if (this.gallerySizes()[item.src]) return;

      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        this.gallerySizes.update((current) => ({
          ...current,
          [item.src]: { w: img.naturalWidth || 1600, h: img.naturalHeight || 1067 }
        }));
      };
      img.src = item.src;
    });
  }

  toggleExpanded(): void {
    this.isExpanded.update((value) => !value);
  }

  optimizeImage(url: string, width = 400): string {
    return optimizeImage(url, width);
  }

  trackByGallerySrc(index: number, item: PortfolioGalleryItem): string {
    return item.src || String(index);
  }
}
