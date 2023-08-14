import express from 'express';
import router from "./routes";
import cors from 'cors';

const app = express();

app.use(express.json());

//provide access to frontend application
app.use(cors({
    origin: process.env.ORIGIN,
  }));
  
  
//set routers
app.use('/', router);

export default app;