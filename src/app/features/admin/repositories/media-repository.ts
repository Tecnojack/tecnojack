import { InjectionToken } from '@angular/core';
import { CmsMedia } from '../models/cms.models';
import { CmsEntityRepository } from './cms-entity-repository';

export interface MediaRepository extends CmsEntityRepository<CmsMedia> {}

export const MEDIA_REPOSITORY = new InjectionToken<MediaRepository>('MEDIA_REPOSITORY');
