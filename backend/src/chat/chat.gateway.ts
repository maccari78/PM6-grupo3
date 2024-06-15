import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

import { Server, Socket } from 'socket.io';
import { MessageChat } from './interfaces/usersChat.interfaces';

const PORT = Number(process.env.PORT_WS) || 3002;
@WebSocketGateway(PORT, {
  namespace: 'chat',
  cors: '*',
  transports: ['websocket'],
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;
  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ' + client.id);
  }
  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, room: string) {
    console.log(`El usuario ${client.id} se ha unido al chat ${room}`);

    client.join(`${room}`);
  }
  @SubscribeMessage('event_leave')
  handleRoomLeave(client: Socket, room: string) {
    console.log(`El usuario ${client.id} ha dejado el chat ${room}`);
    client.leave(`${room}`);
  }
  // cambiar a mensaje de ser necesario
  @SubscribeMessage('posts')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateChatDto,
  ) {
    const token: string = client.handshake.auth?.token;
    if (!token) {
      client.disconnect();
      return;
    }
    const message: MessageChat = await this.chatService.create(payload, token);
    if (!message) {
      client.disconnect();
      return;
    }
    console.log(message);

    client.broadcast.emit(`${payload.room_id}`, message);
  }
}
