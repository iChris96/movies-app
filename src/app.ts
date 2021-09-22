import express from 'express';
import { moviesRoutes, authRoutes } from './routes';
import dotenv from 'dotenv';

// Construct pattern
class Application {
    app: express.Application = express();
    port: number | string = process.env.PORT || 3000;

    constructor() {
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        dotenv.config({ path: '.env' });
    }

    middlewares() {
        this.app.use(express.json()); // app understands json
        this.app.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use('/movies', moviesRoutes);
        this.app.use('/auth', authRoutes);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(
                `Example app listening at http://localhost:${this.port}`
            );
        });

        console.log({ process: process.env.SECRET_TOKEN });
    }
}

export const app = new Application();
