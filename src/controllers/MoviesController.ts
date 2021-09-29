import { Request, Response } from 'express';
import { Aggregate } from 'mongoose';
import { DESCENDING, sortByValues } from '../consts/movies';
import { IFailure } from '../interfaces/middlewares';
import { IMovie, IMovieGetByParams } from '../interfaces/movies';
import { IDiscoverResponse, IErrorResponse } from '../interfaces/responses';
import { Movies } from '../models/Movies';
import { DatabaseFailure, isFailure } from '../utils/failure';
import { isNumeric, isString } from '../utils/utils';

// Relevator Module Pattern
export default (() => {
    const notResultsFound: IFailure = { message: 'No Results found' };
    const lessOrEqualPageFailure = (page: number): IFailure => ({
        message: `page must be less than or equal to ${page}`,
    });

    const greatherPageFailure: IFailure = {
        message: 'page must be greater than 0',
    };

    const aggregatePaginatedMovies = ({
        limit,
        page,
        sort,
    }: any): Aggregate<any[]> =>
        Movies.aggregate([
            {
                $facet: {
                    total: [{ $group: { _id: null, count: { $sum: 1 } } }],
                    results: [
                        { $sort: sort },
                        { $skip: limit * (page - 1) },
                        { $limit: limit },
                    ],
                },
            },
            {
                $project: {
                    total: '$total.count',
                    results: '$results',
                },
            },
        ]);

    // eslint-disable-next-line no-unused-vars
    const skipIndex = (page: number, limit: number) => (page - 1) * limit;

    // eslint-disable-next-line no-unused-vars
    const findPaginatedMovies = ({ limit, skipIndex, sort }: any) =>
        Movies.find().sort(sort).limit(limit).skip(skipIndex);

    // eslint-disable-next-line no-unused-vars
    const getAllMovies = async (): Promise<IMovie[]> => {
        const movies = await Movies.find();

        if (!movies) return [];

        return movies;
    };

    const getBy = async ({
        sortBy,
        page,
        limit,
    }: IMovieGetByParams): Promise<
        { data: IMovie[]; totalResults: number; totalPages: number } | IFailure
    > => {
        console.log(
            `movies.controller.params - sortBy.sort: ${sortBy.sort}  - sortBy.order: ${sortBy.order} - page: ${page} `
        );

        const sortParams: any = {};

        sortParams[sortBy.sort] = sortBy.order;

        console.log('sortParams: ', sortParams);

        try {
            if (page < 1) return greatherPageFailure;

            const movies = await aggregatePaginatedMovies({
                limit,
                page,
                sort: sortParams,
            });

            if (!movies) return notResultsFound;

            const [
                {
                    total: [total = 0],
                    results,
                },
            ] = movies;

            const totalPages = Math.trunc(total / limit);

            if (Number(page) > totalPages) {
                return lessOrEqualPageFailure(totalPages);
            }

            return {
                totalResults: total,
                data: results,
                totalPages,
            };
        } catch (err) {
            console.error('unexpected db error: ', err);
            return new DatabaseFailure();
        }
    };

    return {
        discoverMovies: async (req: Request, res: Response) => {
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

            const data = await getBy(defaultParams);

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
        },
    };
})();
