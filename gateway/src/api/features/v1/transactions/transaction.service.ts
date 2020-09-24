import httpStatus from "http-status";
import { getConnection, getManager, getRepository, InsertResult, Transaction } from "typeorm";
import { User } from "../../../../models/User";
import { UserTransaction } from "../../../../models/UserTransaction";
import { Wallet } from "../../../../models/Wallet";
import APIError from "../../../../utils/APIError";
import { ServiceOptions } from "../../../../utils/ServiceOptions";

interface ICreateTransaction {
    origin: string | null | undefined
    reciever: string | null | undefined
    ammount: number
    requiresConfirmation: boolean
}


export const createTransaction = async ({ requiresConfirmation, ...transaction }: ICreateTransaction, { db }: ServiceOptions = { db: getManager() }) => {
    const transactionRepo = db.getRepository(UserTransaction)
    let register: UserTransaction
    if (requiresConfirmation) {
        register = transactionRepo.create({ ...transaction, status: 'pending', confirmationCode: '1231' })
    }
    else {
        register = transactionRepo.create({ ...transaction, status: 'approved' })
    }

    const insertedRegister = await transactionRepo.insert(register)
    return transactionRepo.merge(register, insertedRegister.generatedMaps[0])
}
