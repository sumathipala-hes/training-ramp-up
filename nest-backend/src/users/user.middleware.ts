import { NextFunction, Request, RequestHandler, Response } from 'express';

const regexPatterns = {
  name: /^[A-Za-z ]{4,20}$/,
  email: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
  password: /^[A-Za-z ]{4,20}$/,
  role: /^[A-Za-z ]{4,20}$/,
};

export const validateUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];
  try {
    if (!regexPatterns.name.test(req.body.name)) {
      errors.push('Invalid Name');
    }
    if (!regexPatterns.email.test(req.body.email)) {
      errors.push('Invalid Email');
    }
    if (!regexPatterns.password.test(req.body.password)) {
      errors.push('Invalid Password');
    }
    if (!req.body.role) {
      errors.push('Invalid Role');
    }
    if (errors.length > 0){
      return res.status(400).json(errors);
    }
    next();
  } catch (error) {
    throw new Error(error);
  }
};
