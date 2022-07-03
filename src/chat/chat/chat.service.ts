import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';

@Injectable()
export class ChatService {
    constructor(@InjectRepository(Chat) private chatRepository: Repository<Chat>) { }

    public getAllChats(): Promise<Chat[]> {
        return this.chatRepository.find();
    }

    public async saveChat(chat: Chat): Promise<Chat> {
        const newChat = this.chatRepository.create(chat);
        return await this.chatRepository.save(newChat);
    }

    public async findByUser(userId: string): Promise<Chat[]> {
        return this.chatRepository.createQueryBuilder()
            .select('*')
            .where('userId = :userId', { userId })
            .getMany();
    }

    public async cleanOrphans(): Promise<void> {
        await this.chatRepository.createQueryBuilder()
            .delete()
            .where('userId = NULL')
            .execute();
    }
}
