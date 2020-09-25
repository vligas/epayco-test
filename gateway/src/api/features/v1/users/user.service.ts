import httpStatus from "http-status";
import { getConnection, getManager, getRepository, InsertResult, Transaction } from "typeorm";
import { User } from "../../../../models/User";
import { Wallet } from "../../../../models/Wallet";
import APIError from "../../../../utils/APIError";
import { decrypt, encrypt } from "../../../../utils/encryption";
import { sendMail } from "../../../../utils/sendMail";
import { ServiceOptions } from "../../../../utils/ServiceOptions";
import { createDbTransaction } from "../../../../utils/transactionHelpers";
import { confirmTransaction, createTransaction } from "../transactions/transaction.service";
import { ReqCreateUserDto, ReqPurchaseDto, ReqVerifyPurchaseDto } from "./user.dto";


interface IFindUserWhere {
    document: string
    phoneNumber: string
}

export const generateConfirmationCode = () => Math.floor(Math.random() * (999999 - 100000) + 100000)


export const findUser = ({ document, phoneNumber }: IFindUserWhere, { db }: ServiceOptions = { db: getManager() }) => {
    const repo = db.getRepository(User)
    return repo.findOne({ relations: ['wallet'], where: { document, phoneNumber } })
}


export const createUser = async (user: ReqCreateUserDto, { db }: ServiceOptions = { db: getManager() }) => {
    const repo = db.getRepository(User);
    if (await findUser({ document: user.document, phoneNumber: user.phoneNumber }, { db })) {
        throw new APIError({
            status: httpStatus.BAD_REQUEST,
            message: 'A user with that document and phone-number already exists.'
        })
    }

    let savedUser = await createDbTransaction(db, async tx => {
        const insertedUser = await tx.getRepository(User).insert(user);
        await tx.getRepository(Wallet).insert({ balance: 0, user: insertedUser.identifiers[0] });
        return insertedUser
    }) as InsertResult;

    return repo.merge(repo.create(user), savedUser.generatedMaps[0])
}



export const makePurchase = async (purchase: ReqPurchaseDto, { db }: ServiceOptions = { db: getManager() }) => {
    const user = await findUser({ phoneNumber: purchase.phoneNumber, document: purchase.document }, { db })
    console.log(user)
    if (!user) {
        throw new APIError({
            status: httpStatus.BAD_REQUEST,
            message: 'Invalid combination of phone-number and document'
        })
    }

    const transaction = await createTransaction({ originId: user.wallet.id, requiresConfirmation: true, ammount: purchase.ammount, description: 'purchase', recieverId: null })
    const confirmationCode = generateConfirmationCode().toString()
    await sendMail(`"${user.name}" <${user.email}>`, 'New transaction', `this is your confirmation code: ${confirmationCode}`)
    return await encrypt({ confirmationCode, transactionId: transaction.id })
}

export const verifyPurchase = async (verification: ReqVerifyPurchaseDto, { db }: ServiceOptions = { db: getManager() }) => {
    let payload
    try {
        payload = await decrypt(verification.sessionToken)
    }
    catch (e) {
        throw new APIError({
            status: httpStatus.BAD_REQUEST,
            message: 'Invalid session token'
        })
    }
    if (payload.confirmationCode === verification.confirmationCode) {
        await confirmTransaction(payload.transactionId, { db })
    }
    else {
        throw new APIError({
            status: httpStatus.BAD_REQUEST,
            message: 'Invalid pin'
        })
    }
}