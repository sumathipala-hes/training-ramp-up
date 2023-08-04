import express from 'express';
import routes from './routes';

const app = express();
const port = 4000;

// Parse incoming JSON data
app.use(express.json());

// Use the defined routes
app.use(routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
});
