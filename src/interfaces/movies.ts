export type SortBy = { sort: string; order: string };

export interface IMovieParams {
    page: string;
    sortBy: SortBy;
}
