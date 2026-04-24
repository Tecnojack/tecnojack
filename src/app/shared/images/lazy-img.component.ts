import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'tj-lazy-img',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lazy-img" [style.aspect-ratio]="aspectRatio">
      <div class="lazy-img__skeleton" *ngIf="!loaded()"></div>
      <img
        *ngIf="inView()"
        [src]="src"
        [alt]="alt"
        [attr.loading]="loading"
        decoding="async"
        class="lazy-img__image"
        [class.lazy-img__image--loaded]="loaded()"
        (load)="onLoad()"
        (error)="onError()" />
    </div>
  `,
  styles: [
    `
      .lazy-img {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #ececec;
      }

      .lazy-img__skeleton {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #ececec 25%, #f6f6f6 37%, #ececec 63%);
        background-size: 400% 100%;
        filter: blur(1px);
        animation: lazy-shimmer 1.3s ease-in-out infinite;
      }

      .lazy-img__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transition: opacity 180ms ease;
      }

      .lazy-img__image--loaded {
        opacity: 1;
      }

      @keyframes lazy-shimmer {
        0% {
          background-position: 100% 0;
        }
        100% {
          background-position: 0 0;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyImgComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly cdr = inject(ChangeDetectorRef);
  private observer?: IntersectionObserver;

  @Input({ required: true }) src = '';
  @Input() alt = '';
  @Input() loading: 'lazy' | 'eager' = 'lazy';
  @Input() aspectRatio = '4 / 3';

  readonly inView = signal(false);
  readonly loaded = signal(false);

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          this.inView.set(true);
          this.observer?.disconnect();
          this.observer = undefined;
          this.cdr.markForCheck();
        }
      },
      { rootMargin: '200px 0px' },
    );

    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onLoad(): void {
    this.loaded.set(true);
    this.cdr.markForCheck();
  }

  onError(): void {
    this.src = 'assets/images/placeholder.jpg';
    this.loaded.set(true);
    this.cdr.markForCheck();
  }
}
