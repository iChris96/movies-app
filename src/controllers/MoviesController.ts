import { Aggregate } from 'mongoose';
import { IFailure } from '../interfaces/middlewares';
import { IMovie, IMovieGetByParams } from '../interfaces/movies';
import { Movies } from '../models/Movies';
import { DatabaseFailure } from '../utils/failure';

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

    return {
        getAllMovies: async (): Promise<IMovie[]> => {
            const movies = await Movies.find();

            if (!movies) return [];

            return movies;
        },
        getBy: async ({
            sortBy,
            page,
            limit,
        }: IMovieGetByParams): Promise<
            | { data: IMovie[]; totalResults: number; totalPages: number }
            | IFailure
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
        },
    };
})();
