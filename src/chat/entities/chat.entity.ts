import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    timestamp: Date;
}