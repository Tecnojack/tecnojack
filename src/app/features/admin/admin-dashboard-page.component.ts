import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CmsPage } from './models/cms.models';
import { CmsVisualEditorService } from './services/cms-visual-editor.service';
import { MockCmsStoreService } from './services/mock-cms-store.service';

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
  private readonly state = toSignal(this.store.state$, { initialValue: this.store.getSnapshot() });

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
}
