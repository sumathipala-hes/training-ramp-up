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
        validateToken(req);
        await userRepository.insert(user);   
    }else{
        user.role = "user";
        await userRepository.insert(user);  
    }   
}

function fetchUser(req: Request){
    const authUser = validateToken(req);
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
                role:user.role
            }
            const token = jwt.sign(userData, process.env.JWT_SECRET as string, { expiresIn: '10m' });
            return token;
        }else{
            return false;
        }

        
    }else{
        throw new Error("The provided username or password / both the inputs are invalid");
    }
}

//validate token
function validateToken(req:Request){
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
}


export {saveUser, authenticateUser, validateToken, fetchUser};