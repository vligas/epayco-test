import { callService } from "../../../../utils/callService";
import { ReqCreateUserDto, ReqPurchaseDto, ReqVerifyPurchaseDto } from "./user.dto";


interface IFindUserWhere {
    document: string
    phoneNumber: string
}

export const findUser = ({ document, phoneNumber }: IFindUserWhere) => {
    return callService('users/info', 'post', { document, phoneNumber });
}


export const createUser = async (user: ReqCreateUserDto) => {
    return callService('users', 'post', user)
}



export const makePurchase = async (purchase: ReqPurchaseDto) => {
    return callService('users/make-purchase', 'post', purchase)
}

export const verifyPurchase = async (verification: ReqVerifyPurchaseDto) => {
    return callService('users/verify-purchase', 'put', verification)
}