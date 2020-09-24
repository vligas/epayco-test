import express from 'express';
import userRouter from './users/user.routes'


const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));
router.use('/users', userRouter);

export default router;
