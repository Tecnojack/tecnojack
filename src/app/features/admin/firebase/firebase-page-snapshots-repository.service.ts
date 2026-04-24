import { Injectable } from '@angular/core';
import { firebasePageSnapshotAdapter } from '../adapters/firebase-cms-document.adapters';
import { CmsPageSnapshot } from '../models/cms.models';
import { PageSnapshotsRepository } from '../repositories/page-snapshots-repository';
import { FirebaseCmsEntityRepositoryBase } from './firebase-cms-entity-repository.base';

@Injectable({ providedIn: 'root' })
export class FirebasePageSnapshotsRepositoryService
  extends FirebaseCmsEntityRepositoryBase<CmsPageSnapshot>
  implements PageSnapshotsRepository
{
  protected readonly collectionPath = 'pageSnapshots';
  protected readonly adapter = firebasePageSnapshotAdapter;

  protected override async beforeCreate(payload: Partial<CmsPageSnapshot>): Promise<void> {
    await this.validatePageReference(payload.pageId);
  }

  protected override async beforeUpdate(_id: string, payload: Partial<CmsPageSnapshot>): Promise<void> {
    if (payload.pageId !== undefined) {
      await this.validatePageReference(payload.pageId);
    }
  }

  private async validatePageReference(pageId: string | undefined): Promise<void> {
    if (!pageId?.trim()) {
      throw new Error('El snapshot debe referenciar una página válida.');
    }

    const exists = await this.ensureDocumentExists('pages', pageId);
    if (!exists) {
      throw new Error('El snapshot referencia una página inexistente en Firebase.');
    }
  }
}
