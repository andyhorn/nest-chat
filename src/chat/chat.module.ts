import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatService } from './chat/chat.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Chat])
    ],
    providers: [ChatService]
})
export class ChatModule { }
