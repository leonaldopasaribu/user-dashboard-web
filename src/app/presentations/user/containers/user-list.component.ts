import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  distinctUntilChanged,
  Observable,
  Subscription,
  SubscriptionLike,
} from 'rxjs';

import { USER_LIST_TABLE_COLUMN_HEADERS } from '../constants/user.constant';
import { UserListStore } from '../stores/user-list.store';
import { UserListViewModel } from '../view-models/user-list.view-model';

import { UserEntity } from 'src/app/core/entities/user.entity';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message';
import { TableComponent } from 'src/app/shared/components/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  imports: [ErrorMessageComponent, TableComponent],
  providers: [UserListStore, UserListViewModel],
})
export class UserListComponent implements OnInit, OnDestroy {
  private readonly userListViewModel = inject(UserListViewModel);

  readonly tableColumnHeaders = USER_LIST_TABLE_COLUMN_HEADERS;

  $isLoading: Signal<boolean>;
  $isError: Signal<boolean>;
  $users: Signal<UserEntity[]>;

  isLoading$: Observable<boolean>;
  subscription: Subscription;

  constructor() {
    this.$isLoading = this.userListViewModel.$isLoading;
    this.$isError = this.userListViewModel.$isError;
    this.$users = this.userListViewModel.$users;
    this.isLoading$ = toObservable(this.userListViewModel.$isLoading);
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscribeToIsLoading();
    this.userListViewModel.fetchUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDetailButtonClick(userId: number): void {
    this.userListViewModel.navigateToUserDetail(userId);
  }

  private subscribeToIsLoading(): SubscriptionLike {
    return this.isLoading$
      .pipe(distinctUntilChanged())
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.userListViewModel.showLoading();
          return;
        }

        this.userListViewModel.hideLoading();
      });
  }
}
