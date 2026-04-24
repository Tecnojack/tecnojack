import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  signal,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseApp } from '@angular/fire/app';
import { MediaAdminMediaService } from '../../../media-admin/media-admin-media.service';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  type FirebaseStorage,
} from 'firebase/storage';

@Component({
  selector: 'tj-upload-zone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-zone.component.html',
  styleUrls: ['./upload-zone.component.css'],
})
export class UploadZoneComponent implements OnChanges {
  private readonly mediaService = inject(MediaAdminMediaService);
  private readonly app = inject(FirebaseApp);
  private readonly storage: FirebaseStorage = getStorage(this.app);

  @Input() currentPath: string | null = null;
  @Input() mode: 'cover' | 'gallery' = 'cover';
  @Output() onUploadComplete = new EventEmitter<string | string[]>();

  isDragging = signal(false);
  isUploading = signal(false);
  progress = signal(0);
  status = signal<'idle' | 'uploading' | 'success' | 'error'>('idle');
  errorMessage = signal('');
  previews = signal<string[]>([]);

  // ✅ NORMALIZADOR CENTRAL (CLAVE)
  private normalizePath(path: any): string | null {
    if (!path || typeof path !== 'string') return null;

    const clean = path
      .trim()
      .replace(/\/+/g, '/')
      .replace(/^\/|\/$/g, '');

    return clean || null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPath']) {
      const normalized = this.normalizePath(changes['currentPath'].currentValue);

      if (!normalized) {
        console.error('❌ currentPath inválido:', changes['currentPath'].currentValue);
        this.setError('Ruta de destino inválida.');
      } else {
        console.log('✅ currentPath OK:', normalized);
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  private async handleFiles(files: File[]) {
    if (files.length === 0) return;

    const path = this.normalizePath(this.currentPath);

    // ✅ VALIDACIÓN REAL (SOLUCIONA TU ERROR)
    if (!path) {
      console.error('❌ PATH INVÁLIDO >>>', this.currentPath);
      this.setError('No hay carpeta seleccionada.');
      return;
    }

    console.log('📁 PATH FINAL >>>', path);

    if (this.mode === 'cover' && files.length > 1) {
      this.setError('Solo se permite una imagen para el cover.');
      return;
    }

    this.reset();

    // previews
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previews.update((p) => [...p, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    }

    if (this.mode === 'cover') {
      await this.performCoverUpload(files[0], path);
    } else {
      await this.performGalleryUpload(files, path);
    }
  }

  private async performCoverUpload(file: File, path: string) {
    this.isUploading.set(true);
    this.status.set('uploading');

    try {
      const storagePath = `${path}/cover.jpg`;
      const storageRef = ref(this.storage, storagePath);

      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: 'image/jpeg',
      });

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            this.progress.set(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
          },
          (error) => reject(error),
          async () => {
            try {
              const url = await getDownloadURL(storageRef);

              await this.mediaService.saveMediaRecord({
                id: `cover__${path.replace(/\//g, '_')}`,
                url,
                storagePath,
                folder: path,
                name: 'cover.jpg',
                mimeType: file.type || 'image/jpeg',
                sizeBytes: file.size,
              });

              this.finishSuccess(url);
              resolve();
            } catch (e) {
              reject(e);
            }
          },
        );
      });
    } catch (e: any) {
      this.setError(e?.message ?? 'Error al subir la imagen.');
    }
  }

  private async performGalleryUpload(files: File[], path: string) {
    this.isUploading.set(true);
    this.status.set('uploading');

    try {
      const urls: string[] = [];

      for (const file of files) {
        const ext = file.name.split('.').pop() ?? 'jpg';
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${ext}`;

        const storagePath = `${path}/${fileName}`;
        const storageRef = ref(this.storage, storagePath);

        await new Promise<void>((resolve, reject) => {
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              this.progress.set(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
              );
            },
            (error) => reject(error),
            async () => {
              try {
                const url = await getDownloadURL(storageRef);

                await this.mediaService.saveMediaRecord({
                  id: `media__${Date.now()}`,
                  url,
                  storagePath,
                  folder: path,
                  name: file.name,
                  mimeType: file.type,
                  sizeBytes: file.size,
                });

                urls.push(url);
                resolve();
              } catch (e) {
                reject(e);
              }
            },
          );
        });
      }

      this.finishSuccess(urls);
    } catch (e: any) {
      this.setError(e?.message ?? 'Error al subir los archivos.');
    }
  }

  private finishSuccess(result: string | string[]) {
    this.isUploading.set(false);
    this.status.set('success');
    this.onUploadComplete.emit(result);
  }

  private setError(msg: string) {
    console.error('❌ Upload error:', msg);
    this.isUploading.set(false);
    this.status.set('error');
    this.errorMessage.set(msg);
  }

  reset() {
    this.status.set('idle');
    this.previews.set([]);
    this.progress.set(0);
    this.errorMessage.set('');
  }
}
