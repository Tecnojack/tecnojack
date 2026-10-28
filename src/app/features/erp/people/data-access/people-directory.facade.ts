import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { PeopleDirectoryStatus } from '../models/people-directory.models';
import { PEOPLE_DIRECTORY_PORT } from './people-directory.port';

@Injectable()
export class PeopleDirectoryFacade {
  private readonly directory = inject(PEOPLE_DIRECTORY_PORT);

  readonly search = signal('');
  readonly status = signal<'all' | PeopleDirectoryStatus>('all');
  readonly entries = toSignal(this.directory.watchEntries().pipe(takeUntilDestroyed()), {
    initialValue: []
  });

  readonly filteredEntries = computed(() => {
    const term = this.normalize(this.search());
    const status = this.status();

    return this.entries().filter((entry) => {
      const matchesStatus = status === 'all' || entry.status === status;
      const searchable = this.normalize(
        `${entry.displayName} ${entry.serviceLabel} ${entry.location ?? ''}`
      );
      return matchesStatus && (!term || searchable.includes(term));
    });
  });

  readonly totals = computed(() => ({
    all: this.entries().length,
    published: this.entries().filter((entry) => entry.status === 'published').length,
    draft: this.entries().filter((entry) => entry.status === 'draft').length
  }));

  setSearch(value: string): void {
    this.search.set(value);
  }

  setStatus(value: string): void {
    if (value === 'published' || value === 'draft') {
      this.status.set(value);
      return;
    }
    this.status.set('all');
  }

  private normalize(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}

