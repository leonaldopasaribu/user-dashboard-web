import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { UserDtoJsonPlaceholder } from './user.dto.jsonplaceholder';
import { UserMapperJsonPlaceholder } from './user.mapper.jsonplaceholder';

import { UserEntity } from 'src/app/core/entities/user.entity';
import { UserRepository } from 'src/app/core/repositories/user.repository';
import { environment } from 'src/environments/environment';

export class UserRepositoryJsonPlaceholder extends UserRepository {
  private readonly baseUrl: string;

  private readonly http = inject(HttpClient);
  private readonly mapper = inject(UserMapperJsonPlaceholder);

  constructor() {
    super();
    this.baseUrl = environment.jsonPlaceholderApiUrl;
  }

  override fetchAll(): Observable<UserEntity[]> {
    const url = `${this.baseUrl}/users`;

    return this.http
      .get<UserDtoJsonPlaceholder[]>(url)
      .pipe(
        map((dto: UserDtoJsonPlaceholder[]) =>
          dto.map((dto: UserDtoJsonPlaceholder) => this.mapper.toEntity(dto)),
        ),
      );
  }

  override fetchOne(userId: string): Observable<UserEntity> {
    const url = `${this.baseUrl}/users/${userId}`;

    return this.http
      .get<UserDtoJsonPlaceholder>(url)
      .pipe(map((dto: UserDtoJsonPlaceholder) => this.mapper.toEntity(dto)));
  }
}
