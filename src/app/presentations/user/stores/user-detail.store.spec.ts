import { TestBed } from '@angular/core/testing';

import { UserDetailStore } from './user-detail.store';

import { USER_ENTITY_MOCK } from 'src/app/shared/mocks/user.mocks';

describe('UserDetailStore', () => {
  let store: UserDetailStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDetailStore],
    });
    store = TestBed.inject(UserDetailStore);
  });

  it('should create UserDetailStore', () => {
    expect(store).toBeTruthy();
  });

  describe('markAsLoading', () => {
    beforeEach(() => store.markAsLoading());

    it('should set isLoading to true', () => {
      expect(store.select('isLoading')()).toBeTrue();
    });

    it('should set errorMessage to an empty string', () => {
      expect(store.select('errorMessage')()).toEqual('');
    });

    it('should set isError to false', () => {
      expect(store.select('isError')()).toBeFalse();
    });
  });

  describe('markAsError', () => {
    const error = 'ERROR';

    beforeEach(() => store.markAsError(error));

    it('should set isLoading to false', () => {
      expect(store.select('isLoading')()).toBeFalse();
    });

    it('should set errorMessage to the provided error', () => {
      expect(store.select('errorMessage')()).toEqual(error);
    });

    it('should set isError to true', () => {
      expect(store.select('isError')()).toBeTrue();
    });
  });

  describe('markAsSuccess', () => {
    beforeEach(() => store.markAsSuccess());

    it('should set isLoading to false', () => {
      expect(store.select('isLoading')()).toBeFalse();
    });

    it('should set errorMessage to an empty string', () => {
      expect(store.select('errorMessage')()).toEqual('');
    });

    it('should set isError to false', () => {
      expect(store.select('isError')()).toBeFalse();
    });
  });

  describe('loadUsers', () => {
    it('should set the users in the state', () => {
      store.loadUser(USER_ENTITY_MOCK);
      expect(store.select('user')()).toEqual(USER_ENTITY_MOCK);
    });
  });
});
