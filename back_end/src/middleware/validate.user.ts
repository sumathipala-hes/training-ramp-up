import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

export const userValidator: Array<
  (req: Request, res: Response, next: NextFunction) => void
> = [
  body('userName')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .isString()
    .withMessage('Name must be a string')
    .custom(value => {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        throw new Error('Name cannot contain numbers');
      }
      return true;
    }),
  body('userEmail')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('userPassword')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be between 8 and 20 characters'),
    body('role')
      .notEmpty()
      .withMessage('Role is required')
      .isIn(['ADMIN', 'USER'])
      .withMessage('Role must be either ADMIN or USER'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
