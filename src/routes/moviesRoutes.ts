import { Router } from 'express';
import MoviesController from '../controllers/MoviesController';

const router = Router();

router.route('/discover').get(MoviesController.discoverMovies);

export default router;
