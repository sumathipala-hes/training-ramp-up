import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { verify, TokenExpiredError, JwtPayload } from 'jsonwebtoken';
import { createTokens } from "../services/user.service";
import { User } from "../models/user";

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
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ auth: false, error: 'Token has expired' });
        }
        return res.status(400).json({ auth: false, error: error})            
    }
}

export const verifyRefreshJWT = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies['refresh-token'] as string;

    try {
        const verifiedJWT = verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
        if (verifiedJWT) {
            const user = new User();
            user.username = verifiedJWT.username;
            user.id = verifiedJWT.id;
            user.role = verifiedJWT.role;
            const tokens = createTokens(user);
            res.cookie('access-token', tokens.accessToken, { httpOnly: true, maxAge: 60 * 1000 });
            res.cookie('refresh-token', tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            return next()
        }
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ auth: false, error: 'Token has expired' });
        }
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
