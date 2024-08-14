import express from "express";
import * as userController from "../controllers/userController.js";
import * as authController from "../controllers/authController.js"; // Importar authController
import { getUserProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/new_users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser); // Usar el controlador de auth para login
router.get("/me", verifyToken, getUserProfile);

export default router;
