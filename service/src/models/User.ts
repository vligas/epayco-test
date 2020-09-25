import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Index, CreateDateColumn } from "typeorm";
import { Wallet } from "./Wallet";

@Entity()
@Index(['document', 'phoneNumber'], { unique: true })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    document: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @OneToOne(type => Wallet, wallet => wallet.user)
    wallet: Wallet;

    @CreateDateColumn()
    createdDate: Date;

}
