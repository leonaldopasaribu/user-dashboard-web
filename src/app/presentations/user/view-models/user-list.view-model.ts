import { DialogRef } from '@angular/cdk/dialog';
import { inject, Injectable, Signal } from '@angular/core';
import { Router } from '@angular/router';

import { UserListStore } from '../stores/user-list.store';

import { UserEntity } from 'src/app/core/entities/user.entity';
import { UserRepository } from 'src/app/core/repositories/user.repository';
import { LoadingScreenComponent } from 'src/app/shared/components/loading-screen';
import { USER_ROUTE_URL } from 'src/app/shared/constants/route-url.constant';
import { DynamicComponentLoaderService } from 'src/app/shared/services/dynamic-component-loader';

@Injectable()
export class UserListViewModel {
  private readonly dynamicComponentLoaderService = inject(
    DynamicComponentLoaderService,
  );
  private readonly router = inject(Router);
  private readonly userListStore = inject(UserListStore);
  private readonly userRepository = inject(UserRepository);

  loadingDialogRef: DialogRef<unknown, LoadingScreenComponent> | undefined;

  get $isLoading(): Signal<boolean> {
    return this.userListStore.select('isLoading');
  }

  get $isError(): Signal<boolean> {
    return this.userListStore.select('isError');
  }

  get $users(): Signal<UserEntity[]> {
    return this.userListStore.select('users');
  }

  showLoading(): void {
    this.loadingDialogRef = this.dynamicComponentLoaderService.load(
      LoadingScreenComponent,
      {
        loadStrategy: 'dialog',
        positionStrategy: ['centerVertically', 'centerHorizontally'],
      },
    );
  }

  hideLoading(): void {
    if (this.loadingDialogRef) {
      this.loadingDialogRef.close();
    }
  }

  fetchUsers(): void {
    this.userListStore.markAsLoading();

    this.userRepository.fetchAll().subscribe({
      next: response => {
        this.userListStore.loadUsers(response);
        this.userListStore.markAsSuccess();
      },
      error: error => {
        this.userListStore.markAsError(error.message);
      },
    });
  }

  navigateToUserDetail(userId: number): void {
    this.router.navigateByUrl(`${USER_ROUTE_URL}/${userId}`);
  }
}
