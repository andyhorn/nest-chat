import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { RoomsModule } from './rooms/rooms.module';
import { Room } from './rooms/room.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Chat, User, Room],
      synchronize: true,
    }),
    ChatModule,
    UsersModule,
    RoomsModule
  ],
  controllers: [AppController]
})
export class AppModule { }
