import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { PeopleDirectoryEntry } from '../models/people-directory.models';
import { PeopleDirectoryFacade } from './people-directory.facade';
import { PEOPLE_DIRECTORY_PORT } from './people-directory.port';

describe('PeopleDirectoryFacade', () => {
  const entries$ = new BehaviorSubject<PeopleDirectoryEntry[]>([
    {
      id: '1',
      displayName: 'Ana Gómez',
      service: 'bodas',
      serviceLabel: 'Bodas',
      eventDate: null,
      location: 'Medellín',
      galleryCount: 24,
      status: 'published',
      source: 'legacy-portfolio'
    },
    {
      id: '2',
      displayName: 'Carlos Ruiz',
      service: 'grados',
      serviceLabel: 'Grados',
      eventDate: null,
      location: 'Envigado',
      galleryCount: 0,
      status: 'draft',
      source: 'legacy-portfolio'
    }
  ]);

  let facade: PeopleDirectoryFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PeopleDirectoryFacade,
        { provide: PEOPLE_DIRECTORY_PORT, useValue: { watchEntries: () => entries$ } }
      ]
    });
    facade = TestBed.inject(PeopleDirectoryFacade);
  });

  it('filters without accents and exposes totals', () => {
    facade.setSearch('medellin');

    expect(facade.filteredEntries().map((entry) => entry.id)).toEqual(['1']);
    expect(facade.totals()).toEqual({ all: 2, published: 1, draft: 1 });
  });

  it('filters by publication status', () => {
    facade.setStatus('draft');

    expect(facade.filteredEntries().map((entry) => entry.id)).toEqual(['2']);
  });
});

