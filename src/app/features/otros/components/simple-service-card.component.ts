import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { SimpleService } from '../models/simple-service.model';

@Component({
  selector: 'tj-simple-service-card',
  standalone: true,
  imports: [],
  templateUrl: './simple-service-card.component.html',
  styleUrl: './simple-service-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleServiceCardComponent {
  @Input({ required: true }) service!: SimpleService;
  @Output() openDetail = new EventEmitter<SimpleService>();

  readonly fallbackImage = 'assets/images/placeholders/service-placeholder.jpg';

  get imageSrc(): string {
    return this.service.image ?? this.fallbackImage;
  }

  onSelect(): void {
    this.openDetail.emit(this.service);
  }
}
