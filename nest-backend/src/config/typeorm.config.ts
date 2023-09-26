import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { config } from 'dotenv';
import { User } from 'src/users/entities/user.entity';
config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Student, User],
  synchronize: false,
};

export default typeOrmConfig;
