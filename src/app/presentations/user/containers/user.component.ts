import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserRepository } from 'src/app/core/repositories/user.repository';
import { UserMapperJsonPlaceholder } from 'src/app/data/user/user.mapper.jsonplaceholder';
import { UserRepositoryJsonPlaceholder } from 'src/app/data/user/user.repository.jsonplaceholder';

import { SidebarComponent } from 'src/app/shared/components/sidebar';
import { DynamicComponentLoaderService } from 'src/app/shared/services/dynamic-component-loader';

@Component({
  templateUrl: './user.component.html',
  imports: [RouterOutlet, SidebarComponent],
  providers: [
    DynamicComponentLoaderService,
    UserMapperJsonPlaceholder,
    { provide: UserRepository, useClass: UserRepositoryJsonPlaceholder },
  ],
})
export class UserComponent {}
