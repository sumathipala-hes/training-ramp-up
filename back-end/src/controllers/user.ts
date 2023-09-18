import dotenv from 'dotenv'
import {Request, Response} from 'express'; 
import { authenticateUser, createAccessToken, fetchUser, saveUser } from '../services/user';
dotenv.config();

//register a user
const registerUser = (async (req: Request, res: Response) => {
    try {
        await saveUser(req);
        return res.status(200).json({
            status: 200,
        });
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                status: 400,
                error: err.message,
            });
        } else {
            // Handle the case when 'err' is of unknown type
            return res.status(500).json({
                status: 500,
                error: "An unknown error occurred.",
            });
        }
    }

});

//authenticate user
const validateUser = (async (req: Request, res: Response) => {
    try {
        const tokens = await authenticateUser(req);
        if(tokens){
            // Set the HTTP-only cookie
            res.cookie('token', tokens.token, { httpOnly: true, secure: true, sameSite: 'strict' });
            res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
            res.status(200).json({
                status: 200,
            });
        }else{
            res.status(400).json({
                status: 400,
                error: "The provided username or password / both the inputs are invalid",
            });
        }

    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                status: 400,
                error: err.message,
            });
        } else {
            res.status(500).json({
                status: 500,
                error: "An unknown error occurred.",
            });
        }
    }
});

//logout user
const logoutUser = (async (req: Request, res: Response) => {
    try {
        // Clear the token cookie by setting it to an empty value and expiring it immediately
        res.cookie('token', '', { httpOnly: true, secure: true, sameSite: 'strict', expires: new Date(0) });
        res.cookie('refreshToken', '', { httpOnly: true, secure: true, sameSite: 'strict', expires: new Date(0) });
        res.status(200).json({
            status: 200,
            message: 'Logged out successfully.',
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'An error occurred during logout.',
        });
    }
});

//authenticate user
const authUser = (async (req: Request, res: Response) => {
    try {
        const token = await fetchUser(req);
        if(token){
            res.status(200).json({
                status: 200,
                data:token
            });
        }
    } catch (err) {
        if (err instanceof Error) {                             
            res.status(401).json({
                status: 401,
                error: err.message,
            });
        } else {
            res.status(500).json({
                status: 500,
                error: "An unknown error occurred.",
            });
        }
    }
});

//create new access token
const newAccessToken = (async (req: Request, res: Response) => {
    try {
        const token = await createAccessToken(req);
        if(token){
            res.cookie('token', token.token, { httpOnly: true, secure: true, sameSite: 'strict' });
            res.status(200).json({
                status: 200,
                data:token.data
            });
        }
    } catch (err) {
        if (err instanceof Error) {                             
            res.status(401).json({
                status: 401,
                error: err.message,
            });
        } else {
            res.status(500).json({
                status: 500,
                error: "An unknown error occurred.",
            });
        }
    }
});

export {registerUser, validateUser, logoutUser, authUser, newAccessToken};