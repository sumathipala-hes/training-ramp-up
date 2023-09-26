/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsDateString,
  Max,
  IsOptional,
} from 'class-validator';

export class UpdateStudentDto {
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  age: string;

  @IsDateString()
  @IsOptional()
  date_of_birth: Date;

  @IsString()
  @IsOptional()
  gender: string;

  @IsNumber()
  @Max(9999999999)
  @IsOptional()
  mobile_number: number;

  @IsString()
  @IsOptional()
  address: string;
}
