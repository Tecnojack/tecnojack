import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminAuthService } from './firebase/admin-auth.service';
import { CMS_BACKEND_MODE, CmsBackendMode } from './repositories/cms-database-repository';
import { MockCmsStoreService } from './services/mock-cms-store.service';

interface AdminSidebarItem {
  label: string;
  description: string;
  route: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-shell.component.html',
  styleUrl: './admin-shell.component.scss'
})
export class AdminShellComponent {
  private readonly store = inject(MockCmsStoreService);
  private readonly authService = inject(AdminAuthService);
  private readonly backendMode = inject<CmsBackendMode>(CMS_BACKEND_MODE);
  private readonly state = toSignal(this.store.state$, { initialValue: this.store.getSnapshot() });
  private readonly user = toSignal(this.authService.user$, { initialValue: null });

  readonly totalRecords = computed(() =>
    Object.values(this.state()).reduce((total, collection) => total + collection.length, 0)
  );

  readonly publicPagesCount = computed(() =>
    this.state().pages.filter((page) => page.pageType !== 'admin').length
  );

  readonly servicesCount = computed(() => this.state().services.length);
  readonly packagesCount = computed(() => this.state().packages.length);
  readonly backendLabel = this.backendMode === 'firebase' ? 'Firebase activo' : 'Mock activo';
  readonly canResetSeed = this.backendMode !== 'firebase';
  readonly userEmail = computed(() => this.user()?.email ?? 'Sesión activa');

  readonly navItems = computed<AdminSidebarItem[]>(() => [
    {
      label: 'Configuración general',
      description: 'Dashboard estructurado por página con resumen general del sitio.',
      route: '/admin/dashboard',
      icon: 'DG',
      count: this.publicPagesCount()
    },
    {
      label: 'Páginas',
      description: 'Administra cada página o servicio con sus secciones, servicios y paquetes.',
      route: '/admin/pages',
      icon: 'PG',
      count: this.publicPagesCount()
    }
  ]);

  readonly shellStats = computed(() => [
    { label: 'Páginas públicas', value: this.publicPagesCount() },
    { label: 'Servicios', value: this.servicesCount() },
    { label: 'Paquetes', value: this.packagesCount() }
  ]);

  async resetDatabase(): Promise<void> {
    if (!this.canResetSeed) {
      return;
    }

    const shouldReset = window.confirm('Esto restaurara el contenido mock inicial del CMS. Deseas continuar?');
    if (!shouldReset) {
      return;
    }

    await this.store.reset();
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
