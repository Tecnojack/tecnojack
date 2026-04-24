import { Injectable, inject } from '@angular/core';
import { ServicesRepository } from '../repositories/services-repository';
import { MockCmsDatabaseRepositoryService } from './mock-cms-database-repository.service';

@Injectable({ providedIn: 'root' })
export class MockServicesRepositoryService implements ServicesRepository {
  private readonly repository = inject(MockCmsDatabaseRepositoryService);

  readonly collection$ = this.repository.selectCollection('services');
  readonly publishedCollection$ = this.repository.selectPublishedCollection('services');

  create(payload: Parameters<ServicesRepository['create']>[0]) {
    return this.repository.create('services', payload);
  }

  update(id: string, payload: Parameters<ServicesRepository['update']>[1]) {
    return this.repository.update('services', id, payload);
  }

  delete(id: string) {
    return this.repository.delete('services', id);
  }

  exists(id: string) {
    return Promise.resolve(this.repository.getCollectionSnapshot('services').some((item) => item.id === id));
  }
}
