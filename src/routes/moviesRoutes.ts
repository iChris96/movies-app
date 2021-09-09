import { Router, Response, Request } from 'express';

import MoviesController from '../controllers/MoviesController';
import { IMovieParams } from '../interfaces/movies';
import { isNumeric, isString } from '../utils/utils';
import { sortByValues } from '../consts/movies';

const router = Router();

router.route('/discover').get(async (req: Request, res: Response) => {
    let defaultParams: IMovieParams = {
        sortBy: { sort: 'popularity', order: 'asc' },
        page: '0',
    };

    const { sortBy, page } = req.query;

    if (sortBy && isString(sortBy)) {
        if (sortByValues[sortBy.toString()] !== undefined) {
            defaultParams = {
                ...defaultParams,
                sortBy: sortByValues[sortBy.toString()],
            };
        }
    }

    if (page && isString(page) && isNumeric(page)) {
        defaultParams = { ...defaultParams, page: page.toString() };
    }

    const data = await MoviesController.getBy(defaultParams);
    return res.status(200).json({
        data,
    });
});

export default router;
