import { body } from 'express-validator';

export const createStudentValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('gender').notEmpty().withMessage('Gender is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('mobile')
    .notEmpty()
    .withMessage('Mobile is required')
    .isNumeric()
    .withMessage('Mobile must be a number'),
  body('dob').notEmpty().withMessage('Date of Birth is required'),
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isNumeric()
    .withMessage('Age must be a number'),
];
