import express from 'express';
import { UsersController } from '../controllers/users.controller.js';

const router = express.Router();
const usersController = new UsersController();

router.get('/me', usersController.getUsers);

export default router;
