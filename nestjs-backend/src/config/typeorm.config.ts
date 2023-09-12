/* eslint-disable prettier/prettier */
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "src/students/student.model";
import * as dotenv from 'dotenv';
import { User } from "src/users/user.model";

dotenv.config();

export const typeOrmConfig: TypeOrmModule = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Student, User],
    synchronize: true,
}