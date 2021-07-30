import { Schema, model } from 'mongoose';

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

const MovieSchema = new Schema<IMovie>({
    id: Number,
    adult: Boolean,
    genreIds: [Number],
    overview: String,
    popularity: Number,
    title: String,
    video: Boolean,
    vote_average: { type: Number, alias: 'voteAverage' },
    vote_count: { type: Number, alias: 'voteCount' },
    backdrop_path: { type: String, alias: 'backdropPath' },
    original_lenguaje: { type: String, alias: 'originalLenguaje' },
    original_title: { type: String, alias: 'originalTitle' },
    release_date: { type: String, alias: 'releaseDate' },
    poster_path: { type: String, alias: 'posterPath' },
});

export const Movies = model<IMovie>('Movies', MovieSchema);
