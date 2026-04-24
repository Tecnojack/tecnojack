import { Injectable } from '@angular/core';
import { firebaseSectionDataAdapter } from '../adapters/firebase-cms-document.adapters';
import { CmsSectionData } from '../models/cms.models';
import { SectionsDataRepository } from '../repositories/sections-data-repository';
import { FirebaseCmsEntityRepositoryBase } from './firebase-cms-entity-repository.base';

@Injectable({ providedIn: 'root' })
export class FirebaseSectionsDataRepositoryService
  extends FirebaseCmsEntityRepositoryBase<CmsSectionData>
  implements SectionsDataRepository
{
  protected readonly collectionPath = 'sectionsData';
  protected readonly adapter = firebaseSectionDataAdapter;
}
