import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faCalendarAlt,
  faCamera,
  faCheckCircle,
  faCheckSquare,
  faCircleInfo,
  faClock,
  faEllipsisV,
  faExclamationTriangle,
  faFileAlt,
  faFilm,
  faFolderOpen,
  faImage,
  faListCheck,
  faMapMarkerAlt,
  faPlus,
  faSpinner,
  faUserGroup,
  faVideo
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tj-production-workspace',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './production-workspace.component.html',
  styleUrl: './production-workspace.component.scss'
})
export class ProductionWorkspaceComponent {
  readonly boardMode = signal(true);
  readonly boardColumns = [
    { id: 'pending', label: 'Pendiente', color: '#83949b' }, { id: 'assigned', label: 'Asignado', color: '#3d9be9' },
    { id: 'shooting', label: 'Rodaje', color: '#39bdd1' }, { id: 'editing', label: 'Edición', color: '#ffb800' },
    { id: 'review', label: 'Revisión', color: '#e7a522' }, { id: 'approved', label: 'Aprobado', color: '#2ead6b' },
    { id: 'delivered', label: 'Entregado', color: '#45575e' }
  ];
  readonly boardCards: Record<string, Array<{ name: string; client: string; type: string; crew: string; urgent?: boolean }>> = {
    pending: [{ name: 'Quince Isabella Cano', client: 'Familia Cano', type: 'Quinceañera', crew: 'Sin asignar', urgent: true }, { name: 'Congreso AMCO', client: 'Asoc. Médica', type: 'Corporativo', crew: 'Carlos Á.' }],
    assigned: [{ name: 'Boda Martínez highlights', client: 'Laura M.', type: 'Boda', crew: 'Andrés M.' }],
    shooting: [{ name: 'Video Maluma — Sony', client: 'Sony Music', type: 'Video Musical', crew: 'Full Crew', urgent: true }],
    editing: [{ name: 'Nike Launch recap', client: 'Nike Colombia', type: 'Corporativo', crew: 'Andrés M.' }], review: [], approved: [], delivered: []
  };
  readonly icons = {
    arrowLeft: faArrowLeft,
    calendar: faCalendarAlt,
    marker: faMapMarkerAlt,
    users: faUserGroup,
    camera: faCamera,
    video: faVideo,
    film: faFilm,
    image: faImage,
    check: faCheckCircle,
    checkSquare: faCheckSquare,
    alert: faCircleInfo,
    warning: faExclamationTriangle,
    clock: faClock,
    folder: faFolderOpen,
    file: faFileAlt,
    more: faEllipsisV,
    plus: faPlus,
    spinner: faSpinner
  };

  readonly activeTab = signal<string>('overview');

  readonly production = signal({
    name: 'Boda de Verano — Rodríguez',
    client: 'María & Carlos Rodríguez',
    type: 'Boda Magistral',
    date: '2026-05-30',
    time: '09:00 - 18:00',
    location: 'Beachside Resort, Miami',
    status: 'ready',
    progress: 85
  });

  readonly tabs = [
    { id: 'overview', label: 'Vista General' },
    { id: 'team', label: 'Equipo Asignado' },
    { id: 'equipment', label: 'Equipos' },
    { id: 'schedule', label: 'Cronograma' },
    { id: 'deliverables', label: 'Entregables' },
    { id: 'assets', label: 'Recursos' },
    { id: 'notes', label: 'Notas' }
  ];

  readonly teamMembers = signal([
    { name: 'Jackson Palacios', role: 'Director de Fotografía / Lead', email: 'jackson@tecnojack.com', phone: '+57 300 123 4567', status: 'Confirmado' },
    { name: 'Carlos Mendoza', role: 'Segunda Cámara / Gimbal', email: 'carlos@tecnojack.com', phone: '+57 311 987 6543', status: 'Confirmado' },
    { name: 'Felipe Torres', role: 'Operador de Drone FPV', email: 'felipe@tecnojack.com', phone: '+57 318 222 3344', status: 'Confirmado' }
  ]);

  readonly assignedEquipment = signal([
    { name: 'Sony FX3 Cinema Line', category: 'Cámara', condition: 'Excelente' },
    { name: 'Sony A7 IV', category: 'Cámara Secundaria', condition: 'Excelente' },
    { name: 'Sony FE 85mm f/1.4 GM', category: 'Lente Retratos', condition: 'Excelente' },
    { name: 'DJI Mavic 3 Pro Cine', category: 'Drone', condition: 'Buena' },
    { name: 'DJI RS3 Pro Gimbal', category: 'Estabilizador', condition: 'Excelente' },
    { name: 'Aputure 300d II + Light Dome', category: 'Iluminación', condition: 'Excelente' }
  ]);

  readonly schedule = signal([
    { time: '09:00 - 10:00', title: 'Preparación y Setup', description: 'Llegada de crew, chequeo de audio y cámaras en locación' },
    { time: '10:00 - 12:00', title: 'Preparativos (Getting Ready)', description: 'Detalles de vestido, anillos, novios y maquillador' },
    { time: '12:00 - 13:00', title: 'First Look & Sesión Pareja', description: 'Sesión privada con lente 85mm y tomas de drone' },
    { time: '13:00 - 15:00', title: 'Ceremonia Religiosa', description: 'Cobertura multicámara y micrófonos directos a consola' },
    { time: '15:00 - 18:00', title: 'Recepción & Fiesta', description: 'Entrada de novios, brindis, primer baile y resumen' }
  ]);

  readonly deliverables = signal([
    { name: 'Video Principal 4K', type: 'video', format: '4K - 10 min', status: 'editing', progress: 65, dueDate: '2026-06-15' },
    { name: 'Highlight Reel (Teaser)', type: 'video', format: '1080p - 2 min', status: 'review', progress: 100, dueDate: '2026-06-10' },
    { name: 'Galería de Fotos Editadas', type: 'photos', format: '150 fotos HQ', status: 'client-approval', progress: 100, dueDate: '2026-06-08' },
    { name: 'Teaser Redes Sociales', type: 'video', format: 'Vertical 9:16 - 30s', status: 'delivered', progress: 100, dueDate: '2026-06-05' }
  ]);

  readonly assets = signal([
    { name: 'Contrato_Servicios_Firmado.pdf', type: 'PDF', size: '245 KB', date: '2026-05-20' },
    { name: 'Shot_List_Boda_Rodriguez.xlsx', type: 'Excel', size: '89 KB', date: '2026-05-22' },
    { name: 'Referencias_Visuales_Moodboard.jpg', type: 'Imagen', size: '1.2 MB', date: '2026-05-25' }
  ]);

  notesContent = signal(
    '- Cliente solicita atención especial al primer baile (efecto humo bajo)\n- Vuelo de drone sujeto a condiciones de viento en la playa\n- Contacto de la planner de bodas: Ana García (+57 300 999 8888)'
  );
}
