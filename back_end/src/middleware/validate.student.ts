import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

export const studentValidator: Array<
  (req: Request, res: Response, next: NextFunction) => void
> = [
  body('studentName')
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
  body('studentAddress')
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Address must be between 5 and 100 characters'),
  body('studentMobile')
    .isMobilePhone('any')
    .withMessage('Invalid mobile number')
    .custom(value => {
      const validPrefixes = [
        '070',
        '071',
        '072',
        '074',
        '075',
        '076',
        '077',
        '078',
      ];
      if (
        value.length !== 10 ||
        !validPrefixes.some(prefix => value.startsWith(prefix))
      ) {
        throw new Error(
          'Mobile number must be exactly 10 digits and start with "07" followed by valid digits.',
        );
      }
      return true;
    }),
  body('studentDob').notEmpty().withMessage('DOB is required'),
  body('studentGender')
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
