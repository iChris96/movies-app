import express, { Request, Response } from 'express';
import cors from 'cors';
import connect from './database';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connect();

app.get('/', (req: Request, res: Response) => {
    res.send('hello world');
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
