import bodyParser from 'body-parser'
import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors'


const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
