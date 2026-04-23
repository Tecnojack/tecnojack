import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { ContactSectionComponent } from '../sections/contact-section.component';
import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { buildPortfolioWhatsappHref } from '../portfolio.data';

type TeamMember = {
  name: string;
  title: string;
  summary?: string;
  highlights: string[];
  isLead?: boolean;
  slot: 'left' | 'lead' | 'right';
};

type ProcessStep = { title: string; description: string };
type ValueProp = { title: string; description: string };

@Component({
  selector: 'tj-about-page',
  standalone: true,
  imports: [NgFor, NgIf, PortfolioShellComponent, ContactSectionComponent, RevealOnScrollDirective],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly heroTagline = '“No solo capturo momentos, creo historias que permanecen en el tiempo.”';

  readonly heroPhotoSrc = 'assets/images/profile/Jackson Palacios.jpg';

  readonly heroCtaHref = buildPortfolioWhatsappHref(
    'Hola Jackson, vi tu página y quiero cotizar un proyecto audiovisual'
  );

  readonly heroScrollTarget = '#about-work';

  readonly heroSocialProof = [
    '+10 años de experiencia',
    'Bodas, marcas y artistas',
    'Producción audiovisual completa'
  ];

  readonly teamMembers: TeamMember[] = [
    {
      name: 'Jackson Palacios',
      title: 'Director · Fotografía & Video',
      summary:
        'Dirijo la visión creativa y la ejecución del proyecto: desde la planeación hasta la entrega final, asegurando un resultado coherente y elegante.',
      highlights: ['Dirección creativa y acompañamiento', 'Cobertura foto + video con estética premium', 'Coordinación de equipo cuando el proyecto lo requiere'],
      isLead: true,
      slot: 'lead'
    },
    {
      name: 'Gabriel Silva',
      title: 'Video · Segundo ángulo',
      highlights: ['Refuerzo en cobertura de video', 'Cinemática y narrativa en momentos clave', 'Apoyo en clips y entregas según el proyecto']
      ,
      slot: 'right'
    },
    {
      name: 'Alexander Cifuente',
      title: 'Asistencia · Fotografía',
      highlights: ['Apoyo en logística y tiempos', 'Refuerzo en retratos, detalles y apoyo de cámara', 'Agilidad para no perder momentos importantes']
      ,
      slot: 'left'
    }
  ];

  readonly processSteps: ProcessStep[] = [
    {
      title: 'Planeación inicial',
      description: 'Nos reunimos o hablamos por WhatsApp para alinear estilo, horarios, locación y prioridades. Directo y sin formatos complicados.'
    },
    {
      title: 'Producción',
      description: 'El día del evento cubrimos con cuidado y discreción. Dirigimos cuando hace falta pero sin interrumpir lo que importa.'
    },
    {
      title: 'Edición y selección',
      description: 'Escogemos las mejores tomas, aplicamos edición consistente y revisamos cada detalle visual antes de entregar.'
    },
    {
      title: 'Entrega y seguimiento',
      description: 'Material organizado en galería digital, listo para compartir desde el primer día. Si algo necesita ajuste, lo resolvemos.'
    }
  ];

  readonly valueProps: ValueProp[] = [
    {
      title: 'Dirección y acompañamiento',
      description: 'Desde la primera reunión hasta la entrega, estás en buenas manos. Sin improvisar, con criterio en cada decisión.'
    },
    {
      title: 'Estilo visual atemporal',
      description: 'Fotografías y videos con identidad propia que no pasan de moda. Un trabajo que sigue gustando años después.'
    },
    {
      title: 'Entregas organizadas y a tiempo',
      description: 'Galerías digitales organizadas, archivos correctamente nombrados y entregados en la fecha acordada. Sin excusas.'
    },
    {
      title: 'Atención personalizada',
      description: 'Cada proyecto es distinto. Te escucho, adapto el trabajo y mantengo comunicación directa contigo en todo momento.'
    },
    {
      title: 'Equipo según el proyecto',
      description: 'Cuando el evento lo requiere, sumamos personas confiables para garantizar cobertura completa sin perder calidad.'
    },
    {
      title: 'Experiencia en distintos eventos',
      description: 'Bodas, grados, quinces, sesiones de marca y contenido digital. Variedad que se traduce en criterio visual.'
    }
  ];

  constructor() {
    effect(() => {
      const pageMeta = this.content.getPageMeta(
        'portfolio-sobre-mi',
        'TECNOJACK | Sobre mí',
        'Conoce a Jackson Palacios: productor audiovisual y desarrollador de software, con equipo y experiencia para bodas, eventos y marcas.'
      );
      this.title.setTitle(pageMeta.title);
      this.meta.updateTag({ name: 'description', content: pageMeta.description });
    });
  }

  get navItems() {
    return this.content.navItems();
  }

  get headerCtaHref() {
    return this.content.buildWhatsappHref('Hola TECNOJACK, me interesa conocer más sobre el estudio y sus servicios.');
  }

  get editable(): boolean {
    return false;
  }
}
