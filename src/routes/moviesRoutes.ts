import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import MoviesController from '../controllers/MoviesController';

const router = Router();

router
    .route('/discover')
    .all(AuthController.withToken)
    .get(MoviesController.discoverMovies);

export default router;
