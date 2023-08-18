import { body } from 'express-validator';

export const createStudentValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('gender')
    .notEmpty().withMessage('Gender is required')
    .custom((value, { req }) => {
      if (value !== 'male' && value !== 'female') {
        throw new Error('Gender must be either male or female');
      }
      return true;
    }),
  body('address').notEmpty().withMessage('Address is required'),
  body('mobile')
    .notEmpty()
    .withMessage('Mobile is required')
    .isNumeric()
    .withMessage('Mobile must be a number')
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile must be exactly 10 digits'),
  body('dob').notEmpty().withMessage('Date of Birth is required'),
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isNumeric()
    .withMessage('Age must be a number')
    .custom((value, { req }) => {
      if (parseInt(value) <= 18) {
        throw new Error('Age must be above 18');
      }
      return true;
    }),
];
