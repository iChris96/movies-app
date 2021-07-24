import express from 'express';
import { moviesRoutes } from './routes';

// Construct pattern
class Application {
    app: express.Application = express();
    port: number | string = process.env.PORT || 3000;

    constructor() {
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {}

    middlewares() {
        this.app.use(express.json()); // app understands json
        this.app.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use('/movies', moviesRoutes);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(
                `Example app listening at http://localhost:${this.port}`
            );
        });
    }
}

export const app = new Application();
