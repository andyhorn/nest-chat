import { Controller, Get, Param } from '@nestjs/common';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';
import { ChatService } from './chat/chat.service';
import { Chat } from './entities/chat.entity';

@Controller('api/v1/chat')
export class ChatController {
    constructor(private usersService: UsersService, private roomsService: RoomsService, private chatService: ChatService) { }

    @Get('/:roomCode')
    public async getAllRoomMessages(@Param('roomCode') roomCode: string): Promise<Chat[]> {
        const room = await this.roomsService.findByCode(roomCode);
        const users = await this.usersService.findAllInRoom(room.id);
        const userChats = await Promise.all(users.map(user => this.chatService.findByUser(user.id)))
        const chats = userChats.reduce((allChats, userChatList) => [...allChats, ...userChatList], []);
        return chats.sort((a, b) => a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0);
    }
}
