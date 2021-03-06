import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.messages, {
        onDelete: 'SET NULL',
        nullable: true
    })
    user: User;

    @Column()
    content: string;

    @CreateDateColumn()
    timestamp: Date;
}