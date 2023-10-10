import express from "express";
import morgan from "morgan";
import initAPIRoutes from "./src/router/api.js";


const app = express()
const port = 3000

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initAPIRoutes(app);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`app run in : http://localhost:${port}/`);
})