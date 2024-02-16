import { type DataSourceOptions, DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource: DataSourceOptions = {
  type: 'postgres',
  ssl: { rejectUnauthorized: false },
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ['src/models/**/*.ts'],
  subscribers: []
};

const dataSource = new DataSource(AppDataSource);

dataSource
  .initialize()
  .then(() => {
    console.log('connected to database');
  })
  .catch((error) => {
    console.error(error, 'unable to connect to database');
  });
export default dataSource;
