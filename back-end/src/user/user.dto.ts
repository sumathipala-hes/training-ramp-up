// user.dto.ts
import { IsEmail, IsString, IsIn, MinLength } from 'class-validator';

export class UserDto {
  @IsEmail()
  username: string;

  @IsString()
  name: string;

  @IsIn(['user', 'admin'])
  role: string;

  @IsString()
  @MinLength(4)
  password: string;
}
