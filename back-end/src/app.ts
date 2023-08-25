import express from 'express';
import router from "./routes";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser()); //add cookies feature
app.use(express.urlencoded({ extended: true }));

//provide access to frontend application
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true, 
  }));
  
//set routers
app.use('/', router);

export default app;