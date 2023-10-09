const express = require('express')
const morgan = require("morgan");
const app = express()
const port = 3000

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`app run in : http://localhost:${port}/`);
})