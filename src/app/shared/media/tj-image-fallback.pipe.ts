import { Pipe, PipeTransform, inject } from '@angular/core';

import { MediaPublicService } from './media-public.service';

@Pipe({
  name: 'tjImageFallback',
  standalone: true,
})
export class TjImageFallbackPipe implements PipeTransform {
  private readonly mediaPublic = inject(MediaPublicService);

  transform(url?: string | null): string {
    return this.mediaPublic.resolveImage(url);
  }
}
