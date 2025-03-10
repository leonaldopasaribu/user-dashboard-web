import { DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { UserListComponent } from './user-list.component';

import { UserListViewModel } from '../view-models/user-list.view-model';

import { USER_ENTITY_MOCK } from 'src/app/shared/mocks/user.mocks';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let viewModel: UserListViewModel;
  let debugElement: DebugElement;

  const userListViewModelSpy = jasmine.createSpyObj('UserListViewModel', [
    'fetchUsers',
    'hideLoading',
    'showLoading',
    'navigateToUserDetail',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        {
          provide: UserListViewModel,
          useValue: userListViewModelSpy,
        },
      ],
    })
      .overrideComponent(UserListComponent, {
        remove: {
          providers: [UserListViewModel],
        },
        add: {
          providers: [
            { provide: UserListViewModel, useValue: userListViewModelSpy },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    viewModel = TestBed.inject(UserListViewModel);

    component.$isLoading = signal(false);
    component.$isError = signal(false);
    component.$users = signal([USER_ENTITY_MOCK]);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchUsers method when component executed', () => {
    const fetchUsersSpy = viewModel.fetchUsers as jasmine.Spy;

    fixture.detectChanges();

    expect(fetchUsersSpy).toHaveBeenCalled();
  });

  it('should call hideLoading when isLoading$ is false', () => {
    const hideLoadingSpy = viewModel.hideLoading as jasmine.Spy;

    component.isLoading$ = of(false);
    fixture.detectChanges();

    expect(hideLoadingSpy).toHaveBeenCalled();
  });

  it('should call showLoading when isLoading$ is true', () => {
    const showLoadingSpy = viewModel.showLoading as jasmine.Spy;

    component.isLoading$ = of(true);
    fixture.detectChanges();

    expect(showLoadingSpy).toHaveBeenCalled();
  });

  it('should call navigateToUserDetail with user id when onDetailButtonClick is called', () => {
    const navigateToUserDetailSpy =
      viewModel.navigateToUserDetail as jasmine.Spy;
    const mockUserId = 1;

    component.onDetailButtonClick(mockUserId);

    expect(navigateToUserDetailSpy).toHaveBeenCalledWith(mockUserId);
  });

  it('should call navigateToUserDetail with user id when Detail Button is clicked', () => {
    const mockUserId = 1;
    const navigateToUserDetailSpy =
      viewModel.navigateToUserDetail as jasmine.Spy;

    fixture.detectChanges();

    const anchorTagId = '#BtnDetail1';
    const anchorTagElement = debugElement.query(By.css(anchorTagId));

    anchorTagElement.triggerEventHandler('click', null);

    expect(navigateToUserDetailSpy).toHaveBeenCalledWith(mockUserId);
  });
});
