import express from "express";
import morgan from "morgan";
import initAPIRoutes from "./src/router/api.js";
import initChatAPIRoutes from "./src/router/chatApi.js";

import http from 'http';
import { Server } from 'socket.io';
import database from './src/utils/dbContext.js';
import cors from 'cors';
import chatSocket from './src/utils/chatSocket.js';

//set up socket
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*"
  }
});
chatSocket(io);

const port = 3000;

app.use(cors());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initAPIRoutes(app);
initChatAPIRoutes(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test/:token', (req, res) => {
  const { decode } = require('./src/utils/jwt.js');
  res.send(decode(req.params.token));
})

async function startSever() {
  await database.connectDb();
  
  server.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
}

startSever();


