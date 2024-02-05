import express from 'express'
import https from 'https'
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

app.get('/.well-known/pki-validation/38AD15B27BF6046063E982536DE98E23.txt', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "cert", "38AD15B27BF6046063E982536DE98E23.txt"))
})

// Server HTTPS:
const serverHttp = https.createServer({
  cert: fs.readFileSync(path.join(__dirname, "..", "cert", "certificate.crt")),
  key: fs.readFileSync(path.join(__dirname, "..", "cert", "private.key"))
}, app);

// Socket connection:
const io = new Server(serverHttp)

export { io, serverHttp } 