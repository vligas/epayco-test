import { callService } from "../../../../utils/callService";
import { ReqRechargeWalletDto } from "./wallet.dto";



export const rechargeWallet = async (recharge: ReqRechargeWalletDto) => {
    return callService('wallets/recharge', 'post', recharge)
}