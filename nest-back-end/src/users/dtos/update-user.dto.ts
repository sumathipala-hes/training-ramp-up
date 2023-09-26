/* eslint-disable prettier/prettier */
import { AppRoles } from '../util/Roles';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  roles: AppRoles;
}
