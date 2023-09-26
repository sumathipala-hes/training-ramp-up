/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsDateString, Max } from 'class-validator';
export class CreateStudentDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  age: string;

  @IsDateString()
  date_of_birth: Date;

  @IsString()
  gender: string;

  @IsNumber()
  @Max(9999999999)
  mobile_number: number;

  @IsString()
  address: string;
}
