import { IFailure } from '../interfaces/middlewares';
import { IMovieParams } from '../interfaces/movies';
import { IMovie, Movies } from '../models/Movies';

// Relevator Module Pattern
export default (() => {
    const notResultsFound: IFailure = { message: 'No Results found' };

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

            const movies = await Movies.find().sort(sortParams);

            if (!movies) return notResultsFound;

            return movies;
        },
    };
})();
