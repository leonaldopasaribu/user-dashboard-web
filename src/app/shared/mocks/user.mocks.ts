import { UserEntity } from 'src/app/core/entities/user.entity';
import { UserDtoJsonPlaceholder } from 'src/app/data/user/user.dto.jsonplaceholder';

export const USER_DTO_MOCKS: UserDtoJsonPlaceholder = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
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
