import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'float' })
    balance: number;


    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdDate: Date;

}
