import { Injectable, signal } from '@angular/core';

export type GalleryDownloadStatus = 'Queued' | 'Preparing' | 'Ready' | 'Failed';
export interface GalleryDownloadJob { id: string; galleryId: string; scope: 'photo' | 'collection' | 'favorites' | 'selection' | 'gallery'; progress: number; status: GalleryDownloadStatus; }

@Injectable({ providedIn: 'root' })
export class GalleryDownloadService {
  readonly jobs = signal<GalleryDownloadJob[]>([]);
  start(galleryId: string, scope: GalleryDownloadJob['scope']): GalleryDownloadJob {
    const job = { id: `download-${Date.now()}`, galleryId, scope, progress: 0, status: 'Queued' as GalleryDownloadStatus };
    this.jobs.update(items => [job, ...items]);
    let progress = 0;
    const timer = window.setInterval(() => {
      progress += 25;
      const status: GalleryDownloadStatus = progress >= 100 ? 'Ready' : progress >= 25 ? 'Preparing' : 'Queued';
      this.jobs.update(items => items.map(item => item.id === job.id ? { ...item, progress, status } : item));
      if (progress >= 100) window.clearInterval(timer);
    }, 220);
    return job;
  }
  latest(galleryId: string): GalleryDownloadJob | undefined { return this.jobs().find(job => job.galleryId === galleryId); }
}
