import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'tj-brand-mode',
  standalone: true,
  imports: [NgFor],
  templateUrl: './brand-mode.component.html',
  styleUrl: './brand-mode.component.scss'
})
export class BrandModeComponent {
  private readonly phone = '573145406467';

  private waLink(message: string): string {
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
  }

  readonly services: Array<{ title: string; description: string; href: string; icon: string }> = [
    {
      title: 'Audiovisual para bodas',
      description: 'Foto y video: cobertura, momentos clave, reels y recuerdo completo.',
      href: this.waLink('Hola TECNOJACK, quiero cotizar audiovisual para boda (foto/video).'),
      icon: 'assets/images/icons/plane.svg'
    },
    {
      title: 'Videos musicales',
      description: 'Producción, grabación y edición de video musical.',
      href: this.waLink('Hola TECNOJACK, quiero cotizar un video musical.'),
      icon: 'assets/images/icons/music.svg'
    },
    {
      title: 'Fotografía / estudio',
      description: 'Sesiones, retratos y fotografía de estudio.',
      href: this.waLink('Hola TECNOJACK, quiero cotizar una sesión de fotos (estudio/exterior).'),
      icon: 'assets/images/icons/cloud.svg'
    },
    {
      title: 'Eventos y grados',
      description: 'Foto y video para eventos, grados y celebraciones.',
      href: this.waLink('Hola TECNOJACK, quiero cotizar foto/video para un evento o grado.'),
      icon: 'assets/images/icons/location-pin.svg'
    },
    {
      title: 'Invitaciones digitales',
      description: 'Tarjetas e invitaciones web personalizadas (como esta).',
      href: this.waLink('Hola TECNOJACK, quiero una invitación digital personalizada.'),
      icon: 'assets/images/icons/envelope.svg'
    }
  ];

  readonly links: Array<{ title: string; description: string; href: string; icon: string }> = [
    {
      title: 'Cotiza por WhatsApp',
      description: 'Cuéntame qué necesitas y te envío propuesta.',
      href: this.waLink('Hola TECNOJACK, quiero cotizar un servicio. ¿Me ayudas por favor?'),
      icon: 'assets/images/icons/whatsapp.svg'
    },
    {
      title: 'Sitio web',
      description: 'Portafolio y contacto.',
      href: 'https://tecnojack.co',
      icon: 'assets/images/icons/pinterest.svg'
    },
    {
      title: 'Instagram',
      description: '@tecnojack',
      href: 'https://instagram.com/tecnojack',
      icon: 'assets/images/icons/instagram.svg'
    },
    {
      title: 'YouTube',
      description: '@tecnojack',
      href: 'https://youtube.com/@tecnojack',
      icon: 'assets/images/icons/youtube.svg'
    },
    {
      title: 'LinkedIn',
      description: 'TecnoJack',
      href: 'https://linkedin.com/company/tecnojack',
      icon: 'assets/images/icons/linkedin.svg'
    }
  ];
}
