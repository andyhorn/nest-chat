import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Client } from 'socket.io/dist/client';
import { UsersService } from 'src/users/users.service';
import { ChatService } from './chat/chat.service';
import { Chat } from './entities/chat.entity';
import constants from './utils/constants';

@WebSocketGateway()
export class ChatGateway implements OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(private chatService: ChatService, private usersService: UsersService) { }

  @SubscribeMessage(constants.events.NEW_USER)
  public async handleNewUser(socket: Socket, id: string): Promise<void> {
    const user = await this.usersService.find(id);
    user.socketId = socket.id;
    await this.usersService.update(user);
    socket.broadcast.emit(constants.events.NEW_USER, user);
  }

  public async handleDisconnect(socket: Socket): Promise<void> {
    console.log('Client disconnected:', socket.id);
    const user = await this.usersService.findBySocketId(socket.id);
    await this.usersService.remove(user.id);
    socket.broadcast.emit(constants.events.REMOVE_USER, user);
  }

  @SubscribeMessage(constants.events.ADD_MESSAGE)
  public async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() chat: Chat): Promise<void> {
    const user = await this.usersService.findBySocketId(client.id);
    chat.user = user;
    const newChat = await this.chatService.saveChat(chat);
    client.emit(constants.events.NEW_MESSAGE, newChat);
    client.broadcast.emit(constants.events.NEW_MESSAGE, newChat);
  }
}
