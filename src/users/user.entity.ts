import { Chat } from "src/chat/entities/chat.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Chat, chat => chat.user, {
        onDelete: "CASCADE",
        cascade: true
    })
    messages: Chat[];

    @CreateDateColumn()
    joined: Date;
}