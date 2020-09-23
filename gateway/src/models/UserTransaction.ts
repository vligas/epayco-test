import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Wallet } from "./Wallet";

@Entity()
export class UserTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'float' })
    ammount: number;

    @ManyToOne(type => Wallet)
    origin: string;

    @ManyToOne(type => Wallet)
    reciever: string;

    @Column()
    status: string;

    @Column()
    confirmationCode: string;

    @CreateDateColumn()
    createdDate: Date;

}
