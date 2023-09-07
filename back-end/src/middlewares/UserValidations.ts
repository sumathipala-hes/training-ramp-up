import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { verify } from 'jsonwebtoken';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies['access-token'] as string;

    if (!accessToken) {
        return res.status(401).json({ auth: false, error : 'User is not Authenticated'});
    }
        
    try {
        const verifiedJWT = verify(accessToken, process.env.JWT_SECRET as string)
        if (verifiedJWT) {
            return next()
        }
    } catch (error) {
        return res.status(400).json({ auth: false, error: error})            
    }
}

export const registrationValidation = [
    check("username", "Email should be a valid email").isEmail(),
    check("password", "Password should be greater than 5 characters").isLength({ min: 6 }),
    check("role", "User role should be either 'admin' or 'user'").isIn(["admin", "user"]),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};
