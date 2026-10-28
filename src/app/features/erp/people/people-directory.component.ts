import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarDays,
  faCamera,
  faCircleInfo,
  faLocationDot,
  faMagnifyingGlass,
  faUserGroup
} from '@fortawesome/free-solid-svg-icons';

import { LegacyClientDirectoryAdapter } from './data-access/legacy-client-directory.adapter';
import { PeopleDirectoryFacade } from './data-access/people-directory.facade';
import { PEOPLE_DIRECTORY_PORT } from './data-access/people-directory.port';

@Component({
  selector: 'tj-people-directory',
  standalone: true,
  imports: [NgFor, NgIf, FontAwesomeModule],
  providers: [
    LegacyClientDirectoryAdapter,
    { provide: PEOPLE_DIRECTORY_PORT, useExisting: LegacyClientDirectoryAdapter },
    PeopleDirectoryFacade
  ],
  templateUrl: './people-directory.component.html',
  styleUrl: './people-directory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleDirectoryComponent {
  readonly directory = inject(PeopleDirectoryFacade);
  readonly icons = {
    calendar: faCalendarDays,
    camera: faCamera,
    info: faCircleInfo,
    location: faLocationDot,
    search: faMagnifyingGlass,
    users: faUserGroup
  };

  formatEventDate(value: string | null): string {
    if (!value) return 'Sin fecha';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Fecha por verificar';

    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(date);
  }
}
