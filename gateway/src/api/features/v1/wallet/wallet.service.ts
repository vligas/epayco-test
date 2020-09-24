import httpStatus from "http-status";
import { getConnection, getManager, getRepository, InsertResult } from "typeorm";
import { User } from "../../../../models/User";
import { Wallet } from "../../../../models/Wallet";
import APIError from "../../../../utils/APIError";
import { ServiceOptions } from "../../../../utils/ServiceOptions";
import { createDbTransaction } from "../../../../utils/transactionHelpers";
import { createTransaction } from "../transactions/transaction.service";
import { ReqRechargeWalletDto } from "./wallet.dto";


const getWalletRepository = () => getRepository(Wallet)
const getUserRepository = () => getRepository(User)

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
