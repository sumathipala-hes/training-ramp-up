import express from 'express';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import AppDataSource from './config/dataSource';
import studentRoutes from './routes/student';

const app = express();
const port = 3000;

createConnection(AppDataSource)
  .then((connection) => {
    console.log('Connected to database');

    app.use('/api/students', studentRoutes);

    // app.get('/', (req, res) => {
    //   res.send('Hello from Express + TypeScript!');
    // });
  })
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
