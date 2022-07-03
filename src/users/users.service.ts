import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    public getAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    public async find(id: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('No user with the id:', id);
        }

        return user;
    }

    public async findBySocketId(socketId: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ socketId });

        if (!user) {
            throw new NotFoundException('No user with the socket id:', socketId);
        }

        return user;
    }

    public async create(user: User): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return await this.usersRepository.save(newUser);
    }

    public async remove(id: string): Promise<void> {
        const user = await this.usersRepository.findOneBy({ id });

        if (user) {
            await this.usersRepository.remove(user);
        }
    }

    public async update(update: User): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id: update.id });

        if (!user) {
            throw new NotFoundException('No user with the id:', update.id);
        }

        Object.assign(user, update);
        return await this.usersRepository.save(user);
    }
}
