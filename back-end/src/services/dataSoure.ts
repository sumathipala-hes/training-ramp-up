import dotenv from 'dotenv'
import { DataSource } from "typeorm";
import { Student } from "./../services/student"

dotenv.config();

//initialize database
const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as 'mysql' | 'mariadb' | 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as 'string'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Student],
    synchronize: true,
    logging: false,
});

export default AppDataSource;