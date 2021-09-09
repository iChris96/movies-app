/* eslint-disable no-useless-constructor */
import { IFailure } from '../interfaces/middlewares';
import { IMovie } from '../interfaces/movies';

export class NetworkFailure implements IFailure {
    message = 'network failure';
    constructor() {}
}

export class DatabaseFailure implements IFailure {
    message = '';
    constructor() {}
}

export class RequestFailure implements IFailure {
    message = '';
    constructor(code: number) {
        switch (code) {
            case 100:
                this.message = 'code 100';
                break;
            case 103:
                this.message = 'code 103';
                break;
            default:
                this.message = 'unexpected failure';
                break;
        }
    }
}

export const isNetworkFailure = (
    failure: NetworkFailure | IFailure
): failure is NetworkFailure => {
    return failure instanceof NetworkFailure;
};

export const isDatabaseFailure = (
    failure: DatabaseFailure | IFailure
): failure is DatabaseFailure => {
    return failure instanceof DatabaseFailure;
};

export const isFailure = (val: IMovie[] | IFailure): val is IFailure => {
    return (val as IFailure).message !== undefined;
};
