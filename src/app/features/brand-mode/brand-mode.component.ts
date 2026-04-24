import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { PortfolioShellComponent } from '../portfolio/portfolio-shell.component';
import { PortfolioContentService } from '../portfolio/services/portfolio-content.service';

type BrandActionItem = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  cta: string;
  external?: boolean;
};

@Component({
  selector: 'tj-brand-mode',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, PortfolioShellComponent],
  templateUrl: './brand-mode.component.html',
  styleUrl: './brand-mode.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandModeComponent implements OnInit {
  private readonly content = inject(PortfolioContentService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly phone = '573145406467';

  private waLink(message: string): string {
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
  }

  readonly heroFacts = [
    { label: 'Rutas activas', value: '6 secciones' },
    { label: 'Cobertura', value: 'Bodas, marcas y artistas' },
    { label: 'Canal directo', value: 'WhatsApp' },
    { label: 'Entrega', value: 'Foto, video y digital' }
  ];

  readonly primaryWhatsappHref = this.waLink(
    'Hola TECNOJACK, quiero cotizar un proyecto audiovisual o digital.'
  );
  readonly brandLogoHorizontalWhite = 'assets/LogoHW.png';
  readonly brandLogoSquareWhite = 'assets/LogoB.png';

  readonly services: BrandActionItem[] = [
    {
      eyebrow: 'Portafolio',
      title: 'Audiovisual para bodas',
      description: 'Foto y video: cobertura, momentos clave, reels y recuerdo completo.',
      href: '/portfolio/bodas',
      icon: 'assets/images/icons/plane.svg'
    },
    {
      eyebrow: 'Video',
      title: 'Videos musicales',
      description: 'Producción, grabación y edición de video musical.',
      href: '/portfolio/videos',
      icon: 'assets/images/icons/music.svg'
    },
    {
      eyebrow: 'Servicios',
      title: 'Fotografía / estudio',
      description: 'Sesiones, retratos y fotografía de estudio.',
      href: '/otros',
      icon: 'assets/images/icons/cloud.svg'
    },
    {
      eyebrow: 'Portafolio',
      title: 'Eventos y grados',
      description: 'Foto y video para eventos, grados y celebraciones.',
      href: '/portfolio/grados',
      icon: 'assets/images/icons/location-pin.svg'
    },
    {
      eyebrow: 'Marcas',
      title: 'Corporativos y contenido',
      description: 'Producción para marcas, equipos, negocios y piezas para redes.',
      href: '/portfolio/corporativos',
      icon: 'assets/images/icons/linkedin.svg',
      cta: 'Ver servicios'
    },
    {
      eyebrow: 'Soluciones',
      title: 'Vende más con tu presencia digital',
      description: 'Landing de conversión para negocios y emprendedores con enfoque en resultados.',
      href: '/soluciones',
      icon: 'assets/images/icons/cloud.svg',
      cta: 'Ver soluciones'
    },
    {
      eyebrow: 'Digital',
      title: 'Invitaciones digitales',
      description: 'Tarjetas e invitaciones web personalizadas (como esta).',
      href: this.waLink('Hola TECNOJACK, quiero una invitación digital personalizada.'),
      icon: 'assets/images/icons/envelope.svg',
      cta: 'Pedir invitación',
      external: true
    }
  ].map((item) => ({
    cta: item.cta ?? 'Explorar',
    ...item
  }));

  readonly links: BrandActionItem[] = [
    {
      eyebrow: 'Contacto',
      title: 'Cotiza por WhatsApp',
      description: 'Cuéntame qué necesitas y te envío propuesta.',
      href: this.waLink('Hola TECNOJACK, quiero cotizar un servicio. ¿Me ayudas por favor?'),
      icon: 'assets/images/icons/whatsapp.svg',
      cta: 'Escribir ahora',
      external: true
    },
    {
      eyebrow: 'Proyecto',
      title: 'Portafolio completo',
      description: 'Entra al sitio principal con servicios, categorías y contacto.',
      href: '/portfolio',
      icon: 'assets/images/icons/pinterest.svg',
      cta: 'Abrir portafolio'
    },
    {
      eyebrow: 'Proyecto',
      title: 'Galerías de clientes',
      description: 'Revisa clientes publicados, fotos y galerías reales.',
      href: '/clientes',
      icon: 'assets/images/icons/cloud.svg',
      cta: 'Ver clientes'
    },
    {
      eyebrow: 'Social',
      title: 'Instagram',
      description: '@tecnojack',
      href: 'https://instagram.com/tecnojack',
      icon: 'assets/images/icons/instagram.svg',
      cta: 'Ir a Instagram',
      external: true
    },
    {
      eyebrow: 'Video',
      title: 'YouTube',
      description: '@tecnojack',
      href: 'https://youtube.com/@tecnojack',
      icon: 'assets/images/icons/youtube.svg',
      cta: 'Ver canal',
      external: true
    },
    {
      eyebrow: 'Empresa',
      title: 'Marcas y corporativos',
      description: 'Ir directo a la sección de contenido para negocios y equipos.',
      href: '/portfolio/corporativos',
      icon: 'assets/images/icons/linkedin.svg',
      cta: 'Ver corporativos'
    }
  ];

  get navItems() {
    return this.content.navItems();
  }

  ngOnInit(): void {
    this.title.setTitle('TECNOJACK | Producción audiovisual y experiencias digitales');
    this.meta.updateTag({
      name: 'description',
      content:
        'Página principal de TECNOJACK con accesos directos al portafolio, servicios audiovisuales, corporativos, clientes y contacto.'
    });
  }

  isInternalRoute(href: string): boolean {
    return href.startsWith('/') && !href.includes('#');
  }
}
