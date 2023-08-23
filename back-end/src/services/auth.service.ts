import { UserData } from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { sign, verify } from "jsonwebtoken";
import { NextFunction } from "express";

export const createTokens = (user: User) => {
    const accessToken = sign(
        { username: user.username, id: user.id },
        process.env.JWT_SECRET as string
        );

        return accessToken;
}

export const registerService = async (data: UserData) => {
    const { username, password } = data;

    const hash = await bcrypt.hash(password, 10);

    const user = User.create({
        username: username,
        password: hash,
        role: 'user',
    });

    await user.save();

    const accessToken = createTokens(user)
    return accessToken;
}

export const loginService = async (data: UserData) => {
    const { username, password } = data;

    const user = await User.findOne({ where: { username: username }});
    if (!user) {
        throw new Error('User does not exist');
    }

    const dbPassword = user.password;
    const match = await bcrypt.compare(password, dbPassword);

    if (!match) {
        throw new Error('Wrong Username and Password Combination');
    }

    const accessToken = createTokens(user)
    return accessToken;
}


    
