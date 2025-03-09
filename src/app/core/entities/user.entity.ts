import { AddressEntity } from './address.entity';
import { CompanyEntity } from './company.entity';

export interface UserEntity {
  address: AddressEntity;
  company: CompanyEntity;
  email: string;
  id: number;
  name: string;
  phone: string;
  userName: string;
  website: string;
}
