import { DataSource } from "typeorm";
import { Student } from "./models/student";
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'master',
  synchronize: true,
  logging: true,
  entities: [Student],
});

export default AppDataSource;
