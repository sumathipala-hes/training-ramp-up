import express, { type Request, type Response } from 'express';
import 'reflect-metadata';
import dataSource from './config/dataSource';
import * as bodyParser from 'body-parser';
import { studentRoutes } from './routes/studentRoutes';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

dataSource
  .initialize()
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: '*'
      }
    });

    studentRoutes.forEach((route) => {
      (app as any)[route.method](route.route, async (req: Request, res: Response, next: () => void) => {
        const result = new (route.controller as any)()[route.action](req, res, next);
        if (result instanceof Promise) {
          await result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      });
    });

    io.on('connection', (socket: any) => {
      console.log('a user connected', socket.id);
      socket.emit('hello', 'world');
    });

    server.listen(3000);

    console.log('Express server has started on port 3000. Open http://localhost:3000/students to see results');
  })
  .catch((error) => {
    console.log(error);
  });
