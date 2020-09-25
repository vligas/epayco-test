import httpStatus from "http-status";
import { getManager, getRepository, InsertResult, Transaction } from "typeorm";
import { User } from "../../../../models/User";
import { UserTransaction } from "../../../../models/UserTransaction";
import { Wallet } from "../../../../models/Wallet";
import APIError from "../../../../utils/APIError";
import { ServiceOptions } from "../../../../utils/ServiceOptions";
import { createDbTransaction } from "../../../../utils/transactionHelpers";

interface ICreateTransaction {
    originId: string | null | undefined
    recieverId: string | null | undefined
    description: string
    ammount: number
    requiresConfirmation: boolean
}

export const generateRefNumber = () => Math.floor(Math.random() * (99999999 - 10000000) + 10000000)

export const createTransaction = async ({ requiresConfirmation, ...transaction }: ICreateTransaction, { db }: ServiceOptions = { db: getManager() }) => {
    const transactionRepo = db.getRepository(UserTransaction)
    let register: UserTransaction
    if (requiresConfirmation) {
        register = transactionRepo.create({ ...transaction, status: 'pending' })
    }
    else {
        register = transactionRepo.create({ ...transaction, status: 'approved' })
    }

    register.refNumber = generateRefNumber()

    const insertedRegister = await transactionRepo.insert(register)
    return transactionRepo.merge(register, insertedRegister.generatedMaps[0])
}

export const confirmTransaction = async (transactionId: string, { db }: ServiceOptions = { db: getManager() }) => {
    await createDbTransaction(db, async tx => {
        const transaction = await tx.getRepository(UserTransaction).findOne({ relations: ['origin'], where: { id: transactionId } })
        if (!transaction) {
            throw new APIError({
                status: httpStatus.BAD_REQUEST,
                message: 'Transaction doesn\'t exists'
            })
        }
        else if (transaction.status !== 'pending') {
            throw new APIError({
                status: httpStatus.BAD_REQUEST,
                message: 'This transaction is not waiting for approval'
            })
        }
        else {
            if (transaction.origin && transaction.origin.balance >= transaction.ammount) {
                transaction.status = 'approved'
                await tx.getRepository(UserTransaction).save(transaction)
                await tx.getRepository(Wallet).decrement({ id: transaction.origin.id }, 'balance', transaction.ammount)
            }
            else {
                throw new APIError({
                    status: httpStatus.BAD_REQUEST,
                    message: 'Insufficient funds'
                })
            }
        }
    })
}