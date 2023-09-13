import { IsNotEmpty, IsNumber, IsString, IsDate } from "@nestjs/class-validator";

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
  studentGender: string;
}
