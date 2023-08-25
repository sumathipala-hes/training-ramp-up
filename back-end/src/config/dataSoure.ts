import dotenv from 'dotenv'
import { DataSource } from "typeorm";
import { Student } from "../models/student";
import { User } from "../models/user"

dotenv.config();

//initialize database
const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as 'mysql' | 'mariadb' | 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as 'string'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Student, User],
    synchronize: true,
    logging: false,
});

export default AppDataSource;