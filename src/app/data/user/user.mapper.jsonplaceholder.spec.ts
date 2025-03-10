import { UserDtoJsonPlaceholder } from './user.dto.jsonplaceholder';
import { UserMapperJsonPlaceholder } from './user.mapper.jsonplaceholder';

import { UserEntity } from 'src/app/core/entities/user.entity';
import {
  USER_DTO_MOCK,
  USER_ENTITY_MOCK,
} from 'src/app/shared/mocks/user.mocks';

describe('UserMapperJsonPlaceholder', () => {
  let mapper: UserMapperJsonPlaceholder;

  beforeEach(() => {
    mapper = new UserMapperJsonPlaceholder();
  });

  it('should create an instance', () => {
    expect(mapper).toBeTruthy();
  });

  it('should map UserDtoJsonPlaceholder to UserEntity correctly', () => {
    const dto: UserDtoJsonPlaceholder = USER_DTO_MOCK;

    const entity: UserEntity = mapper.toEntity(dto);

    expect(entity).toEqual(USER_ENTITY_MOCK);
  });
});
