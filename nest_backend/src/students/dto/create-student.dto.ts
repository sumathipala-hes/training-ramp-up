import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  mobileNumber: string;

  @IsDate()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  gender: string;
}
