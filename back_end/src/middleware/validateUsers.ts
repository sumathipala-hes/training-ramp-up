import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

const number = (value: string) => {
  return /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/.test(value);
};

const name = (value: string) => {
  return /^[a-zA-Z ]+$/.test(value);
};

const email = (value: string) => {
  return /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(value);
};

const password = (value: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
    value,
  );
};

export const validateUsers: Array<
  (req: Request, res: Response, next: NextFunction) => void
> = [
  body('roleType')
    .notEmpty()
    .withMessage('Role type is required')
    .isIn(['ADMIN', 'USER'])
    .withMessage('Role type must be either "ADMIN" or "USER".'),

  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .custom(name)
    .withMessage('Name must be a string and it cannot contain numbers.'),

  body('address').notEmpty().withMessage('Address is required'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .custom(email)
    .withMessage('Invalid email'),

  body('mobileNumber')
    .notEmpty()
    .withMessage('Mobile number is required')
    .isMobilePhone('any')
    .withMessage('Invalid mobile number')
    .isLength({ min: 10, max: 10 })
    .custom(number)
    .withMessage(
      'Mobile must be exactly 10 numbers and start with 07"0|1|2|4|5|6|7|8".',
    ),

  body('dob').notEmpty().withMessage('Date of birth is required'),

  body('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female'])
    .withMessage('Gender must be either "Male" or "Female".'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .custom(password)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
    ),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
