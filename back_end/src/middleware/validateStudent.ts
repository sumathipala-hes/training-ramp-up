import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

const value = (value: string) => {
  return /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/.test(value);
};

export const validateStudent: Array<
  (req: Request, res: Response, next: NextFunction) => void
> = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),

  body('address').notEmpty().withMessage('Address is required'),

  body('mobileNumber')
    .notEmpty()
    .withMessage('Mobile number is required')
    .isMobilePhone('any')
    .withMessage('Invalid mobile number')
    .isLength({ min: 10, max: 10 })
    .custom(value)
    .withMessage(
      'Mobile must be exactly 10 numbers and start with 07"0|1|2|4|5|6|7|8".',
    ),

  body('dob').notEmpty().withMessage('Date of birth is required'),

  body('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female'])
    .withMessage('Gender must be either "Male" or "Female".'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
