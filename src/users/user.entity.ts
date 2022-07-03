import { Chat } from "src/chat/entities/chat.entity";
import { Room } from "src/rooms/room.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    socketId: string;

    @ManyToOne(() => Room, room => room.users, {
        nullable: true
    })
    room: Room;

    @OneToMany(() => Chat, chat => chat.user, {
        onDelete: 'SET NULL',
    })
    messages: Chat[];

    @CreateDateColumn()
    joined: Date;
}