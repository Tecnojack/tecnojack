import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

const DEFAULT_FALLBACK_IMAGE = 'assets/images/placeholders/default-media.svg';

@Directive({
  selector: 'img[tjFallbackImage]',
  standalone: true
})
export class FallbackImageDirective {
  private readonly elementRef = inject(ElementRef<HTMLImageElement>);

  @Input('tjFallbackImage') fallbackSrc = DEFAULT_FALLBACK_IMAGE;

  @HostListener('error')
  handleError(): void {
    const image = this.elementRef.nativeElement;
    const fallbackSrc = String(this.fallbackSrc || DEFAULT_FALLBACK_IMAGE).trim() || DEFAULT_FALLBACK_IMAGE;

    if (image.dataset['fallbackApplied'] === 'true' || image.src.endsWith(fallbackSrc)) {
      return;
    }

    image.dataset['fallbackApplied'] = 'true';
    image.src = fallbackSrc;
  }
}
