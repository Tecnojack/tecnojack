import { Injectable } from '@angular/core';
import { firebaseSectionAdapter } from '../adapters/firebase-cms-document.adapters';
import { CmsSection } from '../models/cms.models';
import { SectionsRepository } from '../repositories/sections-repository';
import { FirebaseCmsEntityRepositoryBase } from './firebase-cms-entity-repository.base';

@Injectable({ providedIn: 'root' })
export class FirebaseSectionsRepositoryService
  extends FirebaseCmsEntityRepositoryBase<CmsSection>
  implements SectionsRepository
{
  protected readonly collectionPath = 'sections';
  protected readonly adapter = firebaseSectionAdapter;

  protected override async beforeCreate(payload: Partial<CmsSection>): Promise<void> {
    await this.validatePageReference(payload.pageId);
  }

  protected override async beforeUpdate(_id: string, payload: Partial<CmsSection>): Promise<void> {
    if (payload.pageId !== undefined) {
      await this.validatePageReference(payload.pageId);
    }
  }

  private async validatePageReference(pageId: string | undefined): Promise<void> {
    if (!pageId?.trim()) {
      throw new Error('La sección debe tener una página válida.');
    }

    const exists = await this.ensureDocumentExists('pages', pageId);
    if (!exists) {
      throw new Error('La sección referencia una página inexistente en Firebase.');
    }
  }
}
