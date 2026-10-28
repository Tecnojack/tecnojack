import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faBell,
  faBoxOpen,
  faBullseye,
  faCalendarDays,
  faCamera,
  faChevronLeft,
  faClapperboard,
  faCog,
  faCreditCard,
  faEllipsis,
  faEnvelope,
  faFileContract,
  faFileInvoice,
  faGlobe,
  faGrip,
  faHouse,
  faImages,
  faListCheck,
  faMagnifyingGlass,
  faPlus,
  faShieldAlt,
  faUserGroup,
  faUsers,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { filter, map, startWith } from 'rxjs';

import { ErpIdentityFacade } from '../../../core/auth/erp-identity.facade';

interface ErpNavigationItem {
  label: string;
  icon: IconDefinition;
  route?: string;
  available: boolean;
}

interface ErpNavigationGroup {
  label: string;
  items: ErpNavigationItem[];
}

@Component({
  selector: 'tj-erp-shell',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive, RouterOutlet, FontAwesomeModule],
  templateUrl: './erp-shell.component.html',
  styleUrl: './erp-shell.component.scss'
})
export class ErpShellComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly identity = inject(ErpIdentityFacade);
  readonly sidebarOpen = signal(false);
  readonly sidebarCollapsed = signal(false);
  readonly notificationsOpen = signal(false);
  readonly role = signal('Owner');
  readonly commandOpen = signal(false);
  readonly commandQuery = signal('');
  readonly actionDialog = signal<{ title: string; endpoint: string; description: string } | null>(null);
  readonly actionResult = signal('');
  readonly currentSection = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => this.sectionFromUrl(event.urlAfterRedirects)),
      startWith(this.sectionFromUrl(this.router.url)),
      takeUntilDestroyed(this.destroyRef)
    ),
    { initialValue: 'Dashboard' }
  );

  readonly icons = {
    bars: faBars,
    bell: faBell,
    chevronLeft: faChevronLeft,
    ellipsis: faEllipsis,
    house: faHouse,
    listCheck: faListCheck,
    magnifyingGlass: faMagnifyingGlass,
    plus: faPlus,
    xmark: faXmark
  };

  readonly navigation: ErpNavigationGroup[] = [
    {
      label: 'Inicio',
      items: [{ label: 'Dashboard', icon: faGrip, route: '/app/dashboard', available: true }]
    },
    {
      label: 'Comercial',
      items: [
        { label: 'CRM / Personas', icon: faUsers, route: '/app/people', available: true },
        { label: 'Pipeline', icon: faBullseye, route: '/app/pipeline', available: true },
        { label: 'Cotizaciones', icon: faFileInvoice, route: '/app/quotations', available: true }
      ]
    },
    {
      label: 'Operaciones',
      items: [
        { label: 'Eventos', icon: faCalendarDays, route: '/app/events', available: true },
        { label: 'Producción', icon: faClapperboard, route: '/app/production', available: true },
        { label: 'Equipo', icon: faUserGroup, route: '/app/crew', available: true },
        { label: 'Equipamiento', icon: faCamera, route: '/app/equipment', available: true }
      ]
    },
    {
      label: 'Creativo',
      items: [
        { label: 'Media', icon: faImages, route: '/app/media', available: true },
        { label: 'Galerías', icon: faCamera, route: '/app/galleries', available: true },
        { label: 'Entregables', icon: faBoxOpen, route: '/app/deliverables', available: true }
      ]
    },
    {
      label: 'Finanzas',
      items: [
        { label: 'Contratos', icon: faFileContract, route: '/app/contracts', available: true },
        { label: 'Pagos', icon: faCreditCard, route: '/app/payments', available: true }
      ]
    },
    {
      label: 'Comunicación',
      items: [
        { label: 'Invitaciones', icon: faEnvelope, route: '/app/invitations', available: true }
      ]
    },
    {
      label: 'Admin',
      items: [
        { label: 'Portal Cliente', icon: faGlobe, route: '/app/portal', available: true },
        { label: 'Administración', icon: faShieldAlt, route: '/app/admin', available: true },
        { label: 'Configuración', icon: faCog, route: '/app/settings', available: true }
      ]
    }
  ];

  toggleSidebar(): void {
    this.sidebarCollapsed.set(false);
    this.sidebarOpen.update((open) => !open);
    this.notificationsOpen.set(false);
  }

  toggleSidebarCollapsed(): void {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  toggleNotifications(): void {
    this.notificationsOpen.update((open) => !open);
  }

  setRole(value: string): void {
    this.role.set(value);
  }

  openCommand(): void {
    this.commandOpen.set(true);
    this.commandQuery.set('');
  }

  closeCommand(): void {
    this.commandOpen.set(false);
  }

  commandItems(): ErpNavigationItem[] {
    const query = this.commandQuery().trim().toLowerCase();
    return this.navigation.flatMap((group) => group.items).filter((item) => !query || item.label.toLowerCase().includes(query));
  }

  navigateFromCommand(item: ErpNavigationItem): void {
    if (item.route) void this.router.navigateByUrl(item.route);
    this.closeCommand();
  }

  triggerCreate(): void {
    const url = this.router.url;
    if (url.includes('/galleries')) {
      void this.router.navigate(['/app/galleries'], { queryParams: { create: '1' } });
      return;
    }
    const action = url.includes('/pipeline') ? ['Nueva Oportunidad', 'POST /crm/opportunities', 'Crea una oportunidad vinculada a una persona u organización.']
      : url.includes('/quotations') ? ['Nueva Cotización', 'POST /crm/opportunities/:id/quotations', 'Crea una cotización dentro de una oportunidad comercial.']
      : url.includes('/contracts') ? ['Nuevo Contrato', 'POST /contracts', 'Crea un contrato relacionado con un evento.']
      : url.includes('/payments') ? ['Registrar Pago', 'POST /payments/:id/transactions', 'Registra una transacción sobre un plan de pago.']
      : url.includes('/galleries') ? ['Nueva Galería', 'POST /galleries', 'Crea una galería asociada a un evento.']
      : url.includes('/invitations') ? ['Crear Invitación', 'POST /invitations', 'Crea una invitación digital asociada a un evento.']
      : url.includes('/media') ? ['Subir Archivos', 'POST /media-assets', 'Registra activos subidos al almacenamiento.']
      : url.includes('/people') ? ['Nuevo Contacto', 'POST /persons', 'Crea una persona en el dominio People.']
      : ['Nuevo Evento', 'POST /events', 'Crea un evento con tipo, fechas, prioridad y brief.'];
    this.actionDialog.set({ title: action[0], endpoint: action[1], description: action[2] });
  }

  closeAction(): void {
    this.actionDialog.set(null);
  }

  confirmLocalAction(): void {
    const action = this.actionDialog();
    if (!action) return;
    this.actionResult.set(`${action.title}: borrador preparado localmente. La sincronización se habilitará cuando la API esté disponible.`);
    this.closeAction();
  }

  @HostListener('click', ['$event'])
  handleFeatureButton(event: Event): void {
    const target = event.target as HTMLElement | null;
    const button = target?.closest('button') as HTMLButtonElement | null;
    if (!button || button.disabled || !button.closest('.erp-content')) return;
    if (!button.matches('.tj-erp-btn, .tj-erp-btn-sm, .icon-action')) return;
    if (this.router.url.includes('/galleries')) return;
    const label = button.textContent?.trim() || 'Acción';
    if (/workspace|volver|ver todos|ver pipeline|ver cartera/i.test(label)) return;
    const endpoint = this.endpointForLabel(label);
    this.actionDialog.set({ title: label, endpoint, description: `Esta acción se integrará mediante ${endpoint}. Mientras la API no esté activa, se conserva como operación local segura.` });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openCommand();
    }
  }

  @HostListener('document:keydown.escape')
  closeOverlays(): void {
    this.sidebarOpen.set(false);
    this.notificationsOpen.set(false);
    this.commandOpen.set(false);
    this.actionDialog.set(null);
  }

  initials(): string {
    const value = this.identity.session()?.displayName || 'Usuario';
    return value
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'U';
  }

  private sectionFromUrl(url: string): string {
    if (url.startsWith('/app/people')) return 'Personas y clientes';
    if (url.startsWith('/app/pipeline')) return 'Pipeline de Ventas';
    if (url.startsWith('/app/quotations')) return 'Cotizaciones';
    if (url.startsWith('/app/events')) return 'Gestión de Eventos';
    if (url.startsWith('/app/production')) return 'Production Workspace';
    if (url.startsWith('/app/crew')) return 'Equipo & Crew';
    if (url.startsWith('/app/equipment')) return 'Inventario de Equipamiento';
    if (url.startsWith('/app/media')) return 'Media Library';
    if (url.startsWith('/app/galleries')) return 'Galerías de Clientes';
    if (url.startsWith('/app/deliverables')) return 'Entregables';
    if (url.startsWith('/app/contracts')) return 'Contratos';
    if (url.startsWith('/app/payments')) return 'Pagos';
    if (url.startsWith('/app/invitations')) return 'Invitaciones';
    if (url.startsWith('/app/portal')) return 'Portal Cliente';
    if (url.startsWith('/app/admin')) return 'Administración';
    if (url.startsWith('/app/settings')) return 'Configuración';
    return 'Dashboard';
  }

  private endpointForLabel(label: string): string {
    const value = label.toLowerCase();
    if (value.includes('evento')) return 'POST /events';
    if (value.includes('oportunidad')) return 'POST /crm/opportunities';
    if (value.includes('cotiza')) return 'POST /crm/opportunities/:id/quotations';
    if (value.includes('contrato')) return 'POST /contracts';
    if (value.includes('pago')) return 'POST /payments/:id/transactions';
    if (value.includes('galer')) return 'POST /galleries';
    if (value.includes('invit')) return 'POST /invitations';
    if (value.includes('subir') || value.includes('archivo')) return 'POST /media-assets';
    if (value.includes('entreg')) return 'POST /deliverables';
    if (value.includes('equipo') || value.includes('añadir')) return 'Acción local del módulo';
    return 'Contrato por definir en la facade del dominio';
  }
}
