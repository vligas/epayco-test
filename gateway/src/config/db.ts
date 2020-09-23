import { createConnection, Connection, ConnectionOptions } from "typeorm";
import { User } from "../models/User";
import { UserTransaction } from "../models/UserTransaction";
import { Wallet } from "../models/Wallet";
import { db } from './env'

export const connect = () => createConnection({
    type: "mysql",
    host: db.host,
    port: db.port,
    username: db.user,
    password: db.password,
    database: db.name,
    entities: [User, UserTransaction, Wallet],
    synchronize: true,
} as ConnectionOptions);
