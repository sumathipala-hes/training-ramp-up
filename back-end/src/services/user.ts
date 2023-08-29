import dotenv from 'dotenv'
import {Request} from 'express'; 
import AppDataSource from "../config/dataSoure";
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

//get users from the database
function fetchUsers(){
    const users = AppDataSource.manager.find(User);
    return users;
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
                username :user.username,
                name:user.name,
                role:user.role
            }
            const token = jwt.sign(userData, process.env.JWT_SECRET + req.ip, { expiresIn: '6h' });
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
    const ip =  req.ip;
    const decoded = jwt.verify(token, process.env.JWT_SECRET + ip);
    return decoded;
}


export {saveUser, fetchUsers, authenticateUser, validateToken, fetchUser};