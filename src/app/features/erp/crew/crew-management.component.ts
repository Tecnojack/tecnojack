import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera, faEnvelope, faPhone, faPlus, faUserTie, faVideo } from '@fortawesome/free-solid-svg-icons';

interface CrewMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  phone: string;
  email: string;
  eventsCount: number;
  status: 'active' | 'busy' | 'available';
}

@Component({
  selector: 'tj-crew-management',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './crew-management.component.html',
  styleUrl: './crew-management.component.scss'
})
export class CrewManagementComponent {
  readonly icons = {
    user: faUserTie,
    camera: faCamera,
    video: faVideo,
    phone: faPhone,
    email: faEnvelope,
    plus: faPlus
  };

  readonly crewMembers = signal<CrewMember[]>([
    { id: '1', name: 'Jackson Palacios', role: 'Director de Fotografía', specialty: 'Fotografía Principal & Retratos', phone: '+57 300 123 4567', email: 'jackson@tecnojack.com', eventsCount: 18, status: 'active' },
    { id: '2', name: 'Carlos Mendoza', role: 'Videógrafo Lead', specialty: 'Cinematografía & Operador Gimbal', phone: '+57 311 987 6543', email: 'carlos.mendoza@tecnojack.com', eventsCount: 12, status: 'available' },
    { id: '3', name: 'Andrea Ramírez', role: 'Segunda Cámara Foto', specialty: 'Cobertura de Detalles & Recepción', phone: '+57 315 456 7890', email: 'andrea.r@tecnojack.com', eventsCount: 8, status: 'busy' },
    { id: '4', name: 'Felipe Torres', role: 'Piloto de Drone DKA', specialty: 'Tomas Aéreas FPV & 4K', phone: '+57 318 222 3344', email: 'felipe.drone@tecnojack.com', eventsCount: 15, status: 'active' }
  ]);
}
