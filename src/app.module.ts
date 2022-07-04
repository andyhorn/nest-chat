import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { RoomsModule } from './rooms/rooms.module';
import { Room } from './rooms/room.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { getConfig } from './config/db.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve('dist', 'client'),
      exclude: ['/api*',]
    }),
    TypeOrmModule.forRoot(getConfig([
      User,
      Room,
      Chat
    ])),
    ChatModule,
    UsersModule,
    RoomsModule
  ],
})
export class AppModule { }
