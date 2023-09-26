import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ['GET', 'POST'],
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
}
