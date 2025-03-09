import { UserEntity } from 'src/app/core/entities/user.entity';

export class UserListState {
  isLoading = false;
  isError = false;
  errorMessage = '';
  users: UserEntity[] = [];
}
