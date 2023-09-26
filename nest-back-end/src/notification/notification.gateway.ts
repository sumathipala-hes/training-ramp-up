import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, payload: any): void {
    console.log(message);
    this.server.emit('message', payload);
  }
}
