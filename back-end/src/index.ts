import "reflect-metadata";
import AppDataSource from './config/dataSoure';
import dotenv from 'dotenv'
import { createServer } from "http";
import { Server } from "socket.io";
import app from './app';
dotenv.config();

const port = 4000;

//initialize socket.io server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

//config socket to acess it from controllers
app.set('io', io);

//connect database
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database")
  })
  .catch((error) => console.log(error))
    
httpServer.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
