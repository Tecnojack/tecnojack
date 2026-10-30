import { NgIf, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnDestroy, Output, ViewChild, inject, signal } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';

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
  readonly i18n = inject(I18nService);

  @Input() variant: DestinationServiceVariant = 'notice';
  @Input() serviceContext = 'Servicio audiovisual';
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  @ViewChild('modalRef') modalRef?: ElementRef<HTMLElement>;

  readonly isInfoOpen = signal(false);

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  get recommendedCrew(): string {
    const value = this.serviceContext.toLowerCase();
    const isEn = this.i18n.isEn();

    if (/foto\s*\+\s*video|h[ií]brid|cinematogr[aá]fic|boda completa|evento corporativo/.test(value)) {
      return isEn ? 'Full team: up to 4 crew members' : 'Equipo completo: hasta 4 personas';
    }

    if (/video|institucion|grado|ceremonia/.test(value)) {
      return isEn ? 'Small or full crew: between 1 and 4 members' : 'Equipo reducido o completo: entre 1 y 4 personas';
    }

    if (/foto|preboda|postboda|retrato|contenido|marca personal|producto/.test(value)) {
      return isEn ? 'Solo or small crew: between 1 and 2 members' : 'Cobertura individual o equipo reducido: entre 1 y 2 personas';
    }

    return isEn ? 'Crew defined by scope: between 1 and 4 members' : 'Personal definido según el alcance: entre 1 y 4 personas';
  }

  updateSelection(checked: boolean): void {
    this.selectedChange.emit(checked);
  }

  openInfo(): void {
    this.isInfoOpen.set(true);
    setTimeout(() => {
      this.modalRef?.nativeElement.focus();
    });
  }

  closeInfo(): void {
    this.isInfoOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isInfoOpen()) {
      this.closeInfo();
    }
  }

  ngOnDestroy(): void {
    // cleanup
  }
}
