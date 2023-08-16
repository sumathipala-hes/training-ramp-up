import { DataSource } from "typeorm";
import { Student } from "./models/student";
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: process.env.TYPE as 'mysql' | 'mariadb' | 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as 'string'),
  username: process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Student],
});

export default AppDataSource;
