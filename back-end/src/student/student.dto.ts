import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsInt,
  Min,
  Matches,
} from 'class-validator';

//student validations
export class StudentDTO {
  @IsNotEmpty({ message: 'ID is required.' })
  @IsInt({ message: 'ID must be a positive number greater than 0.' })
  @Min(1)
  id: number;

  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a text.' })
  name: string;

  @IsNotEmpty({ message: 'Gender is required.' })
  @IsIn(['male', 'female'], {
    message: 'Gender must be either "male" or "female".',
  })
  gender: string;

  @IsNotEmpty({ message: 'Address is required.' })
  address: string;

  @IsNotEmpty({ message: 'Mobile is required.' })
  @Matches(/^\d{10}$/, { message: 'Mobile must be exactly 10 digits.' })
  mobile: string;

  @IsNotEmpty({ message: 'Birthday is required.' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Birthday must be in the format "YYYY-MM-DD".',
  })
  birthday: string;

  @IsNotEmpty({ message: 'Age is required.' })
  @IsInt({ message: 'Age must be greater than 18.' })
  @Min(18)
  age: number;
}
