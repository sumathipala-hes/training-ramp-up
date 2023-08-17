import express from 'express';
import "reflect-metadata";
import AppDataSource from './services/dataSoure';
import router from "./routes";
import cors from 'cors';
import dotenv from 'dotenv'
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();

const app = express();
const port = 4000;

//initialize socket.io server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

//provide access to frontend application
app.use(cors({
  origin: process.env.ORIGIN,
}));
app.use(express.json());

//config socket to acess it from controllers
app.set('io', io);
//set routers
app.use('/', router);

//connect database
AppDataSource.initialize()
    .then(() => {
      console.log("Connected to database")
    })
    .catch((error) => console.log(error))
    
httpServer.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
