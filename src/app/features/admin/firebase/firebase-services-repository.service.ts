import { Injectable } from '@angular/core';
import { firebaseServiceAdapter } from '../adapters/firebase-cms-document.adapters';
import { FirebaseCmsEntityRepositoryBase } from './firebase-cms-entity-repository.base';
import { CmsService } from '../models/cms.models';
import { ServicesRepository } from '../repositories/services-repository';

@Injectable({ providedIn: 'root' })
export class FirebaseServicesRepositoryService
  extends FirebaseCmsEntityRepositoryBase<CmsService>
  implements ServicesRepository
{
  protected readonly collectionPath = 'services';
  protected readonly adapter = firebaseServiceAdapter;

  protected override async beforeCreate(payload: Partial<CmsService>): Promise<void> {
    await this.validateCategories(payload.categoryIds ?? []);
  }

  protected override async beforeUpdate(_id: string, payload: Partial<CmsService>): Promise<void> {
    if (payload.categoryIds !== undefined) {
      await this.validateCategories(payload.categoryIds);
    }
  }

  private async validateCategories(categoryIds: string[]): Promise<void> {
    const uniqueIds = Array.from(new Set(categoryIds.map((id) => id.trim()).filter(Boolean)));
    const invalidIds: string[] = [];

    for (const categoryId of uniqueIds) {
      const category = await this.getDocumentRecord('categories', categoryId);
      if (!category || String(category['type'] ?? '') !== 'service') {
        invalidIds.push(categoryId);
      }
    }

    if (invalidIds.length) {
      throw new Error(`El servicio referencia categorías inválidas en Firebase: ${invalidIds.join(', ')}.`);
    }
  }
}
