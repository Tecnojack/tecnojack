import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ERP_IDENTITY_PORT } from '../../../core/auth/erp-identity.port';
import { ErpIdentityFacade } from '../../../core/auth/erp-identity.facade';
import { ErpShellComponent } from './erp-shell.component';

describe('ErpShellComponent', () => {
  let fixture: ComponentFixture<ErpShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErpShellComponent],
      providers: [
        provideRouter([]),
        { provide: ERP_IDENTITY_PORT, useValue: { session$: of(null) } },
        ErpIdentityFacade
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ErpShellComponent);
    fixture.detectChanges();
  });

  it('exposes the migrated ERP domains as navigable links', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.textContent).toContain('Dashboard');
    expect(host.querySelector('a[href="/app/dashboard"]')).not.toBeNull();
    expect(host.querySelector('a[href="/app/events"]')).not.toBeNull();
    expect(host.querySelector('a[href="/app/pipeline"]')).not.toBeNull();
  });

  it('opens and closes the responsive navigation state', () => {
    const component = fixture.componentInstance;

    component.toggleSidebar();
    expect(component.sidebarOpen()).toBeTrue();

    component.closeOverlays();
    expect(component.sidebarOpen()).toBeFalse();
  });

  it('collapses and expands the desktop navigation state', () => {
    const component = fixture.componentInstance;

    component.toggleSidebarCollapsed();
    expect(component.sidebarCollapsed()).toBeTrue();

    component.toggleSidebarCollapsed();
    expect(component.sidebarCollapsed()).toBeFalse();
  });

  it('restores the expanded navigation when the mobile menu opens', () => {
    const component = fixture.componentInstance;

    component.toggleSidebarCollapsed();
    component.toggleSidebar();

    expect(component.sidebarCollapsed()).toBeFalse();
    expect(component.sidebarOpen()).toBeTrue();
  });
});
