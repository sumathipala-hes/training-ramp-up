/* eslint-disable prettier/prettier */
import { AppRoles } from '../util/Roles';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  userName: string;

  @Expose()
  roles: AppRoles;
}
