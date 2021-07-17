const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
