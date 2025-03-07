import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SignalsStore } from './signal.store';

class MockState {
  isLoading = false;
  error = '';
  isError = false;
}

@Injectable()
export class MockStore extends SignalsStore<MockState> {
  constructor() {
    super(new MockState());
  }
}

describe('SignalsStore', () => {
  let service: SignalsStore<MockState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockStore],
    });

    service = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return value false when select method is called with argument isLoading', () => {
    const value = service.select('isLoading');

    expect(value()).toBeFalse();
  });

  it('should set value for isLoading property to true when set method is called with argument isLoading and true', () => {
    service.set('isLoading', true);

    const value = service.select('isLoading');

    expect(value()).toBeTrue();
  });

  it('should set values for multiple properties', () => {
    const partialState = { isError: true, error: 'ErrorMessage' };

    service.setState(partialState);

    const state = service.state();

    expect(state).toEqual({ ...service.state(), ...partialState });
  });
});
