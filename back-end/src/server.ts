import express from 'express';
import 'reflect-metadata';
import studentRoutes from './routes/student.route';
import userRoutes from './routes/user.route';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import AppDataSource from './config/database';
import cookieParser from 'cookie-parser';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());
app.use(studentRoutes);
app.use(userRoutes);


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`[Server]: User Connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[Server]: User Disconnected`);
  });
});

export const getSocketInstance = () => {
  if (!io) {
    throw new Error('Socket.io has not been initialized.');
  }
  return io;
};

AppDataSource.initialize()
  .then(() => {
    console.log(`[Server]: Database Connected Successfully.`);
  })
  .catch((err) => console.log(`[Server]: Error Connecting Database:${err}`));

server.listen(port, (): void => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});

export default app;
