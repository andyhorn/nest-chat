import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatService } from './chat/chat.service';
import { ChatGateway } from './chat.gateway';
import { UsersModule } from 'src/users/users.module';
import { ChatController } from './chat.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Chat]),
        UsersModule
    ],
    providers: [ChatService, ChatGateway],
    controllers: [ChatController],
})
export class ChatModule { }
