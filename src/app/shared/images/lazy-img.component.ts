import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
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
        *ngIf="inView() && hasSource()"
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
        background:
          linear-gradient(180deg, rgba(8, 24, 29, 0.22), rgba(8, 24, 29, 0.36));
      }

      .lazy-img__skeleton {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(110deg, rgba(255, 255, 255, 0.04) 8%, rgba(255, 255, 255, 0.14) 18%, rgba(255, 255, 255, 0.04) 33%),
          linear-gradient(180deg, rgba(8, 24, 29, 0.14), rgba(8, 24, 29, 0.28));
        background-size: 240% 100%, 100% 100%;
        animation: lazy-shimmer 1.2s linear infinite;
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
          background-position: 200% 0, 0 0;
        }
        100% {
          background-position: -20% 0, 0 0;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyImgComponent implements AfterViewInit, OnChanges, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly cdr = inject(ChangeDetectorRef);
  private observer?: IntersectionObserver;

  @Input({ required: true }) src = '';
  @Input() alt = '';
  @Input() loading: 'lazy' | 'eager' = 'lazy';
  @Input() aspectRatio = '4 / 3';

  readonly inView = signal(false);
  readonly loaded = signal(false);
  readonly hasSource = signal(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['src']) {
      return;
    }

    const nextSrc = this.src.trim();

    this.hasSource.set(nextSrc.length > 0);
    this.loaded.set(false);
    this.cdr.markForCheck();
  }

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
    if (this.src === 'assets/images/placeholder.jpg') {
      this.loaded.set(true);
      this.cdr.markForCheck();
      return;
    }

    this.src = 'assets/images/placeholder.jpg';
    this.hasSource.set(true);
    this.loaded.set(false);
    this.cdr.markForCheck();
  }
}
