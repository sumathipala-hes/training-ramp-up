import { config } from 'dotenv';
config();
import { Student } from '../models/student.model';
import { DataSource } from 'typeorm/data-source/DataSource';

export const dataSource = new DataSource({
  type: 'postgres',
  // host: process.env.DB,
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  // entities: [Student],
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'rampupapp',
  entities: [Student],
  synchronize: true,
  logging: true,
});

