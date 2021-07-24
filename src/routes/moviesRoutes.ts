import { Router, Response, Request } from 'express';

import MoviesController from '../controllers/MoviesController';

const router = Router();

router.route('/discover').get(async (req: Request, res: Response) => {
    const data = await MoviesController.getAllMovies();
    return res.status(200).json({
        data,
    });
});

export default router;
