import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router();
const authController = new AuthController();

router.post('/', authController.signUp);
router.get('/', authController.signIn);

export default router;
