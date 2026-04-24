import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientPublicService } from '../services/client-public.service';
import { Observable } from 'rxjs';
import { optimizeImage } from '../../../core/utils/image-optimizer.util';
import { LazyImgComponent } from '../../../shared/images/lazy-img.component';

@Component({
  selector: 'app-clients-gallery',
  standalone: true,
  imports: [CommonModule, LazyImgComponent],
  template: `
    <div class="gallery">
      <h2 *ngIf="title" class="gallery__title">{{ title }}</h2>

      <div *ngIf="(images$ | async) as images">
        <div *ngIf="images.length === 0" class="gallery__empty">
          <p>No hay imágenes en esta galería</p>
        </div>

        <div class="gallery__grid" *ngIf="getVisibleImages(images) as visibleImages">
          <div
            *ngFor="let image of visibleImages; let i = index; trackBy: trackById"
            class="gallery__item"
            (click)="openLightbox(i)">
            <tj-lazy-img
              [src]="optimizeImage(image.url, 400)"
              [alt]="'Foto ' + (i + 1)"
              aspectRatio="1 / 1"
              class="gallery__img"></tj-lazy-img>
            <div class="gallery__overlay">
              <span class="icon">🔍</span>
            </div>
          </div>
        </div>

        <button *ngIf="hasMoreImages(images)" class="lightbox__btn" type="button" (click)="loadMore()">
          Cargar más
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <div *ngIf="selectedImageIndex !== null" class="lightbox" (click)="closeLightbox()">
      <div class="lightbox__content" (click)="$event.stopPropagation()">
        <button class="lightbox__close" (click)="closeLightbox()">✕</button>

        <div class="lightbox__main">
          <img
            *ngIf="(images$ | async) as images"
            [src]="images[selectedImageIndex]"
            alt="Imagen"
            class="lightbox__image" />
        </div>

        <div class="lightbox__controls">
          <button
            class="lightbox__btn"
            (click)="prevImage()"
            [disabled]="selectedImageIndex === 0">
            ← Anterior
          </button>

          <span class="lightbox__counter">
            {{ (selectedImageIndex || 0) + 1 }} / {{ (images$ | async)?.length || 0 }}
          </span>

          <button
            class="lightbox__btn"
            (click)="nextImage()"
            [disabled]="(selectedImageIndex || 0) >= ((images$ | async)?.length || 0) - 1">
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .gallery {
        width: 100%;
      }

      .gallery__title {
        margin: 0 0 24px 0;
        font-size: 24px;
        font-weight: 600;
        color: #333;
      }

      .gallery__empty {
        text-align: center;
        padding: 60px 20px;
        color: #999;
      }

      .gallery__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
      }

      .gallery__item {
        position: relative;
        height: 200px;
        overflow: hidden;
        border-radius: 8px;
        cursor: pointer;
        background: #f0f0f0;
      }

      .gallery__img {
        display: block;
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
      }

      .gallery__item:hover .gallery__img {
        transform: scale(1.05);
      }

      .gallery__overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .gallery__item:hover .gallery__overlay {
        opacity: 1;
      }

      .icon {
        font-size: 32px;
        color: white;
      }

      /* LIGHTBOX */
      .lightbox {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.2s ease;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .lightbox__content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .lightbox__close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 32px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1001;
      }

      .lightbox__close:hover {
        color: #ccc;
      }

      .lightbox__main {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
      }

      .lightbox__image {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
        border-radius: 8px;
      }

      .lightbox__controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
        color: white;
      }

      .lightbox__btn {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 10px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s;
      }

      .lightbox__btn:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.2);
      }

      .lightbox__btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .lightbox__counter {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsGalleryComponent {
  private static readonly INITIAL_VISIBLE_IMAGES = 20;
  private static readonly VISIBLE_IMAGE_STEP = 20;

  @Input() folder: string = '';
  @Input() title: string = 'Galería';

  private readonly clientPublic = inject(ClientPublicService);

  images$: Observable<string[]>;
  selectedImageIndex: number | null = null;
  visibleCount = ClientsGalleryComponent.INITIAL_VISIBLE_IMAGES;

  constructor() {
    this.images$ = this.clientPublic.getClientGallery$(this.folder);
  }

  getVisibleImages(images: string[]): Array<{ id: string; url: string }> {
    return images
      .slice(0, this.visibleCount)
      .map((url, index) => ({ id: `${index}-${url}`, url }));
  }

  hasMoreImages(images: string[]): boolean {
    return images.length > this.visibleCount;
  }

  loadMore(): void {
    this.visibleCount += ClientsGalleryComponent.VISIBLE_IMAGE_STEP;
  }

  optimizeImage(url: string, width = 400): string {
    return optimizeImage(url, width);
  }

  trackById(index: number, item: { id: string }): string {
    return item.id;
  }

  openLightbox(index: number): void {
    this.selectedImageIndex = index;
  }

  closeLightbox(): void {
    this.selectedImageIndex = null;
  }

  nextImage(): void {
    if (this.selectedImageIndex !== null) {
      this.selectedImageIndex++;
    }
  }

  prevImage(): void {
    if (this.selectedImageIndex !== null && this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    }
  }
}
