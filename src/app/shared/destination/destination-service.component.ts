import { NgIf, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnDestroy, Output, ViewChild, signal } from '@angular/core';

export type DestinationServiceVariant = 'notice' | 'selection';

@Component({
  selector: 'tj-destination-service',
  standalone: true,
  imports: [NgIf],
  templateUrl: './destination-service.component.html',
  styleUrl: './destination-service.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationServiceComponent implements OnDestroy {
  @Input() variant: DestinationServiceVariant = 'notice';
  @Input() serviceContext = 'Servicio audiovisual';
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  @ViewChild('modalRef') modalRef?: ElementRef<HTMLElement>;

  readonly isInfoOpen = signal(false);

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  get recommendedCrew(): string {
    const value = this.serviceContext.toLowerCase();

    if (/foto\s*\+\s*video|h[ií]brid|cinematogr[aá]fic|boda completa|evento corporativo/.test(value)) {
      return 'Equipo completo: hasta 4 personas';
    }

    if (/video|institucion|grado|ceremonia/.test(value)) {
      return 'Equipo reducido o completo: entre 1 y 4 personas';
    }

    if (/foto|preboda|postboda|retrato|contenido|marca personal|producto/.test(value)) {
      return 'Cobertura individual o equipo reducido: entre 1 y 2 personas';
    }

    return 'Personal definido según el alcance: entre 1 y 4 personas';
  }

  updateSelection(checked: boolean): void {
    this.selectedChange.emit(checked);
  }

  openInfo(): void {
    this.isInfoOpen.set(true);
    setTimeout(() => {
      const el = this.modalRef?.nativeElement || (this.document.querySelector('.destination-modal') as HTMLElement);
      if (el && el.parentElement !== this.document.body) {
        this.document.body.appendChild(el);
      }
    });
  }

  closeInfo(): void {
    const el = this.modalRef?.nativeElement || (this.document.querySelector('.destination-modal') as HTMLElement);
    if (el && el.parentElement === this.document.body) {
      this.document.body.removeChild(el);
    }
    this.isInfoOpen.set(false);
  }

  ngOnDestroy(): void {
    const el = this.modalRef?.nativeElement || (this.document.querySelector('.destination-modal') as HTMLElement);
    if (el && el.parentElement === this.document.body) {
      this.document.body.removeChild(el);
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    if (this.isInfoOpen()) {
      this.closeInfo();
    }
  }
}

