export type SortBy = { sort: string; order: string };

export interface IMovieParams {
    page: string;
    sortBy: SortBy;
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
