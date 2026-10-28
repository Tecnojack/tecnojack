import { Injectable, signal } from '@angular/core';

export type GalleryUploadStatus = 'Queued' | 'Uploading' | 'Processing' | 'Ready' | 'Failed';
export interface GalleryUpload { id: string; file: File; progress: number; status: GalleryUploadStatus; preview: string; }

@Injectable({ providedIn: 'root' })
export class GalleryUploadService {
  readonly queue = signal<GalleryUpload[]>([]);

  add(files: File[]): void {
    const additions = files.map((file, index) => ({ id: `${Date.now()}-${index}-${file.name}`, file, progress: 0, status: 'Queued' as GalleryUploadStatus, preview: URL.createObjectURL(file) }));
    this.queue.update(items => [...items, ...additions]);
    additions.forEach(item => this.process(item.id));
  }

  remove(id: string): void { this.queue.update(items => items.filter(item => item.id !== id)); }

  clearReady(): void { this.queue.update(items => items.filter(item => item.status !== 'Ready')); }

  private process(id: string): void {
    let progress = 0;
    const timer = window.setInterval(() => {
      progress += 25;
      const status: GalleryUploadStatus = progress < 50 ? 'Uploading' : progress < 100 ? 'Processing' : 'Ready';
      this.queue.update(items => items.map(item => item.id === id ? { ...item, progress, status } : item));
      if (progress >= 100) window.clearInterval(timer);
    }, 180);
  }
}
