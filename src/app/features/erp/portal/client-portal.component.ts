import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera, faCheckCircle, faClock, faCloudDownloadAlt, faFilePdf, faGlobe, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tj-client-portal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './client-portal.component.html',
  styleUrl: './client-portal.component.scss'
})
export class ClientPortalComponent {
  readonly activeTab = signal<'timeline' | 'payments' | 'galleries' | 'support'>('timeline');
  readonly icons = {
    globe: faGlobe,
    camera: faCamera,
    download: faCloudDownloadAlt,
    pdf: faFilePdf,
    check: faCheckCircle,
    clock: faClock,
    heart: faHeart
  };

  readonly project = signal({
    title: 'Boda Martínez & Ospina',
    couple: 'Laura Martínez & Felipe Ospina',
    date: '24 de Agosto, 2026',
    venue: 'Casa Medina, Medellín',
    progress: 65,
    photosCount: 850,
    videoStatus: 'En Edición'
  });
}
