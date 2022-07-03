import { User } from "src/users/user.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Room {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    code: string;

    @OneToMany(() => User, user => user.room, {
        onDelete: "SET NULL"
    })
    users: User[];
}