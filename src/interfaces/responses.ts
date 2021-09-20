import { IMovie } from './movies';

export interface IDiscoverResponse {
    page: number;
    results: IMovie[];
    totalPages: number;
    totalResults: number;
}

export interface IErrorResponse {
    errors: [string];
}
