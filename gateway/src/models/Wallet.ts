import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { UserTransaction } from "./UserTransaction";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'float' })
    balance: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @OneToMany(type => UserTransaction, tx => tx.origin)
    transactionsMade: UserTransaction[];

    @CreateDateColumn()
    createdDate: Date;
}
