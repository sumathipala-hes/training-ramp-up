import express from 'express';
import "reflect-metadata";
import AppDataSource from './services/dataSoure';
import router from "./routes";
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = 4000;

//provide access to frontend application
app.use(cors({
  origin: process.env.ORIGIN, // Replace with the actual origin of your frontend
}));
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
