/* eslint-disable prettier/prettier */
import { Student } from 'src/students/student.entity';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';

const connectDB = new DataSource({
  type: 'postgres',
  database: 'gridtable',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'abdzak@32116',
  entities: [Student, User],
  synchronize: true,
});

connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

export default connectDB;
