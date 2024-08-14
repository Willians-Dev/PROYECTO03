import express from "express";
import TaskController from "../controllers/taskController.js";

const router = express.Router();

router.post("/tasks/create", TaskController.createTask);

// Ruta para obtener todas las tareas o filtrar por usuario_id como parámetro de consulta
router.get("/tasks", TaskController.getTasks);

// Ruta para obtener tareas por id de usuario
router.get("/tasks/user/:id", TaskController.getTasksByUserId);

export default router;
