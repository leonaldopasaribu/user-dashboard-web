import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserDetailComponent } from './user-detail.component';
import { UserListComponent } from './user-list.component';

import { UserDetailViewModel } from '../view-models/user-detail.view-model';

import { USER_ENTITY_MOCK } from 'src/app/shared/mocks/user.mocks';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let viewModel: UserDetailViewModel;

  const userDetailViewModelSpy = jasmine.createSpyObj('UserDetailViewModel', [
    'fetchUser',
    'hideLoading',
    'showLoading',
  ]);

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: () => 'mockedValue',
      },
      queryParamMap: {
        get: () => 'mockedQueryValue',
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        {
          provide: UserDetailViewModel,
          useValue: userDetailViewModelSpy,
        },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    })
      .overrideComponent(UserDetailComponent, {
        remove: {
          providers: [UserDetailViewModel],
        },
        add: {
          providers: [
            { provide: UserDetailViewModel, useValue: userDetailViewModelSpy },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    viewModel = TestBed.inject(UserDetailViewModel);

    component.$isLoading = signal(false);
    component.$isError = signal(false);
    component.$user = signal(USER_ENTITY_MOCK);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchUser method when component executed', () => {
    const fetchUserSpy = viewModel.fetchUser as jasmine.Spy;

    fixture.detectChanges();

    expect(fetchUserSpy).toHaveBeenCalled();
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
});
