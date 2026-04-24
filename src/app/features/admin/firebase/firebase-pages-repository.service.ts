import { Injectable } from '@angular/core';
import { firebasePageAdapter } from '../adapters/firebase-cms-document.adapters';
import { CmsPage } from '../models/cms.models';
import { PagesRepository } from '../repositories/pages-repository';
import { FirebaseCmsEntityRepositoryBase } from './firebase-cms-entity-repository.base';

@Injectable({ providedIn: 'root' })
export class FirebasePagesRepositoryService
  extends FirebaseCmsEntityRepositoryBase<CmsPage>
  implements PagesRepository
{
  protected readonly collectionPath = 'pages';
  protected readonly adapter = firebasePageAdapter;
}
