import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Wallet } from "./Wallet";

@Entity()
export class UserTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'float' })
    ammount: number;

    @ManyToOne(type => Wallet, { nullable: true })
    origin?: string | null;

    @ManyToOne(type => Wallet, { nullable: true })
    reciever?: string | null;

    @Column()
    status: string;

    @Column({ nullable: true })
    confirmationCode?: string;

    @CreateDateColumn()
    createdDate: Date;
}
