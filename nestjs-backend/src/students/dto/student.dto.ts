/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, IsIn, Min, Matches } from 'class-validator';

export class StudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['Male', 'Female'], { message: 'User gender should be either Male or Female' })
    gender: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/, { message: 'Mobile number should contain 10 digits' })
    mobile: string;

    @IsString()
    @IsNotEmpty()
    dob: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(19, { message: 'Age must be above 18' })
    age: number;
  }