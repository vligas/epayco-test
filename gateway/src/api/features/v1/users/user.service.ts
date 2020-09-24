import httpStatus from "http-status";
import { getConnection, getManager, getRepository, InsertResult } from "typeorm";
import { User } from "../../../../models/User";
import { Wallet } from "../../../../models/Wallet";
import APIError from "../../../../utils/APIError";
import { ServiceOptions } from "../../../../utils/ServiceOptions";
import { ReqCreateUserDto } from "./user.dto";


const getUserRepository = () => getRepository(User)

export const createUser = async (user: ReqCreateUserDto, options: ServiceOptions = { db: getManager() }) => {
    const repo = getUserRepository();
    if (await repo.findOne({ phoneNumber: user.phoneNumber, document: user.document })) {
        throw new APIError({
            status: httpStatus.BAD_REQUEST,
            message: 'A user with that document and phone-number already exists.'
        })
    }
    let savedUser = await getConnection().transaction(async tx => {
        const insertedUser = await tx.getRepository(User).insert(user);
        await tx.getRepository(Wallet).insert({ balance: 0, user: insertedUser.identifiers[0] });
        return insertedUser
    }) as InsertResult;

    return repo.merge(repo.create(user), savedUser.generatedMaps[0])
}
