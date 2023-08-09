import express, { Express, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { Student } from './models/student';
import studentRoutes from './routes/student.route';

const app: Express = express();
const port = 3000;

app.use(express.json());

app.use(studentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is Express + TypeScript and Postgresql');
});

export const AppDataSource = new DataSource({
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

AppDataSource.initialize()
  .then(() => {
    console.log(`[Server]: Database Connected Successfully.`);
  })
  .catch((err) => console.log(`Error Connecting Database:${err}`));

app.listen(port, (): void => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
