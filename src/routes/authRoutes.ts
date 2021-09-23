import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.route('/signin').post(AuthController.signin);

router.route('/signup').post(AuthController.signup);

export default router;
