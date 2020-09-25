import httpStatus from "http-status";
import { getConnection, getManager, getRepository, InsertResult, Transaction } from "typeorm";
import { User } from "../../../../models/User";
import { UserTransaction } from "../../../../models/UserTransaction";
import { Wallet } from "../../../../models/Wallet";
import APIError from "../../../../utils/APIError";
import { ServiceOptions } from "../../../../utils/ServiceOptions";
import { createDbTransaction } from "../../../../utils/transactionHelpers";
import { createTransaction } from "../transactions/transaction.service";
import { ReqRechargeWalletDto } from "./wallet.dto";



export const rechargeWallet = async (recharge: ReqRechargeWalletDto, { db }: ServiceOptions = { db: getManager() }) => {
    const userRepo = db.getRepository(User);
    const walletRepo = db.getRepository(Wallet);

    const user = await userRepo.findOne({
        relations: ['wallet'],
        where: {
            phoneNumber: recharge.phoneNumber,
            document: recharge.document
        }
    })

    if (!user) {
        throw new APIError({
            status: httpStatus.BAD_REQUEST,
            message: 'Invalid combination of phone-number and document'
        })
    }

    const userTransaction = createDbTransaction(db, async (manager) => {
        await manager.getRepository(Wallet).increment({ id: user.wallet.id }, 'balance', recharge.ammount)
        return await createTransaction({ recieverId: user.wallet.id, originId: null, description: 'recharge', ammount: recharge.ammount, requiresConfirmation: false }, { db: manager })
    })

    return userTransaction
}

interface IGetLatestTransactionsOptions {
    walletId: string
}
export const getLatestTransactions = async ({ walletId }: IGetLatestTransactionsOptions, { db }: ServiceOptions = { db: getManager() }) => {
    return db.getRepository(UserTransaction).createQueryBuilder().where("status = 'approved' AND (originId = :wallet OR recieverId = :wallet)").setParameter('wallet', walletId).limit(10).orderBy('createdDate', 'DESC').getMany()
}
