import express, { json, urlencoded } from 'express';
import routes from './routes';
import cors from 'cors';
import { appDataSource } from './configs/datasource.config';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/v1', routes);
app.use(cors());

const admin = require('firebase-admin');
const serviceAccount = require('./configs/serviceAccountKey.json');

appDataSource
  .initialize()
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err);
  });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${process.env.PORT}`,
  );
});
