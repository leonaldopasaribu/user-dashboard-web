import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { UserListViewModel } from './user-list.view-model';

import { UserListStore } from '../stores/user-list.store';

import { UserRepository } from 'src/app/core/repositories/user.repository';
import { LoadingScreenComponent } from 'src/app/shared/components/loading-screen';
import { USER_ENTITY_MOCK } from 'src/app/shared/mocks/user.mocks';
import { DynamicComponentLoaderService } from 'src/app/shared/services/dynamic-component-loader';

describe('UserListViewModel', () => {
  let viewModel: UserListViewModel;
  let store: UserListStore;
  let router: Router;
  let dynamicComponentLoaderService: DynamicComponentLoaderService;

  const dialogRefSpy = jasmine.createSpyObj('DialogRef', ['close']);

  const userListStoreSpy = jasmine.createSpyObj('UserListStore', [
    'loadUsers',
    'markAsLoading',
    'markAsError',
    'markAsSuccess',
    'select',
  ]);

  const userRepositorySpy = jasmine.createSpyObj('UserRepository', [
    'fetchAll',
  ]);

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  const dynamicComponentLoaderSpy = jasmine.createSpyObj(
    'DynamicComponentLoader',
    ['load'],
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserListViewModel,
        {
          provide: UserListStore,
          useValue: userListStoreSpy,
        },
        {
          provide: UserRepository,
          useValue: userRepositorySpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: DynamicComponentLoaderService,
          useValue: dynamicComponentLoaderSpy,
        },
      ],
    });
  });

  beforeEach(() => {
    viewModel = TestBed.inject(UserListViewModel);
    store = TestBed.inject(UserListStore);
    router = TestBed.inject(Router);
    dynamicComponentLoaderService = TestBed.inject(
      DynamicComponentLoaderService,
    );
  });

  it('should create an instance of UserListViewModel successfully', () => {
    expect(viewModel).toBeTruthy();
  });

  it('should return the correct store signals for isLoading, isError, and users', () => {
    const isLoadingSignal = jasmine.createSpy('isLoadingSignal');
    const isErrorSignal = jasmine.createSpy('isErrorSignal');
    const usersSignal = jasmine.createSpy('usersSignal');

    userListStoreSpy.select
      .withArgs('isLoading')
      .and.returnValue(isLoadingSignal);
    userListStoreSpy.select.withArgs('isError').and.returnValue(isErrorSignal);
    userListStoreSpy.select.withArgs('users').and.returnValue(usersSignal);

    expect(viewModel.$isLoading).toBe(isLoadingSignal);
    expect(viewModel.$isError).toBe(isErrorSignal);
    expect(viewModel.$users).toBe(usersSignal);
  });

  it('should navigate to the user details page with the correct user ID when navigateToUserDetail is called', () => {
    const userId = 1;
    const expectedUrl = 'user/1';
    const navigateByUrlSpy = router.navigateByUrl as jasmine.Spy;

    viewModel.navigateToUserDetail(userId);

    expect(navigateByUrlSpy).toHaveBeenCalledWith(expectedUrl);
  });

  it('should call markAsLoading before fetching users from UserRepository', () => {
    const markAsLoadingSpy = store.markAsLoading as jasmine.Spy;

    userRepositorySpy.fetchAll.and.returnValue(of([USER_ENTITY_MOCK]));

    viewModel.fetchUsers();

    expect(markAsLoadingSpy).toHaveBeenCalled();
  });

  it('should call markAsError when fetchUsers encounters an error', () => {
    const markAsErrorSpy = store.markAsError as jasmine.Spy;

    userRepositorySpy.fetchAll.and.returnValue(
      throwError(() => new Error('Error')),
    );

    viewModel.fetchUsers();

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
