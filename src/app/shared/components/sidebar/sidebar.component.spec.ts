import { provideLocationMocks } from '@angular/common/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterLink } from '@angular/router';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set anchor tag with id BtnUserMenu to routerlink /', () => {
    fixture.detectChanges();

    const anchorTagId = '#BtnUserMenu';
    const anchorTagElement = debugElement.query(By.css(anchorTagId));

    const anchorTagRouterLink = anchorTagElement.injector.get(RouterLink);
    const expectedUrl = '/';
    const result = anchorTagRouterLink.href;

    expect(result).toEqual(expectedUrl);
  });
});
