import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';

@Component({
  selector: 'tj-storytelling-transition-section',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './storytelling-transition-section.component.html',
  styleUrl: './storytelling-transition-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorytellingTransitionSectionComponent {}
