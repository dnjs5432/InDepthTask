import express from 'express';
import authRouter from './auth.router.js';
import usersRouter from './users.router.js';
import productRouter from './products.router.js';

const router = express.Router();

router.use('/auth', authRouter);
// router.use('/users', usersRouter);
// router.use('/products', productRouter);

export default router;
