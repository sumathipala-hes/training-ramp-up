import { Request, Response } from 'express';
import { getUserRoleService, loginService, registerService } from '../services/user.service';
import { LoginData, RegisterData } from '../interfaces/user.interface';

export const register = async (req: Request, res: Response) => {
    try {
        const registerData: RegisterData = req.body;
        const tokens = await registerService(registerData);
        res.cookie('access-token', tokens.accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        res.cookie('refresh-token', tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        res.json({ message: 'USER REGISTERED'})
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }  
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const loginData: LoginData = req.body;
        const tokens = await loginService(loginData);
        res.cookie('access-token', tokens.accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        res.cookie('refresh-token', tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
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
        res.clearCookie('refresh-token'); 
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

export const getUserRole = async (req: Request, res: Response) => {
    try {
        const userRole = await getUserRoleService(req);
        res.json(userRole );
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message });
        }
    }
};