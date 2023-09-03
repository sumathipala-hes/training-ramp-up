import { Request, Response } from 'express';
import { loginService, registerService } from '../services/user.service';
import { LoginData, RegisterData } from '../interfaces/user.interface';

export const register = async (req: Request, res: Response) => {
    try {
        const registerData: RegisterData = req.body;
        const accessToken = await registerService(registerData);
        res.cookie('access-token', accessToken);
        res.json({ token: accessToken, message: 'USER REGISTERED'})
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }  
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const loginData: LoginData = req.body;
        const accessToken = await loginService(loginData);
        res.cookie('access-token', accessToken);
        res.json({ token: accessToken, message: 'LOGGED IN'})
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
            return res.status(400).json({ message: 'Logout failed' });
        }
    }
}

export const userAuthenticated = async (req: Request, res: Response) => {
    res.json('User is Authenticated')
}