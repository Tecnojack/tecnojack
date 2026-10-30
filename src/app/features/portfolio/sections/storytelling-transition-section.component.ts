import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'tj-storytelling-transition-section',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './storytelling-transition-section.component.html',
  styleUrl: './storytelling-transition-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorytellingTransitionSectionComponent {
  readonly i18n = inject(I18nService);
}
