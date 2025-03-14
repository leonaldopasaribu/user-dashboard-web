import { Observable } from 'rxjs';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract fetchAll(): Observable<UserEntity[]>;
  abstract fetchOne(userId: string): Observable<UserEntity>;
}
