import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { MediaRepository } from '../repositories/media-repository';
import { MEDIA_REPOSITORY } from '../repositories/media-repository';
import { CmsMedia } from '../models/cms.models';

export interface FirebaseMediaUploadResult {
  url: string;
  alt: string;
  folder: string;
  mimeType: string;
  sizeLabel: string;
  mediaType: CmsMedia['mediaType'];
}

@Injectable({ providedIn: 'root' })
export class FirebaseCmsMediaUploadService {
  private readonly storage = inject(Storage);
  private readonly mediaRepository = inject<MediaRepository>(MEDIA_REPOSITORY);

  async uploadFile(file: File, options?: { alt?: string; folder?: string }): Promise<FirebaseMediaUploadResult> {
    const folder = options?.folder?.trim() || 'cms';
    const storagePath = `${folder}/${Date.now()}-${file.name}`;
    const storageRef = ref(this.storage, storagePath);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    return {
      url: downloadUrl,
      alt: options?.alt ?? file.name,
      folder,
      mimeType: file.type,
      sizeLabel: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      mediaType: file.type.startsWith('image/') ? 'image' : 'other'
    };
  }

  async upload(file: File, options?: { alt?: string; folder?: string }): Promise<CmsMedia> {
    const uploadedFile = await this.uploadFile(file, options);

    return this.mediaRepository.create({
      name: file.name,
      mediaType: uploadedFile.mediaType,
      url: uploadedFile.url,
      alt: uploadedFile.alt,
      folder: uploadedFile.folder,
      mimeType: uploadedFile.mimeType,
      sizeLabel: uploadedFile.sizeLabel,
      isMockUpload: false,
      active: true,
      status: 'published',
      publishedAt: new Date().toISOString(),
      deletedAt: null,
      order: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
}
