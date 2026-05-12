# CÓDIGO FUENTE ÍNTEGRO: Sistema de Subida de Imágenes - TECNOJACK

Este documento contiene el código fuente completo de todos los archivos involucrados en el sistema de subida de imágenes, incluyendo componentes (HTML, CSS, TS) y servicios.

---

## 1. COMPONENTE: `UploadZoneComponent`

### 1.1. TypeScript (`upload-zone.component.ts`)

```typescript
import { Component, Input, Output, EventEmitter, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StorageUploadService } from "../../services/storage-upload.service";
import { MediaAdminMediaService } from "../../../media-admin/media-admin-media.service";
import { Storage, ref, uploadBytesResumable, getDownloadURL } from "@angular/fire/storage";

@Component({
  selector: "tj-upload-zone",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./upload-zone.component.html",
  styleUrls: ["./upload-zone.component.css"],
})
export class UploadZoneComponent {
  private readonly uploadService = inject(StorageUploadService);
  private readonly mediaService = inject(MediaAdminMediaService);
  private readonly storage = inject(Storage);

  @Input({ required: true }) currentPath: string = "servicios";
  @Input() mode: "cover" | "gallery" = "cover";
  @Output() onUploadComplete = new EventEmitter<string | string[]>();

  isDragging = signal(false);
  isUploading = signal(false);
  progress = signal(0);
  status = signal<"idle" | "uploading" | "success" | "error">("idle");
  errorMessage = signal("");
  previews = signal<string[]>([]);

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

    // VALIDACIÓN ANTES DE SUBIR
    if (!this.currentPath) {
      console.error("Ruta no definida");
      this.setError("La ruta de destino no está definida.");
      return;
    }

    console.log("Subiendo a:", this.currentPath);

    // Validar modo
    if (this.mode === "cover" && files.length > 1) {
      this.setError("Solo se permite una imagen para el cover.");
      return;
    }

    // RESET antes de empezar
    this.status.set("idle");
    this.errorMessage.set("");
    this.previews.set([]);
    this.progress.set(0);

    // Generar previews
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previews.update((p) => [...p, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    }

    if (this.mode === "cover") {
      await this.performCoverUpload(files[0]);
    } else {
      await this.performGalleryUpload(files);
    }
  }

  private async performCoverUpload(file: File) {
    this.isUploading.set(true);
    this.status.set("uploading");
    this.progress.set(0);

    try {
      const path = String(this.currentPath ?? "").trim();
      if (!path) {
        throw new Error("La ruta de destino es inválida.");
      }

      // Usamos uploadBytesResumable para la barra de progreso
      const storagePath = `${path.replace(/\/+/g, "/").replace(/^\/|\/$/g, "")}/cover.jpg`;
      const storageRef = ref(this.storage, storagePath);

      console.log("Subiendo cover a:", storagePath);

      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: "image/jpeg",
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progress.set(p);
        },
        (error) => {
          this.setError("Error al subir el cover: " + error.message);
        },
        async () => {
          try {
            const url = await getDownloadURL(storageRef);

            // Sincronizar con Firestore
            const packageId = this.extractPackageId(storagePath);
            if (packageId) {
              await this.mediaService.uploadImageWithId(file, {
                id: `pkg__${packageId}`,
                folder: path,
                storagePath: storagePath,
                alt: `Cover de ${packageId}`,
                name: "cover.jpg",
              });
            } else {
              // Si no es un paquete, es un cover de página
              const pageId = path.replace(/\//g, "_");
              await this.mediaService.uploadImageWithId(file, {
                id: `page__${pageId}`,
                folder: path,
                storagePath: storagePath,
                alt: `Cover de ${path}`,
                name: "cover.jpg",
              });
            }

            this.isUploading.set(false);
            this.status.set("success");
            this.onUploadComplete.emit(url);
          } catch (err: any) {
            this.setError("Error al procesar la subida: " + err.message);
          }
        },
      );
    } catch (error: any) {
      this.setError(error.message);
    }
  }

  private async performGalleryUpload(files: File[]) {
    this.isUploading.set(true);
    this.status.set("uploading");
    this.progress.set(0);

    try {
      const path = String(this.currentPath ?? "").trim();
      if (!path) {
        throw new Error("La ruta de destino es inválida.");
      }

      const urls: string[] = [];
      let uploadedCount = 0;

      for (const file of files) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const fileName = `${timestamp}-${random}.${ext}`;

        const storagePath = `${path.replace(/\/+/g, "/").replace(/^\/|\/$/g, "")}/${fileName}`;
        const storageRef = ref(this.storage, storagePath);

        console.log("Subiendo imagen de galería a:", storagePath);

        await new Promise<void>((resolve, reject) => {
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Progreso global aproximado
              const fileProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              const totalProgress = (uploadedCount * 100 + fileProgress) / files.length;
              this.progress.set(totalProgress);
            },
            reject,
            async () => {
              try {
                const url = await getDownloadURL(storageRef);

                // Sincronizar con Firestore
                const mediaId = `media__${timestamp}__${random}`;
                await this.mediaService.uploadImageWithId(file, {
                  id: mediaId,
                  folder: path,
                  storagePath: storagePath,
                  name: file?.name || "imagen.jpg",
                });

                urls.push(url);
                uploadedCount++;
                resolve();
              } catch (err) {
                reject(err);
              }
            },
          );
        });
      }

      this.isUploading.set(false);
      this.status.set("success");
      this.onUploadComplete.emit(urls);
    } catch (error: any) {
      this.setError(error.message);
    }
  }

  private extractPackageId(path: string): string | null {
    const parts = path.split("/");
    if (parts[0] === "servicios" && parts.length === 5 && parts[4] === "cover.jpg") {
      return parts[3];
    }
    return null;
  }

  private setError(msg: string) {
    this.isUploading.set(false);
    this.status.set("error");
    this.errorMessage.set(msg);
  }

  reset() {
    this.status.set("idle");
    this.previews.set([]);
    this.progress.set(0);
    this.errorMessage.set("");
  }
}
```

### 1.2. HTML (`upload-zone.component.html`)

```html
<div class="upload-container" [class.dragging]="isDragging()" [class.uploading]="isUploading()" (dragover)="onDragOver($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)">
  @if (status() === "idle") {
  <div class="upload-content">
    <div class="icon-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    </div>
    <div class="text-box">
      <p class="main-text">Arrastra imágenes aquí o haz clic para seleccionar</p>
      @if (mode === "cover") {
      <p class="sub-text">Modo: Cover (Solo 1 imagen, será renombrada a cover.jpg)</p>
      } @if (mode === "gallery") {
      <p class="sub-text">Modo: Galería (Múltiples imágenes permitidas)</p>
      }
    </div>
    <input type="file" class="file-input" [multiple]="mode === 'gallery'" accept="image/jpeg,image/png,image/webp" (change)="onFileSelected($event)" />
  </div>
  } @if (status() === "uploading") {
  <div class="upload-progress-box">
    @if (previews().length > 0) {
    <div class="previews-mini">
      @for (p of previews(); track p) {
      <img [src]="p" alt="Preview" />
      }
    </div>
    }
    <p class="status-text">Subiendo archivos... {{ progress() | number: "1.0-0" }}%</p>
    <div class="progress-bar-container">
      <div class="progress-bar" [style.width.%]="progress()"></div>
    </div>
  </div>
  } @if (status() === "success") {
  <div class="upload-result-box success">
    <div class="icon-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
    <p class="status-text">¡Subida completada con éxito!</p>
    <button class="btn-reset" (click)="reset()">Subir más</button>
  </div>
  } @if (status() === "error") {
  <div class="upload-result-box error">
    <div class="icon-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    </div>
    <p class="status-text">{{ errorMessage() }}</p>
    <button class="btn-reset" (click)="reset()">Reintentar</button>
  </div>
  }
</div>
```

### 1.3. CSS (`upload-zone.component.css`)

```css
.upload-container {
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  padding: 40px;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.upload-container.dragging {
  border-color: #0097b2;
  background: rgba(0, 151, 178, 0.1);
  transform: scale(1.02);
}

.upload-container.uploading {
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.1);
}

.upload-content {
  cursor: pointer;
  width: 100%;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.icon-box {
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.6);
}

.dragging .icon-box {
  color: #0097b2;
}

.main-text {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text);
}

.sub-text {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.upload-progress-box {
  width: 100%;
  max-width: 400px;
}

.previews-mini {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.previews-mini img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.status-text {
  margin-bottom: 12px;
  font-weight: 500;
}

.progress-bar-container {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #0097b2;
  transition: width 0.3s ease;
}

.upload-result-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-result-box.success .icon-box {
  color: #10b981;
}

.upload-result-box.error .icon-box {
  color: #ef4444;
}

.btn-reset {
  margin-top: 16px;
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-reset:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}
```

---

## 2. SERVICIO: `MediaAdminMediaService`

### 2.1. TypeScript (`media-admin-media.service.ts`)

```typescript
import { Injectable, inject } from "@angular/core";
import { FirebaseApp } from "@angular/fire/app";
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, updateDoc, where, type Firestore } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes, type FirebaseStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Observable } from "rxjs";

export type MediaAdminMediaType = "image" | "other";

export interface MediaAdminMediaDoc {
  id: string;
  name: string;
  url: string;
  alt: string;
  folder: string;
  mimeType: string;
  sizeLabel: string;
  storagePath: string;
  mediaType: MediaAdminMediaType;
  active: boolean;
  status: "published" | "draft";
  order: number;
  publishedAt: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: "root" })
export class MediaAdminMediaService {
  private readonly app = inject(FirebaseApp);
  private readonly firestore: Firestore = getFirestore(this.app);
  private readonly storage: FirebaseStorage = getStorage(this.app);

  readonly media$: Observable<MediaAdminMediaDoc[]> = new Observable<MediaAdminMediaDoc[]>((subscriber) => {
    const q = query(collection(this.firestore, "media"), orderBy("order", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        subscriber.next(
          snapshot.docs.map((record) => ({
            id: record.id,
            ...(record.data() as Omit<MediaAdminMediaDoc, "id">),
          })),
        );
      },
      (error) => subscriber.error(error),
    );

    return unsubscribe;
  });

  listByFolder$(folder: string): Observable<MediaAdminMediaDoc[]> {
    const normalized = this.normalizeFolder(folder);
    return new Observable<MediaAdminMediaDoc[]>((subscriber) => {
      const q = query(collection(this.firestore, "media"), where("folder", "==", normalized), where("deletedAt", "==", null), orderBy("order", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          subscriber.next(
            snapshot.docs.map((record) => ({
              id: record.id,
              ...(record.data() as Omit<MediaAdminMediaDoc, "id">),
            })),
          );
        },
        (error) => subscriber.error(error),
      );

      return unsubscribe;
    });
  }

  async uploadImage(file: File, options?: { alt?: string; folder?: string }): Promise<void> {
    const folder = this.normalizeFolder(options?.folder) || "media";
    const storagePath = `${folder}/${Date.now()}-${this.sanitizeFileName(file.name)}`;
    const storageRef = ref(this.storage, storagePath);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    const nowIso = new Date().toISOString();
    const order = Date.now();

    await addDoc(collection(this.firestore, "media"), {
      name: file.name,
      url: downloadUrl,
      alt: String(options?.alt ?? "").trim() || file.name,
      folder,
      mimeType: file.type,
      sizeLabel: this.formatSizeLabel(file.size),
      storagePath,
      mediaType: file.type.startsWith("image/") ? "image" : "other",
      active: true,
      status: "published",
      order,
      publishedAt: nowIso,
      deletedAt: null,
      createdAt: nowIso,
      updatedAt: nowIso,
    } satisfies Omit<MediaAdminMediaDoc, "id">);
  }

  async uploadImageWithId(
    file: File,
    options: {
      id: string;
      alt?: string;
      folder: string;
      storagePath: string;
      name?: string;
    },
  ): Promise<{
    id: string;
    url: string;
    storagePath: string;
    folder: string;
  } | null> {
    const id = String(options?.id ?? "").trim();
    if (!id) return null;

    const folder = this.normalizeFolder(options?.folder) || "media";
    const storagePath = String(options?.storagePath ?? "").trim();
    if (!storagePath) return null;

    const storageRef = ref(this.storage, storagePath);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    const nowIso = new Date().toISOString();
    const order = Date.now();

    await setDoc(
      doc(this.firestore, "media", id),
      {
        name: String(options?.name ?? file.name),
        url: downloadUrl,
        alt: String(options?.alt ?? "").trim() || file.name,
        folder,
        mimeType: file.type,
        sizeLabel: this.formatSizeLabel(file.size),
        storagePath,
        mediaType: file.type.startsWith("image/") ? "image" : "other",
        active: true,
        status: "published",
        order,
        publishedAt: nowIso,
        deletedAt: null,
        createdAt: nowIso,
        updatedAt: nowIso,
      } satisfies Omit<MediaAdminMediaDoc, "id">,
      { merge: true },
    );

    return { id, url: downloadUrl, storagePath, folder };
  }

  async softDelete(asset: Pick<MediaAdminMediaDoc, "id" | "storagePath">): Promise<void> {
    const id = String(asset.id ?? "").trim();
    if (!id) return;

    const storagePath = String(asset.storagePath ?? "").trim();
    if (storagePath) {
      try {
        await deleteObject(ref(this.storage, storagePath));
      } catch {}
    }

    const nowIso = new Date().toISOString();
    await updateDoc(doc(this.firestore, "media", id), {
      active: false,
      updatedAt: nowIso,
      deletedAt: nowIso,
      status: "draft",
    });
  }

  private sanitizeFileName(value: string): string {
    return String(value ?? "")
      .trim()
      .replace(/\\/g, "-")
      .replace(/\//g, "-")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]+/g, "")
      .slice(0, 120);
  }

  private normalizeFolder(value?: string): string {
    const normalized = String(value ?? "")
      .trim()
      .replace(/^\/+/, "")
      .replace(/\/+$/, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9/_-]+/g, "");
    return normalized;
  }

  private formatSizeLabel(bytes: number): string {
    const mb = Number(bytes ?? 0) / 1024 / 1024;
    return `${mb.toFixed(2)} MB`;
  }
}
```

---

## 3. SERVICIO: `StorageUploadService`

### 3.1. TypeScript (`storage-upload.service.ts`)

```typescript
import { Injectable, inject } from "@angular/core";
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from "@angular/fire/storage";

@Injectable({
  providedIn: "root",
})
export class StorageUploadService {
  private readonly storage = inject(Storage);

  private isValidImage(file: File): boolean {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    return allowedTypes.includes(file.type);
  }

  async uploadCover(file: File, path: string): Promise<string> {
    if (!this.isValidImage(file)) {
      throw new Error("Tipo de archivo no permitido. Solo jpg, png o webp.");
    }

    const storagePath = `${this.cleanPath(path)}/cover.jpg`;
    const storageRef = ref(this.storage, storagePath);

    await uploadBytes(storageRef, file, { contentType: "image/jpeg" });
    return await getDownloadURL(storageRef);
  }

  async uploadClientImages(files: File[], path: string): Promise<string[]> {
    const uploadPromises = files.map(async (file) => {
      if (!this.isValidImage(file)) {
        console.warn(`Archivo omitido por tipo no válido: ${file.name}`);
        return null;
      }

      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${timestamp}-${random}.${ext}`;

      const storagePath = `${this.cleanPath(path)}/${fileName}`;
      const storageRef = ref(this.storage, storagePath);

      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    });

    const results = await Promise.all(uploadPromises);
    return results.filter((url): url is string => url !== null);
  }

  async deleteFile(path: string): Promise<void> {
    const storageRef = ref(this.storage, this.cleanPath(path));
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error al eliminar archivo:", error);
      throw error;
    }
  }

  private cleanPath(path: string): string {
    return path
      .trim()
      .replace(/\/+/g, "/")
      .replace(/^\/|\/$/g, "");
  }
}
```

---

_Documentación técnica con código fuente completo - TECNOJACK_
