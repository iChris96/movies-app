import { IFailure } from '../interfaces/middlewares';
import { IMovie, IMovieParams } from '../interfaces/movies';
import { Movies } from '../models/Movies';

// Relevator Module Pattern
export default (() => {
    const notResultsFound: IFailure = { message: 'No Results found' };
    const invalidPageValue: IFailure = {
        message: 'page must be less than or equal to 400',
    };
    const unexpectedCall: IFailure = {
        message: 'something went wrong',
    };

    return {
        getAllMovies: async (): Promise<IMovie[]> => {
            const movies = await Movies.find();

            if (!movies) return [];

            return movies;
        },
        getBy: async ({
            sortBy,
            page,
        }: IMovieParams): Promise<IMovie[] | IFailure> => {
            console.log(
                `movies.controller.params - sortBy.sort: ${sortBy.sort}  - sortBy.order: ${sortBy.order} - page: ${page} `
            );

            const sortParams: any = {};

            sortParams[sortBy.sort] = sortBy.order;

            try {
                const movies = await Movies.find().sort(sortParams);

                if (!movies) return notResultsFound;

                if (Number(page) > 400) return invalidPageValue;

                return movies;
            } catch (err) {
                console.error('unexpected error: ', unexpectedCall);
                return unexpectedCall;
            }
        },
    };
})();
