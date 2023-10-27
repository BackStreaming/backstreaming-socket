import express from 'express'
// import https from 'https'
import http from 'http'
import fs from 'fs'

import { Server } from 'socket.io'
import path from 'path'

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("hello I am SSL Server !");
});

app.get('/.well-known/pki-validation/C99DBD23517DF0AB8C8883143D35D322.txt', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "cert", "C99DBD23517DF0AB8C8883143D35D322.txt"))
})

const serverHttp = http.createServer(app);

const io = new Server(serverHttp)

export { io, serverHttp } 