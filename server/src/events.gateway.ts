import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor() {}

  @SubscribeMessage('connection')
  handleConnection() {
    console.log('on connected');
  }

  OnGatewayInit() {
    console.log('on gateway init');
  }

  @SubscribeMessage('message')
  handleNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ): string {
    client.broadcast.emit('message', data);
    return `ok, got data ${data}`;
  }
}
