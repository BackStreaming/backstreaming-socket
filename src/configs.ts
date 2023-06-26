import express  from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { userRouter } from './routes/user'

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter)

const serverHttp = http.createServer(app)

const io = new Server(serverHttp)

export { io, serverHttp }
