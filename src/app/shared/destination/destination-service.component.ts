import { NgIf, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
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
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() variant: DestinationServiceVariant = 'notice';
  @Input() serviceContext = 'Servicio audiovisual';
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  @ViewChild('dialogRef') dialogRef?: ElementRef<HTMLDialogElement>;
  @ViewChild('panelRef') panelRef?: ElementRef<HTMLElement>;

  readonly isInfoOpen = signal(false);

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    effect(() => {
      this.i18n.currentLang();
      this.cdr.markForCheck();
    });
  }

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

  openInfo(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isInfoOpen.set(true);
    setTimeout(() => {
      const dialog = this.dialogRef?.nativeElement;
      if (dialog && !dialog.open) {
        dialog.showModal();
        if (typeof document !== 'undefined') {
          this.document.body.style.overflow = 'hidden';
        }
      }
    });
  }

  closeInfo(event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const dialog = this.dialogRef?.nativeElement;
    if (dialog && dialog.open) {
      dialog.close();
    }
    if (typeof document !== 'undefined') {
      const parentModalOpen =
        this.document.body.classList.contains('portfolio-request-modal-open') ||
        !!this.document.querySelector('dialog.pkg-modal[open]');
      if (!parentModalOpen) {
        this.document.body.style.overflow = '';
      }
    }
    this.isInfoOpen.set(false);
  }

  onDialogClick(event: MouseEvent): void {
    event.stopPropagation();
    const panel = this.panelRef?.nativeElement;
    if (panel && !panel.contains(event.target as Node)) {
      this.closeInfo(event);
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event?: KeyboardEvent): void {
    if (this.isInfoOpen()) {
      if (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
      this.closeInfo();
    }
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      const parentModalOpen =
        this.document.body.classList.contains('portfolio-request-modal-open') ||
        !!this.document.querySelector('dialog.pkg-modal[open]');
      if (!parentModalOpen) {
        this.document.body.style.overflow = '';
      }
    }
    const dialog = this.dialogRef?.nativeElement;
    if (dialog && dialog.open) {
      dialog.close();
    }
  }
}
