import { body, validationResult } from "express-validator";
import{Request, Response} from 'express';

const isValidMobile = (value: string) => {
    return /^\d{10}$/.test(value);
};

const isValidMail = (value: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(value)
}

// Student validation rules
const stuValidRules = [
    body('id').notEmpty().escape().withMessage('ID is required.')
    .isInt({ min: 1 }).withMessage('ID must be a positive number greater than 0.'),
    
    body('name').notEmpty().escape().withMessage('Name is required.')
    .isString().withMessage('Name must be a text.'),
    
    body('gender').notEmpty().escape().withMessage('Gender is required.')
    .isIn(['male', 'female']).withMessage('Gender must be either "male" or "female".'),
    
    body('address').notEmpty().escape().withMessage('Address is required.'),
    
    body('mobile').notEmpty().escape().withMessage('Mobile is required.')
    .isLength({ min: 10, max: 10 }).custom(isValidMobile).withMessage('Mobile must be exactly 10 numbers.'),
    
    body('birthday').notEmpty().escape().withMessage('Birthday is required.')
    .isDate({ format: 'YYYY-MM-DD' }).withMessage('Birthday must be in the format "YYYY-MM-DD".'),
    
    (req:Request, res:Response, next: () => void) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(200).json({
            status: 400,
            errors: errors.array(),
          });
        }
        next(); // Move on to the next middleware or route handler
    }
];

//student id validation rules
const idValidRules = [
    body('id').notEmpty().escape().withMessage('ID is required.')
    .isInt({ min: 1 }).withMessage('ID must be a positive number greater than 0.'),
    (req:Request, res:Response, next: () => void) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(200).json({
            status: 400,
            errors: errors.array(),
          });
        }
        next();
    }
];

//user register validation rules
const regRules = [
  body('username').notEmpty().escape().withMessage('Username is required.')
  .custom(isValidMail).withMessage('Username should be a valid email adddress.'),
  
  body('name').notEmpty().escape().withMessage('Name is required.')
  .isString().withMessage('Name must be a text.'),
  
  body('role').notEmpty().escape().withMessage('Role is required.')
  .isIn(['user', 'admin']).withMessage('Role must be either "user" or "admin".'),
  
  body('password').notEmpty().escape().withMessage('Password is required.')
  .isString().withMessage('Pssword must be a text.'),
  
  (req:Request, res:Response, next: () => void) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(200).json({
          status: 400,
          errors: errors.array(),
        });
      }
      next();
  }
];

//user login validation rules
const loginRules = [
  body('username').notEmpty().escape().withMessage('Username is required.')
  .custom(isValidMail).withMessage('Username should be a valid email adddress.'),
  
  body('password').notEmpty().escape().withMessage('Password is required.')
  .isString().withMessage('Pssword must be a text.'),
  
  (req:Request, res:Response, next: () => void) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(200).json({
          status: 400,
          errors: errors.array(),
        });
      }
      next();
  }
];

export {stuValidRules, idValidRules, regRules, loginRules};