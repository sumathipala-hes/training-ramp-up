/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export enum Role {
    Admin = 'admin',
    User = 'user',
  }

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);