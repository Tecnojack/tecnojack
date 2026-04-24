import { Injectable, inject } from '@angular/core';
import { MockCmsDatabaseRepositoryService } from './mock-cms-database-repository.service';
import { PageSnapshotsRepository } from '../repositories/page-snapshots-repository';

@Injectable({ providedIn: 'root' })
export class MockPageSnapshotsRepositoryService implements PageSnapshotsRepository {
  private readonly repository = inject(MockCmsDatabaseRepositoryService);

  readonly collection$ = this.repository.selectCollection('pageSnapshots');
  readonly publishedCollection$ = this.repository.selectPublishedCollection('pageSnapshots');

  create(payload: Parameters<PageSnapshotsRepository['create']>[0]) {
    return this.repository.create('pageSnapshots', payload);
  }

  update(id: string, payload: Parameters<PageSnapshotsRepository['update']>[1]) {
    return this.repository.update('pageSnapshots', id, payload);
  }

  delete(id: string) {
    return this.repository.delete('pageSnapshots', id);
  }

  exists(id: string) {
    return Promise.resolve(this.repository.getCollectionSnapshot('pageSnapshots').some((item) => item.id === id));
  }
}
