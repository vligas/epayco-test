import express, { Request, Response } from 'express';
import validate from 'express-validation';
import httpStatus from 'http-status';
import { validateBody } from '../../../../middlewares/validation';
import APIError from '../../../../utils/APIError';
import { wrap } from '../../../../utils/asyncWrap';
import { ReqCreateUserDto, ReqPurchaseDto, ReqUserInfoDto, ReqVerifyPurchaseDto } from './user.dto';
import { createUser, findUser, makePurchase, verifyPurchase } from './user.service';

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

router.post('/info', validateBody(ReqUserInfoDto), wrap(async (req: Request, res: Response) => {
    const user = await findUser(req.body)
    if (!user) {
        throw new APIError({
            status: httpStatus.BAD_REQUEST,
            message: 'Invalid credentials'
        })
    }
    res.status(200)
    res.json({ data: user, message: 'User info retrieved' })
}))

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
