import express from 'express';
import test from './controllers/test';

const app = express();
const port = 3000;

app.use('/', test);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
