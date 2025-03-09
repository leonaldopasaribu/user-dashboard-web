import { Injectable } from '@angular/core';

import { UserListState } from '../states/user-list.state';

import { UserEntity } from 'src/app/core/entities/user.entity';
import { SignalsStore } from 'src/app/shared/base';

@Injectable()
export class UserListStore extends SignalsStore<UserListState> {
  constructor() {
    super(new UserListState());
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

  loadUsers(users: UserEntity[]): void {
    this.setState({ users });
  }
}
