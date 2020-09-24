import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Wallet } from "./Wallet";

@Entity()
export class UserTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'float' })
    ammount: number;

    @Column({ type: "uuid", nullable: true })
    originId: string | null;


    @ManyToOne(type => Wallet, wallet => wallet.transactionsMade)
    origin?: Wallet | null;

    @Column({ type: "uuid", nullable: true })
    recieverId: string | null;


    @ManyToOne(type => Wallet, { nullable: true })
    reciever?: Wallet | null;

    @Column()
    status: string;

    @Column()
    description: string;

    @Column()
    refNumber: number;

    @CreateDateColumn()
    createdDate: Date;
}
