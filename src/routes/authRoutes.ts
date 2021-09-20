import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.route('/signin').post(AuthController.signin);

export default router;
