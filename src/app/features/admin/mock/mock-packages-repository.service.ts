import { Injectable, inject } from '@angular/core';
import { PackagesRepository } from '../repositories/packages-repository';
import { MockCmsDatabaseRepositoryService } from './mock-cms-database-repository.service';

@Injectable({ providedIn: 'root' })
export class MockPackagesRepositoryService implements PackagesRepository {
  private readonly repository = inject(MockCmsDatabaseRepositoryService);

  readonly collection$ = this.repository.selectCollection('packages');
  readonly publishedCollection$ = this.repository.selectPublishedCollection('packages');

  create(payload: Parameters<PackagesRepository['create']>[0]) {
    return this.repository.create('packages', payload);
  }

  update(id: string, payload: Parameters<PackagesRepository['update']>[1]) {
    return this.repository.update('packages', id, payload);
  }

  delete(id: string) {
    return this.repository.delete('packages', id);
  }

  exists(id: string) {
    return Promise.resolve(this.repository.getCollectionSnapshot('packages').some((item) => item.id === id));
  }
}
