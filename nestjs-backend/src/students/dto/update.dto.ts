/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { StudentDto } from './student.dto';

export class UpdateUserDto extends PartialType(StudentDto) {}