import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { ConversionAnalyticsService } from './core/analytics/conversion-analytics.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        // Analytics talks to Firebase; tests only need the root component to start it.
        { provide: ConversionAnalyticsService, useValue: { init: () => undefined, track: () => undefined } },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should expose the TECNOJACK brand title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.appTitle).toEqual('TECNOJACK');
  });

  it('should render the brand label without claiming the page <h1>', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-title')?.textContent).toContain('TECNOJACK');
    // Each routed page owns its single <h1>.
    expect(compiled.querySelector('h1')).toBeNull();
  });
});
