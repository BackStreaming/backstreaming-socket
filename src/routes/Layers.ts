import express from "express";

import { ConfirmAuth } from "../middlewares/ConfirmAuth";
import { LayerController } from "../controllers/LayersControllers/Layers";

const confirmAuth = new ConfirmAuth()
const layerController = new LayerController()

const LayersRoute = express.Router()

LayersRoute.get("/", confirmAuth.tokenVerify, layerController.publicLayers);
LayersRoute.post("/create", confirmAuth.tokenVerify, layerController.createLayers);

export { LayersRoute };
