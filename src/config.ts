import express from 'express'
import http from 'http'
import fs from 'fs'

import cors from "cors"

import { Server } from 'socket.io'
import path from 'path'

const app = express()

app.use(cors({
  origin: "*"
}))

// Plugins:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes:
app.get("/", (req, res, next) => {
  res.send("hello I am SSL Server !");
});

app.get('/.well-known/pki-validation/006E27E2F9275C255F1587734F069BB5.txt', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "cert", "006E27E2F9275C255F1587734F069BB5.txt"))
})

// Server HTTPS:
const serverHttp = http.createServer({
  // cert: fs.readFileSync(path.join(__dirname, "..", "cert", "certificate.crt")),
  // key: fs.readFileSync(path.join(__dirname, "..", "cert", "private.key"))
}, app);

// Socket connection:
const io = new Server(serverHttp)

export { io, serverHttp } 