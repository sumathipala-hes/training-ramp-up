import { body, validationResult } from "express-validator";
import{Request, Response} from 'express';

const isValidMobile = (value: string) => {
    return /^\d{10}$/.test(value);
};

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

//id validation rules
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
        next(); // Move on to the next middleware or route handler
    }
];

export {stuValidRules, idValidRules};