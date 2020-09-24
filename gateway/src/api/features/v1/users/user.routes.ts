import express, { Request, Response } from 'express';
import validate from 'express-validation';
import { validateBody } from '../../../../middlewares/validation';
import { wrap } from '../../../../utils/asyncWrap';
import { ReqCreateUserDto, ReqPurchaseDto, ReqVerifyPurchaseDto } from './user.dto';
import { createUser, makePurchase, verifyPurchase } from './user.service';

const router = express.Router();

router.post(
    '/',
    validateBody(ReqCreateUserDto),
    wrap(async (req: Request, res: Response) => {
        const user = await createUser(req.body as ReqCreateUserDto)
        res.status(200);
        res.json({ data: user, message: 'User created' })
    })
);

router.post(
    '/make-purchase',
    validateBody(ReqPurchaseDto),
    wrap(async (req: Request, res: Response) => {
        res.status(200)
        res.json({ data: await makePurchase(req.body) })
    })
)

router.post(
    '/verify-purchase',
    validateBody(ReqVerifyPurchaseDto),
    wrap(async (req: Request, res: Response) => {
        res.status(200)
        await verifyPurchase(req.body)
        res.json({ data: null, message: 'Purchase verified' })
    })
)



export default router;
