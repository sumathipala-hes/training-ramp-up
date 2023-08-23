import { NextFunction, Request, Response } from 'express';
import { loginService, registerService } from '../services/auth.service';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../models/user';

export const register = async (req: Request, res: Response) => {
    try {

        const accessToken = await registerService(req.body);
        res.cookie('access-token', accessToken, { httpOnly: true,
            maxAge: 60 * 60 * 24 * 30 * 1000,
        });
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
        res.cookie('access-token', accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
        });
        res.json({ message: 'LOGGED IN'})
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

export const student = async (req: Request, res: Response) => {
    res.json('User is Authenticated')
}


export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken)
        return res.status(400).json({ error : 'User is not Authenticated'});

        try {
            const validateToken = verify(accessToken, process.env.JWT_SECRET as string)
            if (validateToken) {
                //req.authenticated = true 
                return next()
            }
        } catch (error) {
            return res.status(400).json({ error: error})
            
        }
}