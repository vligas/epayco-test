import express, { Request, Response } from 'express';
import validate from 'express-validation';
import { validateBody } from '../../../../middlewares/validation';
import { wrap } from '../../../../utils/asyncWrap';
import { ReqCreateUserDto } from './user.dto';
import { createUser } from './user.service';

const router = express.Router();

router.post(
    '/',
    validateBody(ReqCreateUserDto),
    wrap(async (req: Request, res: Response) => {
        const user = await createUser(req.body as ReqCreateUserDto)
        res.status(200);
        res.json({ data: user })
    })
);


export default router;
