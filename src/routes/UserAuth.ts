import express from 'express';
import { LoginController  } from '../controllers/AuthController/UserAuth'
import { PlaylistController } from "../controllers/UserControllers/PlaylistController";

const loginController = new LoginController()
const playlistController = new PlaylistController()

const UserAuthRoute = express.Router()

UserAuthRoute.post('/auth', loginController.login)

UserAuthRoute.get('/playlist', playlistController.User)


export { UserAuthRoute }