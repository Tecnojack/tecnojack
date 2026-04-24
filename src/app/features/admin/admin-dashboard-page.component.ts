import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CmsPage } from './models/cms.models';
import { CmsVisualEditorService } from './services/cms-visual-editor.service';
import { MockCmsStoreService } from './services/mock-cms-store.service';
import { StorageStructureService } from './services/storage-structure.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.scss'
})
export class AdminDashboardPageComponent {
  private readonly store = inject(MockCmsStoreService);
  private readonly visualEditor = inject(CmsVisualEditorService);
  private readonly storageStructure = inject(StorageStructureService);
  private readonly state = toSignal(this.store.state$, { initialValue: this.store.getSnapshot() });

  readonly isCreatingStructure = signal(false);
  readonly structureProgress = signal({ 
    current: 0, 
    total: 0, 
    lastPath: '', 
    success: true, 
    status: 'exists' as 'created' | 'exists' | 'error' 
  });
  readonly showSuccessMessage = signal(false);

  readonly settings = computed(() => this.state().generalSettings[0] ?? null);

  readonly dashboardStats = computed(() => [
    { label: 'Páginas públicas', value: this.publicPages().length },
    { label: 'Secciones', value: this.state().sections.length },
    { label: 'Servicios', value: this.state().services.length },
    { label: 'Paquetes', value: this.state().packages.length }
  ]);

  readonly publicPages = computed(() =>
    this.state().pages
      .filter((page) => page.pageType !== 'admin')
      .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name))
  );

  readonly pageSummaries = computed(() =>
    this.publicPages().map((page) => ({
      page,
      sections: this.state().sections.filter((section) => section.pageId === page.id),
      services: this.state().services.filter((service) => service.pageIds.includes(page.id)),
      packages: this.state().packages.filter((item) => item.pageIds.includes(page.id)),
      stories: this.state().stories.filter((story) => story.pageIds.includes(page.id)),
      gallery: this.state().galleryItems.filter((item) => item.pageIds.includes(page.id))
    }))
  );

  publicEditHref(page: CmsPage): string {
    return this.visualEditor.getPublicRouteForPage(page);
  }

  createStorageStructure(): void {
    if (this.isCreatingStructure()) return;

    this.isCreatingStructure.set(true);
    this.showSuccessMessage.set(false);
    this.structureProgress.set({ 
      current: 0, 
      total: 0, 
      lastPath: 'Iniciando...', 
      success: true,
      status: 'exists'
    });

    this.storageStructure.createFullStructure()
      .pipe(
        finalize(() => {
          this.isCreatingStructure.set(false);
          this.showSuccessMessage.set(true);
          setTimeout(() => this.showSuccessMessage.set(false), 5000);
        })
      )
      .subscribe({
        next: (progress) => {
          this.structureProgress.set({
            current: progress.current,
            total: progress.total,
            lastPath: progress.path,
            success: progress.success,
            status: progress.status
          });
        },
        error: (err) => {
          console.error('Error creando estructura:', err);
          this.isCreatingStructure.set(false);
        }
      });
  }
}
