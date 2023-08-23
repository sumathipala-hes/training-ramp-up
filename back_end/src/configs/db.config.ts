import { config } from 'dotenv';
config();
import { Student } from '../models/student.model';
import { DataSource } from 'typeorm/data-source/DataSource';
import { User } from '../models/user.model';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Student, User],
  synchronize: true,
  logging: false,
});

