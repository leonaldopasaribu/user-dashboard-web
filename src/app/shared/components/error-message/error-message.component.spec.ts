import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the error message when the component is displayed', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('p.text-lg').textContent).toContain(
      'Oops! Something went wrong.',
    );
    expect(compiled.querySelector('p.text-sm').textContent).toContain(
      "We couldn't fetch the data. Please try again later.",
    );
  });

  it('should render the error icon when the component is displayed', () => {
    const svgElement = fixture.debugElement.query(By.css('svg'));
    expect(svgElement).toBeTruthy();
    expect(svgElement.nativeElement.classList).toContain('text-red-600');
  });
});
