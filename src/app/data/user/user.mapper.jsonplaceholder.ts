import { Injectable } from '@angular/core';

import { UserDtoJsonPlaceholder } from './user.dto.jsonplaceholder';

import { UserEntity } from 'src/app/core/entities/user.entity';
import { EntityMapper } from 'src/app/shared/base';

@Injectable()
export class UserMapperJsonPlaceholder
  implements EntityMapper<UserDtoJsonPlaceholder, UserEntity>
{
  toEntity(dto: UserDtoJsonPlaceholder): UserEntity {
    return {
      address: {
        city: dto.address.city,
        coordinates: {
          latitude: dto.address.geo.lat,
          longitude: dto.address.geo.lng,
        },
        postalCode: dto.address.zipcode,
        street: dto.address.street,
        suite: dto.address.suite,
      },
      company: {
        businessFocus: dto.company.bs,
        name: dto.company.name,
        tagline: dto.company.catchPhrase,
      },
      email: dto.email,
      id: dto.id,
      name: dto.name,
      phone: dto.phone,
      userName: dto.username,
      website: dto.website,
    };
  }
}
