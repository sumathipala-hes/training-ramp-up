import { config } from 'dotenv';
config();
import { DataSource } from 'typeorm';
import { Student } from '../models/student.model';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: [Student],
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
});
