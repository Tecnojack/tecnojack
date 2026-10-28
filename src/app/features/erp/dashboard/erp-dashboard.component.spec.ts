import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpDashboardComponent } from './erp-dashboard.component';

describe('ErpDashboardComponent', () => {
  let fixture: ComponentFixture<ErpDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErpDashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErpDashboardComponent);
    fixture.detectChanges();
  });

  it('renders neutral metrics until domains are connected', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('La nueva operación de TECNOJACK comienza aquí.');
    expect(text).toContain('Pendiente de integración');
    expect(text).toContain('Esta vista no utiliza datos demo como información real.');
  });
});

