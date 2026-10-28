import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarAlt,
  faCamera,
  faCheck,
  faClock,
  faMapMarkerAlt,
  faPlus,
  faSearch,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

interface EventModel {
  id: string;
  code: string;
  title: string;
  type: 'boda' | 'preboda' | 'quinces' | 'corporativo';
  date: string;
  venue: string;
  city: string;
  client: string;
  leadPhotographer: string;
  status: 'planned' | 'in_progress' | 'completed' | 'canceled';
}

@Component({
  selector: 'tj-events-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss'
})
export class EventsListComponent {
  readonly icons = {
    calendar: faCalendarAlt,
    marker: faMapMarkerAlt,
    camera: faCamera,
    users: faUsers,
    plus: faPlus,
    search: faSearch,
    clock: faClock,
    check: faCheck
  };

  readonly searchQuery = signal('');
  readonly typeFilter = signal<string>('all');

  readonly events = signal<EventModel[]>([
    { id: '1', code: 'EVT-2026-012', title: 'Boda Carolina & Mateo', type: 'boda', date: '2026-11-14', venue: 'Hacienda San José', city: 'Cali', client: 'Carolina & Mateo', leadPhotographer: 'Jackson Palacios', status: 'planned' },
    { id: '2', code: 'EVT-2026-011', title: 'Preboda Carolina & Mateo', type: 'preboda', date: '2026-10-12', venue: 'Lago Calima', city: 'Darién', client: 'Carolina & Mateo', leadPhotographer: 'Jackson Palacios', status: 'planned' },
    { id: '3', code: 'EVT-2026-010', title: 'Quinceañero Lucía', type: 'quinces', date: '2026-09-18', venue: 'Hotel Intercontinental', city: 'Cali', client: 'Lucía XV', leadPhotographer: 'Carlos Mendoza', status: 'planned' },
    { id: '4', code: 'EVT-2026-009', title: 'Boda Mariana & Daniel', type: 'boda', date: '2026-08-10', venue: 'Hacienda El Bosque', city: 'Jamundí', client: 'Mariana & Daniel', leadPhotographer: 'Jackson Palacios', status: 'completed' },
    { id: '5', code: 'EVT-2026-008', title: 'Boda Destino Cartagena', type: 'boda', date: '2026-12-05', venue: 'Centro Histórico', city: 'Cartagena', client: 'Valentina & Alejandro', leadPhotographer: 'Jackson Palacios', status: 'planned' }
  ]);

  readonly filteredEvents = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const type = this.typeFilter();

    return this.events().filter((e) => {
      const matchSearch = !query || e.title.toLowerCase().includes(query) || e.venue.toLowerCase().includes(query) || e.city.toLowerCase().includes(query);
      const matchType = type === 'all' || e.type === type;
      return matchSearch && matchType;
    });
  });

  readonly upcomingEventsCount = computed(() =>
    this.events().filter((e) => e.status === 'planned').length
  );
}
