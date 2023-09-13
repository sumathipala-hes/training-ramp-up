/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsEmail, Length, IsIn } from 'class-validator';
     
export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Email should be a valid email'})
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 40, { message: 'Password should be greater than 6 characters' })
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['admin', 'user'], { message: 'User role should be either "admin" or "user"' } )
    role: string;
}