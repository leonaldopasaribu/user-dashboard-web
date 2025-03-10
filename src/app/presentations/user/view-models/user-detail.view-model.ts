import { DialogRef } from '@angular/cdk/dialog';
import { Injectable, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserDetailStore } from '../stores/user-detail.store';

import { UserEntity } from 'src/app/core/entities/user.entity';
import { UserRepository } from 'src/app/core/repositories/user.repository';
import { LoadingScreenComponent } from 'src/app/shared/components/loading-screen';
import { DynamicComponentLoaderService } from 'src/app/shared/services/dynamic-component-loader';

@Injectable()
export class UserDetailViewModel {
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly dynamicComponentLoaderService = inject(
    DynamicComponentLoaderService,
  );
  private readonly userDetailStore = inject(UserDetailStore);
  private readonly userRepository = inject(UserRepository);

  loadingDialogRef: DialogRef<unknown, LoadingScreenComponent> | undefined;

  get $isLoading(): Signal<boolean> {
    return this.userDetailStore.select('isLoading');
  }

  get $isError(): Signal<boolean> {
    return this.userDetailStore.select('isError');
  }

  get $user(): Signal<UserEntity> {
    return this.userDetailStore.select('user');
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

  fetchUser(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    this.userDetailStore.markAsLoading();

    this.userRepository.fetchOne(id).subscribe({
      next: response => {
        this.userDetailStore.loadUser(response);
        this.userDetailStore.markAsSuccess();
      },
      error: error => {
        this.userDetailStore.markAsError(error.message);
      },
    });
  }
}
