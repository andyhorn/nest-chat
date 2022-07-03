import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) { }

    public create(code: string): Promise<Room> {
        const newRoom = this.roomRepository.create();
        newRoom.code = code;
        return this.roomRepository.save(newRoom);
    }

    public async findById(id: string): Promise<Room> {
        const room = await this.roomRepository.findOneBy({ id });

        if (!room) {
            throw new NotFoundException('No room with id:', id);
        }

        return room;
    }

    public async findByCode(code: string): Promise<Room> {
        const room = await this.roomRepository.findOneBy({ code });

        if (!room) {
            throw new NotFoundException('No room found with code:', code);
        }

        return room;
    }

    public async update(update: Room): Promise<Room> {
        const room = await this.findById(update.id);
        Object.assign(room, update);
        return this.roomRepository.save(room);
    }

    public async remove(id: string): Promise<void> {
        const room = await this.findById(id);
        await this.roomRepository.remove(room);
    }
}
