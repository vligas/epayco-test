import express from 'express';
import userRouter from './users/user.routes'
import walletRouter from './wallet/wallet.routes'


const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));
router.use('/users', userRouter);
router.use('/wallets', walletRouter);

export default router;
