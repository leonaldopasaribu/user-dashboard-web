import { UserEntity } from 'src/app/core/entities/user.entity';
import { UserDtoJsonPlaceholder } from 'src/app/data/user/user.dto.jsonplaceholder';

export const USER_DTO_MOCKS: UserDtoJsonPlaceholder = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'johndoe@example.com',
  address: {
    street: '123 Main St',
    suite: 'Apt 4B',
    city: 'New York',
    zipcode: '10001',
    geo: {
      lat: '40.7128',
      lng: '-74.0060',
    },
  },
  phone: '+1-555-1234',
  website: 'www.johndoe.com',
  company: {
    name: 'Doe Industries',
    catchPhrase: 'Innovating the Future',
    bs: 'Technology',
  },
};

export const USER_ENTITY_MOCK: UserEntity = {
  id: 1,
  name: 'John Doe',
  userName: 'johndoe',
  email: 'johndoe@example.com',
  phone: '+1-555-1234',
  website: 'www.johndoe.com',
  address: {
    street: '123 Main St',
    suite: 'Apt 4B',
    city: 'New York',
    postalCode: '10001',
    coordinates: {
      latitude: '40.7128',
      longitude: '-74.0060',
    },
  },
  company: {
    name: 'Doe Industries',
    tagline: 'Innovating the Future',
    businessFocus: 'Technology',
  },
};
