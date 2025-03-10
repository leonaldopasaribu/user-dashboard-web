import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { UserDetailViewModel } from './user-detail.view-model';

import { UserDetailStore } from '../stores/user-detail.store';

import { UserRepository } from 'src/app/core/repositories/user.repository';
import { LoadingScreenComponent } from 'src/app/shared/components/loading-screen';
import { USER_ENTITY_MOCK } from 'src/app/shared/mocks/user.mocks';
import { DynamicComponentLoaderService } from 'src/app/shared/services/dynamic-component-loader';

describe('UserDetailViewModel', () => {
  let viewModel: UserDetailViewModel;
  let store: UserDetailStore;
  let dynamicComponentLoaderService: DynamicComponentLoaderService;

  const dialogRefSpy = jasmine.createSpyObj('DialogRef', ['close']);

  const userDetailStoreSpy = jasmine.createSpyObj('UserDetailStore', [
    'loadUser',
    'markAsLoading',
    'markAsError',
    'markAsSuccess',
    'select',
  ]);

  const userRepositorySpy = jasmine.createSpyObj('UserRepository', [
    'fetchOne',
  ]);

  const dynamicComponentLoaderSpy = jasmine.createSpyObj(
    'DynamicComponentLoader',
    ['load'],
  );

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserDetailViewModel,
        {
          provide: UserDetailStore,
          useValue: userDetailStoreSpy,
        },
        {
          provide: UserRepository,
          useValue: userRepositorySpy,
        },
        {
          provide: DynamicComponentLoaderService,
          useValue: dynamicComponentLoaderSpy,
        },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    });
  });

  beforeEach(() => {
    viewModel = TestBed.inject(UserDetailViewModel);
    store = TestBed.inject(UserDetailStore);
    dynamicComponentLoaderService = TestBed.inject(
      DynamicComponentLoaderService,
    );
  });

  it('should create an instance of UserDetailViewModel successfully', () => {
    expect(viewModel).toBeTruthy();
  });

  it('should return the correct store signals for isLoading, isError, and users', () => {
    const isLoadingSignal = jasmine.createSpy('isLoadingSignal');
    const isErrorSignal = jasmine.createSpy('isErrorSignal');
    const usersSignal = jasmine.createSpy('usersSignal');

    userDetailStoreSpy.select
      .withArgs('isLoading')
      .and.returnValue(isLoadingSignal);
    userDetailStoreSpy.select
      .withArgs('isError')
      .and.returnValue(isErrorSignal);
    userDetailStoreSpy.select.withArgs('user').and.returnValue(usersSignal);

    expect(viewModel.$isLoading).toBe(isLoadingSignal);
    expect(viewModel.$isError).toBe(isErrorSignal);
    expect(viewModel.$user).toBe(usersSignal);
  });

  it('should call markAsLoading before fetching user from UserRepository', () => {
    const markAsLoadingSpy = store.markAsLoading as jasmine.Spy;

    userRepositorySpy.fetchOne.and.returnValue(of(USER_ENTITY_MOCK));

    viewModel.fetchUser();

    expect(markAsLoadingSpy).toHaveBeenCalled();
  });

  it('should call markAsError when fetchUser encounters an error', () => {
    const markAsErrorSpy = store.markAsError as jasmine.Spy;

    userRepositorySpy.fetchOne.and.returnValue(
      throwError(() => new Error('Error')),
    );

    viewModel.fetchUser();

    expect(markAsErrorSpy).toHaveBeenCalled();
  });

  it('should close the loading dialog when hideLoading is called', () => {
    viewModel.loadingDialogRef = dialogRefSpy;

    viewModel.hideLoading();

    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should call load with config from DynamicComponentLoaderService when showLoading is called', () => {
    const loadSpy = dynamicComponentLoaderService.load as jasmine.Spy;

    viewModel.showLoading();

    expect(loadSpy).toHaveBeenCalledWith(LoadingScreenComponent, {
      loadStrategy: 'dialog',
      positionStrategy: ['centerVertically', 'centerHorizontally'],
    });
  });
});
