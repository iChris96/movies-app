import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('hello world');
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
