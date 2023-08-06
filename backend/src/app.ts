import { config } from 'dotenv';
config();
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(`The application is listening on port ${process.env.PORT}..!`);
});
