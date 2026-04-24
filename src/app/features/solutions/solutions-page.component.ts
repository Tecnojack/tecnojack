import { NgFor, NgIf } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { RevealOnScrollDirective } from '../../shared/animations/reveal-on-scroll.directive';
import { PortfolioShellComponent } from '../portfolio/portfolio-shell.component';
import { PortfolioContentService } from '../portfolio/services/portfolio-content.service';
import { ServiceRequestService } from '../../services/service-request.service';

type SolutionsType = 'negocio' | 'evento';

@Component({
  selector: 'tj-solutions-page',
  standalone: true,
  imports: [NgIf, NgFor, PortfolioShellComponent, RevealOnScrollDirective],
  templateUrl: './solutions-page.component.html',
  styleUrl: './solutions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionsPageComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly serviceRequest = inject(ServiceRequestService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly destroyRef = inject(DestroyRef);

  readonly selectedType = signal<SolutionsType>('negocio');
  readonly isSubmitting = signal(false);
  readonly feedback = signal<string | null>(null);

  readonly heroSlideIndex = signal(0);
  readonly heroSlides = [
    {
      value: '3 seg',
      label: 'Tu cliente te entiende al instante',
      desc: 'Diseñamos para que en menos de 3 segundos tu visitante sepa qué vendes, qué cuesta y cómo contactarte.',
    },
    {
      value: '24/7',
      label: 'Vendes mientras duermes',
      desc: 'Tu presencia digital trabaja para ti todo el día. Sin importar el horario, tus clientes pueden ver lo que ofreces.',
    },
    {
      value: '×3',
      label: 'Más consultas, más cierres',
      desc: 'Una imagen profesional con un proceso claro convierte más visitantes en clientes reales que te escriben por WhatsApp.',
    },
  ];

  readonly name = signal('');
  readonly phone = signal('');
  readonly businessName = signal('');
  readonly need = signal('');
  readonly location = signal('');
  readonly date = signal('');
  readonly budgetRange = signal('');

  readonly canSubmit = computed(
    () => this.name().trim().length > 1 && this.phone().trim().length > 6 && this.need().trim().length > 5 && !this.isSubmitting(),
  );

  readonly whatsappHref = computed(() => {
    const lines = [
      'Hola TECNOJACK, quiero solicitar una propuesta de soluciones digitales.',
      '',
      `Tipo: ${this.selectedType()}`,
      `Nombre: ${this.name().trim() || 'No definido'}`,
      `Teléfono: ${this.phone().trim() || 'No definido'}`,
      `Negocio: ${this.businessName().trim() || 'No definido'}`,
      `Ubicación: ${this.location().trim() || 'No definida'}`,
      `Fecha objetivo: ${this.date().trim() || 'No definida'}`,
      `Rango de inversión: ${this.budgetRange().trim() || 'Por definir'}`,
      '',
      `Necesidad: ${this.need().trim() || 'Sin detalle'}`,
    ];

    return this.content.buildWhatsappHref(lines.join('\n'));
  });

  get navItems() {
    return this.content.navItems();
  }

  constructor() {
    this.title.setTitle('TECNOJACK | Soluciones para vender más');
    this.meta.updateTag({
      name: 'description',
      content:
        'Soluciones digitales para emprendedores y negocios: presencia profesional, catálogo visual, organización comercial y cierre por WhatsApp.',
    });

    afterNextRender(() => {
      const interval = setInterval(() => {
        this.heroSlideIndex.update(i => (i + 1) % this.heroSlides.length);
      }, 3500);
      this.destroyRef.onDestroy(() => clearInterval(interval));
    });
  }

  selectType(type: SolutionsType): void {
    this.selectedType.set(type);
  }

  nextHeroSlide(): void {
    this.heroSlideIndex.update(i => (i + 1) % this.heroSlides.length);
  }

  prevHeroSlide(): void {
    this.heroSlideIndex.update(i => (i - 1 + this.heroSlides.length) % this.heroSlides.length);
  }

  goToHeroSlide(index: number): void {
    this.heroSlideIndex.set(index);
  }

  updateName(value: string): void {
    this.name.set(value);
  }

  updatePhone(value: string): void {
    this.phone.set(value);
  }

  updateBusinessName(value: string): void {
    this.businessName.set(value);
  }

  updateNeed(value: string): void {
    this.need.set(value);
  }

  updateLocation(value: string): void {
    this.location.set(value);
  }

  updateDate(value: string): void {
    this.date.set(value);
  }

  updateBudgetRange(value: string): void {
    this.budgetRange.set(value);
  }

  scrollToForm(): void {
    document.getElementById('soluciones-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async submit(): Promise<void> {
    if (!this.canSubmit()) {
      this.feedback.set('Completa nombre, teléfono y necesidad para continuar.');
      return;
    }

    this.isSubmitting.set(true);
    this.feedback.set(null);

    try {
      await this.serviceRequest.createRequest({
        name: this.name(),
        phone: this.phone(),
        service: 'Soluciones Digitales',
        package: this.selectedType() === 'negocio' ? 'solucion-negocio' : 'solucion-evento',
        message: this.need(),
        location: this.location(),
        eventDate: this.date(),
        businessName: this.businessName(),
        type: this.selectedType(),
        need: this.need(),
        date: this.date(),
        budgetRange: this.budgetRange(),
      });

      window.open(this.whatsappHref(), '_blank', 'noopener,noreferrer');
      this.feedback.set('Solicitud enviada. Te llevamos a WhatsApp para cerrar detalles.');
    } catch (error) {
      console.error('No se pudo guardar la solicitud de soluciones', error);
      this.feedback.set('No se pudo enviar la solicitud. Intenta de nuevo.');
    }

    this.isSubmitting.set(false);
  }
}
