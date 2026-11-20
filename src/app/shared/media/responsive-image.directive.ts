import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';

import { localizedSrcset } from './localized-image.util';

/**
 * `<img tjResponsive [src]="..." sizes="...">`: when `src` is a localized image
 * (`assets/images/site/<slug>-<w>.webp`) the browser gets a `srcset` with every generated width,
 * so phones download the 640/1080 px file and large screens the 1600 px one. Other sources pass through.
 */
@Directive({
	selector: 'img[tjResponsive]',
	standalone: true,
})
export class ResponsiveImageDirective implements OnChanges {
	private readonly img = inject(ElementRef<HTMLImageElement>).nativeElement as HTMLImageElement;

	@Input() src: string | null | undefined;
	/** CSS `sizes` hint describing the rendered width. */
	@Input() sizes = '100vw';

	ngOnChanges(): void {
		const src = String(this.src ?? '');
		const srcset = localizedSrcset(src);
		if (srcset) {
			this.img.setAttribute('sizes', this.sizes);
			this.img.setAttribute('srcset', srcset);
		} else {
			this.img.removeAttribute('srcset');
			this.img.removeAttribute('sizes');
		}
		this.img.src = src;
	}
}
