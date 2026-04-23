import { Injectable } from '@angular/core';
import { firebasePackageAdapter } from '../adapters/firebase-cms-document.adapters';
import { CmsPackage } from '../models/cms.models';
import { PackagesRepository } from '../repositories/packages-repository';
import { FirebaseCmsEntityRepositoryBase } from './firebase-cms-entity-repository.base';

@Injectable({ providedIn: 'root' })
export class FirebasePackagesRepositoryService
  extends FirebaseCmsEntityRepositoryBase<CmsPackage>
  implements PackagesRepository
{
  protected readonly collectionPath = 'packages';
  protected readonly adapter = firebasePackageAdapter;

  protected override async beforeCreate(payload: Partial<CmsPackage>): Promise<void> {
    await this.validateServiceIds(payload.serviceIds ?? []);
  }

  protected override async beforeUpdate(_id: string, payload: Partial<CmsPackage>): Promise<void> {
    if (payload.serviceIds !== undefined) {
      await this.validateServiceIds(payload.serviceIds);
    }
  }

  private async validateServiceIds(serviceIds: string[]): Promise<void> {
    if (!serviceIds.length) {
      return;
    }

    const invalidIds = await this.ensureAllDocumentsExist('services', serviceIds);
    if (invalidIds.length) {
      throw new Error(`El paquete referencia servicios inexistentes en Firebase: ${invalidIds.join(', ')}.`);
    }
  }
}
