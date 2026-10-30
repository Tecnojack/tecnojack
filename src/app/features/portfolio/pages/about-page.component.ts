import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { RevealOnScrollDirective } from '../../../shared/animations/reveal-on-scroll.directive';
import { FallbackImageDirective } from '../../../shared/images/fallback-image.directive';
import { ContactSectionComponent } from '../sections/contact-section.component';
import { PortfolioShellComponent } from '../portfolio-shell.component';
import { PortfolioContentService } from '../services/portfolio-content.service';
import { I18nService } from '../../../core/services/i18n.service';
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
  imports: [NgFor, NgIf, PortfolioShellComponent, ContactSectionComponent, RevealOnScrollDirective, FallbackImageDirective],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent {
  private readonly content = inject(PortfolioContentService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly i18n = inject(I18nService);

  readonly heroPhotoSrc = 'assets/images/profile/Jackson Palacios.jpg';

  get heroTagline(): string {
    return this.i18n.t('about.quote', '“No solo capturo momentos, creo historias que permanecen en el tiempo.”');
  }

  get heroCtaHref(): string {
    const text = this.i18n.isEn()
      ? 'Hello TECNOJACK, I saw your website and would like to quote an audiovisual project.'
      : 'Hola TECNOJACK, vi tu página y quiero cotizar un proyecto audiovisual.';
    return buildPortfolioWhatsappHref(text);
  }

  readonly heroScrollTarget = '#about-work';

  get heroSocialProof(): string[] {
    return [
      this.i18n.t('about.proof1', '+10 años de experiencia'),
      this.i18n.t('about.proof2', 'Bodas, marcas y artistas'),
      this.i18n.t('about.proof3', 'Producción audiovisual completa')
    ];
  }

  get teamMembers(): TeamMember[] {
    const isEn = this.i18n.isEn();
    return [
      {
        name: 'Jackson Palacios',
        title: isEn ? 'Director · Photography & Film' : 'Director · Fotografía & Video',
        summary: isEn
          ? 'I direct the creative vision and project execution: from planning to final delivery, ensuring an elegant and coherent result.'
          : 'Dirijo la visión creativa y la ejecución del proyecto: desde la planeación hasta la entrega final, asegurando un resultado coherente y elegante.',
        highlights: isEn
          ? ['Creative direction & guidance', 'Photo + video coverage with premium aesthetics', 'Crew coordination tailored to project scale']
          : ['Dirección creativa y acompañamiento', 'Cobertura foto + video con estética premium', 'Coordinación de equipo cuando el proyecto lo requiere'],
        isLead: true,
        slot: 'lead'
      },
      {
        name: 'Gabriel Silva',
        title: isEn ? 'Cinema · Second Angle' : 'Video · Segundo ángulo',
        highlights: isEn
          ? ['Video coverage reinforcement', 'Cinematics and narrative during key moments', 'Support on clips and deliverables']
          : ['Refuerzo en cobertura de video', 'Cinemática y narrativa en momentos clave', 'Apoyo en clips y entregas según el proyecto'],
        slot: 'right'
      },
      {
        name: 'Alexander Cifuente',
        title: isEn ? 'Assistance · Photography' : 'Asistencia · Fotografía',
        highlights: isEn
          ? ['Logistics & timing support', 'Portraits and camera support', 'Agility to capture every essential moment']
          : ['Apoyo en logística y tiempos', 'Refuerzo en retratos, detalles y apoyo de cámara', 'Agilidad para no perder momentos importantes'],
        slot: 'left'
      }
    ];
  }

  get processSteps(): ProcessStep[] {
    const isEn = this.i18n.isEn();
    return [
      {
        title: isEn ? 'Initial Planning' : 'Planeación inicial',
        description: isEn
          ? 'We meet or talk via WhatsApp to align style, schedule, venue, and priorities. Direct and straightforward.'
          : 'Nos reunimos o hablamos por WhatsApp para alinear estilo, horarios, locación y prioridades. Directo y sin formatos complicados.'
      },
      {
        title: isEn ? 'Production' : 'Producción',
        description: isEn
          ? 'On the event day we cover with care and discretion. Directing when needed without intruding on what truly matters.'
          : 'El día del evento cubrimos con cuidado y discreción. Dirigimos cuando hace falta pero sin interrumpir lo que importa.'
      },
      {
        title: isEn ? 'Editing & Curation' : 'Edición y selección',
        description: isEn
          ? 'We select the finest shots, apply consistent cinematic color, and refine every visual detail.'
          : 'Escogemos las mejores tomas, aplicamos edición consistente y revisamos cada detalle visual antes de entregar.'
      },
      {
        title: isEn ? 'Delivery & Follow-up' : 'Entrega y seguimiento',
        description: isEn
          ? 'Material organized in a private digital gallery, ready to share immediately.'
          : 'Material organizado en galería digital, listo para compartir desde el primer día. Si algo necesita ajuste, lo resolvemos.'
      }
    ];
  }

  get valueProps(): ValueProp[] {
    const isEn = this.i18n.isEn();
    return [
      {
        title: isEn ? 'Direction & Guidance' : 'Dirección y acompañamiento',
        description: isEn
          ? 'From our first meeting to final delivery, you are in expert hands. Deliberate aesthetic choices at every step.'
          : 'Desde la primera reunión hasta la entrega, estás en buenas manos. Sin improvisar, con criterio en cada decisión.'
      },
      {
        title: isEn ? 'Timeless Visual Style' : 'Estilo visual atemporal',
        description: isEn
          ? 'Photographs and videos with a distinctive identity that never goes out of style.'
          : 'Fotografías y videos con identidad propia que no pasan de moda. Un trabajo que sigue gustando años después.'
      },
      {
        title: isEn ? 'Organized & On-Time Deliveries' : 'Entregas organizadas y a tiempo',
        description: isEn
          ? 'Curated private digital galleries, properly named files, and on-schedule delivery guaranteed.'
          : 'Galerías digitales organizadas, archivos correctamente nombrados y entregados en la fecha acordada. Sin excusas.'
      },
      {
        title: isEn ? 'Personalized Care' : 'Atención personalizada',
        description: isEn
          ? 'Every project is unique. Direct communication and attention to your specific vision.'
          : 'Cada proyecto es distinto. Te escucho, adapto el trabajo y mantengo comunicación directa contigo en todo momento.'
      },
      {
        title: isEn ? 'Dedicated Project Crew' : 'Equipo según el proyecto',
        description: isEn
          ? 'When your event calls for it, we bring trusted professionals to ensure full coverage without compromise.'
          : 'Cuando el evento lo requiere, sumamos personas confiables para garantizar cobertura completa sin perder calidad.'
      },
      {
        title: isEn ? 'Diverse Event Experience' : 'Experiencia en distintos eventos',
        description: isEn
          ? 'Weddings, graduations, sweet 15s, brand campaigns, and digital content. Versatility that elevates visual judgment.'
          : 'Bodas, grados, quinces, sesiones de marca y contenido digital. Variedad que se traduce en criterio visual.'
      }
    ];
  }

  constructor() {
    effect(() => {
      this.i18n.currentLang();
      this.cdr.markForCheck();
      const pageMeta = this.content.getPageMeta(
        'portfolio-sobre-mi',
        this.i18n.isEn() ? 'TECNOJACK | About Me' : 'TECNOJACK | Sobre mí',
        this.i18n.isEn()
          ? 'Meet Jackson Palacios: audiovisual producer and software developer, with team and expertise for weddings, events, and brands.'
          : 'Conoce a Jackson Palacios: productor audiovisual y desarrollador de software, con equipo y experiencia para bodas, eventos y marcas.'
      );
      this.title.setTitle(pageMeta.title);
      this.meta.updateTag({ name: 'description', content: pageMeta.description });
    });
  }

  get navItems() {
    return this.content.navItems();
  }

  get headerCtaHref() {
    return this.content.buildWhatsappHref(
      this.i18n.isEn()
        ? 'Hello TECNOJACK, I would like to learn more about your studio and services.'
        : 'Hola TECNOJACK, me interesa conocer más sobre el estudio y sus servicios.'
    );
  }

  get editable(): boolean {
    return false;
  }
}
