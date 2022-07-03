import { User } from "src/users/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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