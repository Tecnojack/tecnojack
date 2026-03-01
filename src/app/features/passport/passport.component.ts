import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { gsap } from 'gsap';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'tj-passport',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './passport.component.html',
  styleUrl: './passport.component.scss'
})
export class PassportComponent implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) weddingNames!: string;
  @Input({ required: true }) guestName!: string;
  @Input() allowedGuests = 1;
  @Input({ required: true }) date!: string;
  @Input() phrase = 'Tu pase de abordaje al amor.';

  @Output() opened = new EventEmitter<void>();

  isOpen = false;

  private stampAnim?: AnimationItem;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const stampContainer = this.host.nativeElement.querySelector('.passport__stamp') as HTMLElement | null;
    if (!stampContainer) return;

    this.stampAnim = lottie.loadAnimation({
      container: stampContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/lottie/passport-stamp.json'
    });

    this.destroyRef.onDestroy(() => {
      this.stampAnim?.destroy();
      this.stampAnim = undefined;
    });
  }

  open(): void {
    if (this.isOpen) return;

    this.isOpen = true;

    if (typeof window === 'undefined') {
      this.opened.emit();
      return;
    }

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    if (prefersReduced) {
      this.opened.emit();
      return;
    }

    const root = this.host.nativeElement;
    const inner = root.querySelector('.passport__inner') as HTMLElement | null;
    const lights = Array.from(root.querySelectorAll('.passport__light')) as HTMLElement[];
    const stamp = root.querySelector('.passport__stamp') as HTMLElement | null;

    // Queremos que se sienta el "flip" sin que se alcance a ver el reverso.
    // Por eso giramos solo ~90° y terminamos ahí, para que el stage cargue la invitación.
    const flipRotation = 88;
    const flipDuration = 0.72;

    // Sonido opcional (dejar comentado)
    // const pageAudio = new Audio('assets/sounds/page-turn.mp3');
    // pageAudio.volume = 0.22;
    // void pageAudio.play();

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => this.opened.emit()
    });

    if (inner) {
      tl.fromTo(
        inner,
        { rotateY: 0, transformPerspective: 1100, transformOrigin: '50% 50%' },
        { rotateY: flipRotation, duration: flipDuration, ease: 'power3.inOut' },
        0
      );
    }

    if (lights.length) {
      tl.to(lights, { opacity: 1, duration: 0.28, stagger: 0.04 }, 0.08);
      tl.to(lights, { opacity: 0.0, duration: 0.55 }, 0.42);
    }

    // Sello tipo passport stamp
    if (stamp) {
      tl.fromTo(
        stamp,
        { autoAlpha: 0, scale: 0.9, rotate: -14 },
        { autoAlpha: 1, scale: 1, rotate: -10, duration: 0.42, ease: 'back.out(1.7)' },
        0.34
      );
    }

    tl.call(
      () => {
        this.stampAnim?.goToAndStop(0, true);
        this.stampAnim?.play();
      },
      [],
      0.34
    );
  }
}
