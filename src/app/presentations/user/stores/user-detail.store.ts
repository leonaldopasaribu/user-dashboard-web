import { Injectable } from '@angular/core';

import { UserDetailState } from '../states/user-detail.state';

import { UserEntity } from 'src/app/core/entities/user.entity';
import { SignalsStore } from 'src/app/shared/base';

@Injectable()
export class UserDetailStore extends SignalsStore<UserDetailState> {
  constructor() {
    super(new UserDetailState());
  }

  markAsLoading(): void {
    this.setState({ errorMessage: '', isLoading: true });
  }

  markAsError(errorMessage: string): void {
    this.setState({ errorMessage, isLoading: false, isError: true });
  }

  markAsSuccess(): void {
    this.setState({ errorMessage: '', isLoading: false, isError: false });
  }

  loadUser(user: UserEntity): void {
    this.setState({ user });
  }
}
