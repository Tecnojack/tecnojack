import { Injectable, inject } from '@angular/core';
import { MediaRepository } from '../repositories/media-repository';
import { MockCmsDatabaseRepositoryService } from './mock-cms-database-repository.service';

@Injectable({ providedIn: 'root' })
export class MockMediaRepositoryService implements MediaRepository {
  private readonly repository = inject(MockCmsDatabaseRepositoryService);

  readonly collection$ = this.repository.selectCollection('media');
  readonly publishedCollection$ = this.repository.selectPublishedCollection('media');

  create(payload: Parameters<MediaRepository['create']>[0]) {
    return this.repository.create('media', payload);
  }

  update(id: string, payload: Parameters<MediaRepository['update']>[1]) {
    return this.repository.update('media', id, payload);
  }

  delete(id: string) {
    return this.repository.delete('media', id);
  }

  exists(id: string) {
    return Promise.resolve(this.repository.getCollectionSnapshot('media').some((item) => item.id === id));
  }
}
