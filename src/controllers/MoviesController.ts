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
            const movies = await Movies.find();

            if (!movies) return notResultsFound;

            return movies;
        },
    };
})();
