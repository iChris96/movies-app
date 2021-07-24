import { Movies } from '../models/Movies';

// Relevator Module Pattern
export default (() => {
    const resource = 'api/users';

    return {
        getAllMovies: async () => {
            const movies = await Movies.find();
            console.log('movies: ', movies);
            return movies;
        },
        create: async () => {},
    };
})();
