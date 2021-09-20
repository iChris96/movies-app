export type SortBy = { sort: string; order: number };

export interface IMovieGetByParams {
    page: number;
    sortBy: SortBy;
    limit: number;
}

export interface IMovie {
    id: number;
    adult: boolean;
    backdropPath: string;
    genreIds: Array<number>;
    originalLenguaje: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    releaseDate: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
    posterPath: string;
}
