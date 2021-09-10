import { Request, Response, Router } from 'express';
import { sortByValues } from '../consts/movies';
import MoviesController from '../controllers/MoviesController';
import { IMovieParams } from '../interfaces/movies';
import { IDiscoverResponse, IErrorResponse } from '../interfaces/responses';
import { isFailure } from '../utils/failure';
import { isNumeric, isString } from '../utils/utils';

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

    if (isFailure(data)) {
        const response: IErrorResponse = {
            errors: [data.message],
        };

        return res.status(422).json(response);
    }

    const response: IDiscoverResponse = {
        page: 0,
        results: data,
        totalPages: 400,
        totalResults: 10000,
    };

    return res.status(200).json(response);
});

export default router;
