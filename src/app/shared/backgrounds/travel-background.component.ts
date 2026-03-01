import { AfterViewInit, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'tj-travel-background',
  standalone: true,
  templateUrl: './travel-background.component.html',
  styleUrl: './travel-background.component.scss'
})
export class TravelBackgroundComponent implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const desktopPointer = window.matchMedia?.('(pointer: fine) and (min-width: 768px)')?.matches ?? false;
    if (prefersReduced || !desktopPointer) return;

    const root = this.host.nativeElement;
    const parallaxLayers = Array.from(root.querySelectorAll('[data-depth]')) as HTMLElement[];
    if (!parallaxLayers.length) return;

    const setters = parallaxLayers.map((el) => {
      const depth = Number(el.dataset['depth'] ?? '0');
      const xTo = gsap.quickTo(el as gsap.TweenTarget, 'x', { duration: 0.9, ease: 'power3.out' });
      const yTo = gsap.quickTo(el as gsap.TweenTarget, 'y', { duration: 0.9, ease: 'power3.out' });
      return { depth, xTo, yTo };
    });

    const onMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;

      setters.forEach(({ depth, xTo, yTo }) => {
        xTo(nx * 22 * depth);
        yTo(ny * 18 * depth);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('mousemove', onMove);
    });
  }
}
