import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { MediaPublicService } from '../../../shared/media/media-public.service';
import { SimpleService } from '../models/simple-service.model';

@Component({
  selector: 'tj-simple-service-card',
  standalone: true,
  imports: [AsyncPipe, NgIf, FallbackImageDirective],
  templateUrl: './simple-service-card.component.html',
  styleUrl: './simple-service-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleServiceCardComponent {
  private readonly mediaPublic = inject(MediaPublicService);

  @Input({ required: true }) service!: SimpleService;
  @Output() openDetail = new EventEmitter<SimpleService>();

  get coverImage$(): Observable<string> {
    const folderPath = `servicios/otros/${this.service.category}/${this.service.id}`;
    return this.mediaPublic.getRealImage(folderPath);
  }

  onSelect(): void {
    this.openDetail.emit(this.service);
  }
}
