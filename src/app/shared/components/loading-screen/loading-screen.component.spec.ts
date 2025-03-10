import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadingScreenComponent } from './loading-screen.component';

describe('LoadingScreenComponent', () => {
  let component: LoadingScreenComponent;
  let fixture: ComponentFixture<LoadingScreenComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingScreenComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the loading indicator when the component is displayed', () => {
    const loaderElement = debugElement.query(By.css('.loader'));

    expect(loaderElement).toBeTruthy();
  });

  it('should display the loading message when the component is displayed', () => {
    const messageElement = debugElement.query(By.css('h2'));
    
    expect(messageElement).toBeTruthy();
    expect(messageElement.nativeElement.textContent).toContain('Loading...');
  });
});
