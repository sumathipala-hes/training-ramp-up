import { Student } from '../models/student.model';

const regexPatterns = {
  name: /^[A-Za-z ]{5,20}$/,
  address: /^[0-9A-Za-z. ,]{5,}$/,
  mobile: /^[0-9]+$/,
  gender: /^[A-Za-z ]{3,20}$/,
};

const validateFields = (student: Student): string[] => {
  const errors: string[] = [];

  if (!regexPatterns.name.test(student.name)) {
    errors.push('Invalid Name');
  }
  if (!regexPatterns.address.test(student.address)) {
    errors.push('Invalid Address');
  }
  if (!regexPatterns.mobile.test(student.mobile)) {
    errors.push('Invalid Mobile');
  }
  if (!student.dob) {
    errors.push('Invalid Date of Birth');
  }
  if (!regexPatterns.gender.test(student.gender)) {
    errors.push('Invalid Gender');
  }

  return errors;
};

export default validateFields;
