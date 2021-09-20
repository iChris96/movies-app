import { Request, Response, Router } from 'express';
import { DESCENDING, sortByValues } from '../consts/movies';
import MoviesController from '../controllers/MoviesController';
import { IMovieGetByParams } from '../interfaces/movies';
import { IDiscoverResponse, IErrorResponse } from '../interfaces/responses';
import { isFailure } from '../utils/failure';
import { isNumeric, isString } from '../utils/utils';

const router = Router();

router.route('/discover').get(async (req: Request, res: Response) => {
    let defaultParams: IMovieGetByParams = {
        sortBy: { sort: 'popularity', order: DESCENDING },
        page: 1,
        limit: 4,
    };

    const { sortBy, page, limit } = req.query;

    if (sortBy && isString(sortBy)) {
        if (sortByValues[sortBy.toString()] !== undefined) {
            defaultParams = {
                ...defaultParams,
                sortBy: sortByValues[sortBy.toString()],
            };
        }
    }

    if (page && isString(page) && isNumeric(page)) {
        defaultParams = { ...defaultParams, page: Number(page) };
    }

    if (limit && isString(limit) && isNumeric(limit)) {
        defaultParams = { ...defaultParams, limit: Number(limit) };
    }

    const data = await MoviesController.getBy(defaultParams);

    if (isFailure(data)) {
        const response: IErrorResponse = {
            errors: [data.message],
        };

        return res.status(422).json(response);
    }

    const response: IDiscoverResponse = {
        page: defaultParams.page,
        results: data.data,
        totalPages: data.totalPages,
        totalResults: data.totalResults,
    };

    return res.status(200).json(response);
});

export default router;
