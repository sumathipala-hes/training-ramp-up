import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Student } from '../student/entities/student.entity';
import { User } from '../user/entities/user.entity';
config();

export const dataSource: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Student, User],
  synchronize: true,
  logging: false,
};
