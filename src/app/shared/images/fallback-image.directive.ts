import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  inject,
} from '@angular/core';

const DEFAULT_FALLBACK_IMAGE = 'assets/images/placeholders/default-media.svg';

@Directive({
  selector: 'img[tjFallbackImage]',
  standalone: true
})
export class FallbackImageDirective implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLImageElement>);
  private observer?: MutationObserver;
  private lastObservedSource = '';
  private parentElement?: HTMLElement;

  @Input('tjFallbackImage') fallbackSrc = DEFAULT_FALLBACK_IMAGE;

  @HostBinding('class.tj-image') readonly baseClass = true;
  @HostBinding('class.tj-image--loading') isLoading = true;
  @HostBinding('class.tj-image--loaded') isLoaded = false;

  ngAfterViewInit(): void {
    const image = this.elementRef.nativeElement;
    this.parentElement = image.parentElement ?? undefined;
    this.parentElement?.classList.add('tj-image-frame');

    this.lastObservedSource = this.getObservedSource();
    this.syncLoadingState();

    this.observer = new MutationObserver(() => {
      const nextSource = this.getObservedSource();

      if (nextSource === this.lastObservedSource) {
        return;
      }

      this.lastObservedSource = nextSource;
      this.markLoading();
      this.syncLoadingState();
    });

    this.observer.observe(image, {
      attributes: true,
      attributeFilter: ['src', 'srcset'],
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('load')
  handleLoad(): void {
    this.markLoaded();
  }

  @HostListener('error')
  handleError(): void {
    const image = this.elementRef.nativeElement;
    const fallbackSrc = String(this.fallbackSrc || DEFAULT_FALLBACK_IMAGE).trim() || DEFAULT_FALLBACK_IMAGE;

    if (image.dataset['fallbackApplied'] === 'true' || image.src.endsWith(fallbackSrc)) {
      this.markLoaded();
      return;
    }

    image.dataset['fallbackApplied'] = 'true';
    this.markLoading();
    image.src = fallbackSrc;
  }

  private syncLoadingState(): void {
    const image = this.elementRef.nativeElement;
    const hasSource = !!this.getObservedSource();

    if (!hasSource) {
      this.markLoaded();
      return;
    }

    if (image.complete && image.naturalWidth > 0) {
      this.markLoaded();
      return;
    }

    this.markLoading();
  }

  private getObservedSource(): string {
    const image = this.elementRef.nativeElement;
    return image.currentSrc || image.getAttribute('src') || image.getAttribute('srcset') || '';
  }

  private markLoading(): void {
    this.isLoading = true;
    this.isLoaded = false;
    this.parentElement?.classList.add('tj-image-frame--loading');
    this.parentElement?.classList.remove('tj-image-frame--loaded');
  }

  private markLoaded(): void {
    this.isLoading = false;
    this.isLoaded = true;
    this.parentElement?.classList.remove('tj-image-frame--loading');
    this.parentElement?.classList.add('tj-image-frame--loaded');
  }
}
