import express from 'express'
import https from 'https'
import fs from 'fs'

import { Server } from 'socket.io'

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("hello I am SSL Server !");
});

app.get('/.well-known/pki-validation/F3215C3C19A6EDAA07D8F706CCB8AB51.txt', (req, res) => {
  res.sendFile(`C:/Users/Apollo/www/backend/backstreaming-socket/cert/F3215C3C19A6EDAA07D8F706CCB8AB51.txt`)
})

const serverHttp = https.createServer({
  cert: fs.readFileSync('C:/Users/Apollo/www/backend/backstreaming-socket/cert/certificate.crt'),
  key: fs.readFileSync('C:/Users/Apollo/www/backend/backstreaming-socket/cert/private.key')
}, app);

const io = new Server(serverHttp)

export { io, serverHttp } 