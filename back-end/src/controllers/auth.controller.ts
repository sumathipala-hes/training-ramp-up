import { NextFunction, Request, Response } from 'express';
import { loginService, registerService } from '../services/auth.service';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../models/user';
import { check, validationResult } from 'express-validator';


export const register = async (req: Request, res: Response) => {
    try {
        //Validate inputs
        await Promise.all([
            check("username", "Email should be a valid email").isEmail().run(req),
            check("password", "Password should be greater than 5 characters").isLength({ min: 6 }).run(req)
        ]);

        const errors =  validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const username = req.body.username;
        const user = await User.findOne({ where: { username: username } });
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const accessToken = await registerService(req.body);
        res.cookie('access-token', accessToken);
        res.json({ message: 'USER REGISTERED'})

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
          }  
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const accessToken = await loginService(req.body);
        res.cookie('access-token', accessToken);

        res.json({auth: true, token: accessToken, message: 'LOGGED IN'})
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }  
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie('access-token'); 
        res.json({ message: 'LOGGED OUT' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Logout failed' });
        }
    }
}

export const userAuthenticated = async (req: Request, res: Response) => {
    res.json('User is Authenticated')
}


export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers["access-token"] as string

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