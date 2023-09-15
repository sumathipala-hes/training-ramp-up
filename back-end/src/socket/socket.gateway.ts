import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway(80, { namespace: 'socket' })
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('message', payload); // Broadcast the message to all connected clients
  }
  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
}
