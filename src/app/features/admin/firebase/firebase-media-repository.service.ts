import { Injectable } from '@angular/core';
import { firebaseMediaAdapter } from '../adapters/firebase-cms-document.adapters';
import { CmsMedia } from '../models/cms.models';
import { MediaRepository } from '../repositories/media-repository';
import { FirebaseCmsEntityRepositoryBase } from './firebase-cms-entity-repository.base';

@Injectable({ providedIn: 'root' })
export class FirebaseMediaRepositoryService
  extends FirebaseCmsEntityRepositoryBase<CmsMedia>
  implements MediaRepository
{
  protected readonly collectionPath = 'media';
  protected readonly adapter = firebaseMediaAdapter;
}
