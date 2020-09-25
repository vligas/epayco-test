import express, { Request, Response } from 'express';
import validate from 'express-validation';
import { validateBody } from '../../../../middlewares/validation';
import { wrap } from '../../../../utils/asyncWrap';
import { ReqRechargeWalletDto } from './wallet.dto';
import { rechargeWallet } from './wallet.service';

const router = express.Router();

router.put(
    '/recharge',
    validateBody(ReqRechargeWalletDto),
    wrap(async (req: Request, res: Response) => {
        const wallet = await rechargeWallet(req.body as ReqRechargeWalletDto)
        res.status(200);
        res.json({ data: wallet, message: 'Wallet recharged' })
    })
);


export default router;
