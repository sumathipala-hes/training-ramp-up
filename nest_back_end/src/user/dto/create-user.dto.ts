import { IsString, IsEmail, IsNotEmpty, IsIn } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  userPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['admin', 'user']) // Assuming 'role' should be one of these values
  @Transform((value) => value.obj.role.toLowerCase())
  role: string;
}
