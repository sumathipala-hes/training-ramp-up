import express from 'express';
import "reflect-metadata";
import AppDataSource from './services/dataSoure';
import router from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

//set routers
app.use('/', router);

//connect database
AppDataSource.initialize()
    .then(() => {
      console.log("Connected to database")
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
