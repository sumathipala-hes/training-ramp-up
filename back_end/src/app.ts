import express, { json, urlencoded } from 'express';
import routes from './routes';
import cors from 'cors';
import { appDataSource } from './configs/datasource.config';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/', routes);
app.use(cors());

appDataSource
  .initialize()
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err);
  });

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${process.env.PORT}`,
  );
});
