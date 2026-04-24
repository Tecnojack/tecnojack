import { Injectable } from '@angular/core';
import { firebaseCategoryAdapter } from '../adapters/firebase-cms-document.adapters';
import { CmsCategory } from '../models/cms.models';
import { CategoriesRepository } from '../repositories/categories-repository';
import { FirebaseCmsEntityRepositoryBase } from './firebase-cms-entity-repository.base';

@Injectable({ providedIn: 'root' })
export class FirebaseCategoriesRepositoryService
  extends FirebaseCmsEntityRepositoryBase<CmsCategory>
  implements CategoriesRepository
{
  protected readonly collectionPath = 'categories';
  protected readonly adapter = firebaseCategoryAdapter;
}
