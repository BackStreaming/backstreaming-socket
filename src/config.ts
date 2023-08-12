import express from 'express'
import https from 'https'
import fs from 'fs'
import path from 'path';

import { Server } from 'socket.io'

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  res.send("hello I am SSL Server !");
});

const options = {
  key: fs.readFileSync(path.join(__dirname, "../cert/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../cert/cert.pem")),
};

const serverHttp = https.createServer(options, app);


const io = new Server(serverHttp)

export { io, serverHttp }