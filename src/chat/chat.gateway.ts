import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Room } from 'src/rooms/room.entity';
import { RoomsService } from 'src/rooms/rooms.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { ChatService } from './chat/chat.service';
import { JoinRoomDto } from './dtos/JoinRoom.dto';
import { Chat } from './entities/chat.entity';
import constants from './utils/constants';

@WebSocketGateway()
export class ChatGateway implements OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(private chatService: ChatService, private usersService: UsersService, private roomsService: RoomsService) { }

  public async handleDisconnect(socket: Socket): Promise<void> {
    const user = await this.usersService.findBySocketId(socket.id);
    const room = await this.roomsService.findById(user.room.id);

    room.users = room.users.filter(user => user.id !== user.id);
    await this.usersService.remove(user.id);
    await this.roomsService.update(room);

    if (!room.users.length) {
      await this.roomsService.remove(room.id);
      await this.chatService.cleanOrphans();
    } else {
      socket.broadcast.to(user.room.code).emit(constants.events.LEAVE_ROOM, user);
    }
  }

  @SubscribeMessage(constants.events.JOIN_ROOM)
  public async handleJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() joinRoomDto: JoinRoomDto) {
    const user = await this.usersService.find(joinRoomDto.userId);
    const room = await this.roomsService.findByCode(joinRoomDto.roomId);

    await this.joinUserToRoom(user, room, socket);

    socket.to(room.code).emit(constants.events.JOIN_ROOM, user);
  }

  @SubscribeMessage(constants.events.NEW_MESSAGE)
  public async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() chat: Chat): Promise<void> {
    const user = await this.usersService.findBySocketId(client.id);

    chat.user = user;
    const newChat = await this.chatService.saveChat(chat);

    client.to(user.room.id).emit(constants.events.NEW_MESSAGE, newChat);
  }

  private async joinUserToRoom(user: User, room: Room, socket: Socket): Promise<void> {
    socket.join(room.code);
    user.room = room;
    user.socketId = socket.id;
    room.users.push(user);

    await Promise.all([
      this.usersService.update(user),
      this.roomsService.update(room)
    ]);
  }
}
