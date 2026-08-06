import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationServiceComponent } from './destination-service.component';

describe('DestinationServiceComponent', () => {
  let fixture: ComponentFixture<DestinationServiceComponent>;
  let component: DestinationServiceComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationServiceComponent);
    component = fixture.componentInstance;
  });

  it('shows the global transport condition inside an accordion notice', () => {
    component.variant = 'notice';
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('El transporte, local o de viaje, se cotiza aparte.');
  });

  it('recommends the complete four-person crew for hybrid services', () => {
    component.serviceContext = 'Boda hibrida (Foto + video)';

    expect(component.recommendedCrew).toBe('Equipo completo: hasta 4 personas');
  });

  it('emits the Destination selection without changing package prices', () => {
    const emitted: boolean[] = [];
    component.selectedChange.subscribe((value) => emitted.push(value));

    component.updateSelection(true);

    expect(emitted).toEqual([true]);
  });
});
