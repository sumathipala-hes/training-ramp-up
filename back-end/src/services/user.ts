import dotenv from 'dotenv'
import {Request} from 'express'; 
import bcrypt from "bcrypt";
import { User } from '../models/user';
import userRepository from './repositories/userRepo';
import jwt from 'jsonwebtoken';
dotenv.config();

const saltRounds = 11;

interface tokenData {
    status : number,
    token:null |string, 
    data:{name:string, role:string}
}

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
        const tokenData = await validateToken(req) as tokenData;
        if(tokenData.status == 200){
            await userRepository.insert(user);  
        }else{
            if(tokenData.data.role == "admin" ){
                await userRepository.insert(user);  
            }else{
                user.role = "user";
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
    const authUser = await validateToken(req) as tokenData;
    return authUser;
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

//validate token
async function validateToken(req:Request){
    const refreshToken = req.cookies.refreshToken;
    const token = req.cookies.token;
    const decRefToken = jwt.verify(refreshToken , process.env.JWT_SECRET as string) as {name:string,role:string, username:string};
    if(decRefToken){
        try{
            const decoded = jwt.verify(token , process.env.JWT_SECRET as string) as {name:string,role:string};
            return {status:200, data:{name : decoded.name, role :decoded.role}, token:null}
        }catch(err){
            const user = await userRepository.findOneBy({
                username: decRefToken.username,
            });
            if(user){
                const token = jwt.sign({name : user.name, role :user.role}, process.env.JWT_SECRET as string, { expiresIn: '10m' });
                return{status:400, data:{name : user.name, role :user.role}, token:token};
            }else{
                throw new Error("Invalid access token");
            }
        }
    }else{
        return{status:400, data:""}
    }
}


export {saveUser, authenticateUser, validateToken, fetchUser};