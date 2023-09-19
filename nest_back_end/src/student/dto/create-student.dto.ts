import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsIn,
} from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsString()
  studentName: string;

  @IsNotEmpty()
  @IsString()
  studentAddress: string;

  @IsNotEmpty()
  @IsString()
  studentMobile: string;

  @IsNotEmpty()
  @IsDate()
  studentDob: Date;

  @IsNotEmpty()
  @IsString()
  @IsString()
  @IsNotEmpty()
  @IsIn(['Male', 'Female']) // Assuming 'studentGender' should be one of these values
  @Transform((value) => value.obj.studentGender.toLowerCase())
  studentGender: string;
}
