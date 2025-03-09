import { Component, inject, OnInit, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { UserDetailStore } from '../stores/user-detail.store';
import { UserDetailViewModel } from '../view-models/user-detail.view-model';

import { ErrorMessageComponent } from 'src/app/shared/components/error-message';

import {
  Observable,
  Subscription,
  SubscriptionLike,
  distinctUntilChanged,
} from 'rxjs';
import { UserEntity } from 'src/app/core/entities/user.entity';

@Component({
  templateUrl: './user-detail.component.html',
  imports: [ErrorMessageComponent, RouterLink],
  providers: [UserDetailStore, UserDetailViewModel],
})
export class UserDetailComponent implements OnInit {
  private readonly userDetailViewModel = inject(UserDetailViewModel);

  $isLoading: Signal<boolean>;
  $isError: Signal<boolean>;
  $user: Signal<UserEntity>;

  isLoading$: Observable<boolean>;
  subscription: Subscription;

  constructor() {
    this.$isLoading = this.userDetailViewModel.$isLoading;
    this.$isError = this.userDetailViewModel.$isError;
    this.$user = this.userDetailViewModel.$user;
    this.isLoading$ = toObservable(this.userDetailViewModel.$isLoading);
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscribeToIsLoading();
    this.userDetailViewModel.fetchUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private subscribeToIsLoading(): SubscriptionLike {
    return this.isLoading$
      .pipe(distinctUntilChanged())
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.userDetailViewModel.showLoading();
          return;
        }

        this.userDetailViewModel.hideLoading();
      });
  }
}
