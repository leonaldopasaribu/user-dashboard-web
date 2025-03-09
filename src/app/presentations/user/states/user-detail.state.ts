import { UserEntity } from 'src/app/core/entities/user.entity';

export class UserDetailState {
  isLoading = false;
  isError = false;
  errorMessage = '';
  user: UserEntity = {
    address: {
      city: '',
      coordinates: {
        latitude: '',
        longitude: '',
      },
      postalCode: '',
      street: '',
      suite: '',
    },
    company: {
      businessFocus: '',
      name: '',
      tagline: '',
    },
    email: '',
    id: 0,
    name: '',
    phone: '',
    userName: '',
    website: '',
  };
}
