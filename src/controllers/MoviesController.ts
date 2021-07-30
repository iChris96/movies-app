import { IMovie, Movies } from '../models/Movies';

// Relevator Module Pattern
export default (() => {
    const resource = 'api/users';

    return {
        getAllMovies: async (): Promise<IMovie[]> => {
            const movies = await Movies.find();

            if (!movies) return [];

            return movies;
        },
        create: async () => {},
    };
})();
