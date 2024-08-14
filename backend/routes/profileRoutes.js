// routes/profileRoutes.js

import express from "express";
import * as profileController from "../controllers/profileController.js";

const router = express.Router();

router.get("/perfiles", profileController.getAllPerfiles);
router.get("/perfiles/:id", profileController.getPerfilById);
router.post("/perfiles", profileController.createPerfil);
router.put("/perfiles/:id", profileController.updatePerfil);
router.delete("/perfiles/:id", profileController.deletePerfil);

export default router;