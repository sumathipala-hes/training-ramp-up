import dotenv from 'dotenv'
import {Request} from 'express'; 
import bcrypt from "bcrypt";
import { User } from '../models/user';
import userRepository from './repositories/userRepo';
import jwt from 'jsonwebtoken';
dotenv.config();

const saltRounds = 11;

//add user to the database
async function saveUser(req: Request){
    const username = req.body.username
    const name = req.body.name;
    const role = req.body.role;
    const password = req.body.password
    const token = req.cookies.token

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.username = username;
    user.password = hashedPassword ;
    user.role = role;
    user.name = name;
    if(token){
        const refreshToken = await validateRefToken(req);
        if(refreshToken){
            const accessToken = await validateAccessToken(req);
            if(accessToken.role === "admin"){
                await userRepository.insert(user);  
            }
        }
    }else{
        user.role = "user";
        await userRepository.insert(user);  
    }   
}

//return authorized user data
async function fetchUser(req: Request){
    const refreshToken = await validateRefToken(req);
    if(refreshToken){
        const accessToken = await validateAccessToken(req);
        return {name : accessToken.name, role :accessToken.role}
    }
}

//authenticate user 
async function authenticateUser(req:Request) {
    const username = req.body.username;
    const password = req.body.password

    const user = await userRepository.findOneBy({
        username: username,
    });
    if (user) {
        // Compare entered password with hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch){
            const userData = {
                name:user.name,
                role:user.role,
                username:user.username
            }
            const token = jwt.sign(userData, process.env.JWT_SECRET as string, { expiresIn: '10m' });
            const refreshToken = jwt.sign(userData, process.env.JWT_SECRET as string, { expiresIn: '1h' });
            return {token, refreshToken};
        }else{
            return false;
        }

        
    }else{
        throw new Error("The provided username or password / both the inputs are invalid");
    }
}

//create access token
async function createAccessToken(req:Request){
    const refreshToken = req.cookies.refreshToken;
    const decodedRefToken = jwt.verify(refreshToken , process.env.JWT_SECRET as string) as {name:string,role:string, username:string};
    if(decodedRefToken){
        try{
            const user = await userRepository.findOneBy({
                username: decodedRefToken.username,
            });
            if(user){
                const token = jwt.sign({name : user.name, role :user.role}, process.env.JWT_SECRET as string, { expiresIn: '10m' });
                return {token:token, data: {name : user.name, role :user.role}};
            }else{
                throw new Error("Invalid refresh token");
            }
        }catch(err){
            throw new Error("Invalid refresh token");
        }
    }else{
        return{status:400, data:""}
    }
}

//validate refresh token
async function validateRefToken(req:Request){
    try {
        const refreshToken = req.cookies.refreshToken;
        const decodedRefToken = jwt.verify(refreshToken , process.env.JWT_SECRET as string) as {name:string,role:string, username:string};
        return decodedRefToken;
    }
    catch(err){
        throw new Error("Invalid refresh token");   
    }
}

//validate access token
async function validateAccessToken(req:Request){
    try {
        const accessToken = req.cookies.token;
        const decodedAccessToken = jwt.verify(accessToken , process.env.JWT_SECRET as string) as {name:string,role:string, username:string};
        return decodedAccessToken;
    }
    catch(err){
        throw new Error("Invalid access token");   
    }
}


export {saveUser, authenticateUser, fetchUser, createAccessToken};