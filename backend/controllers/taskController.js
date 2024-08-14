import TaskModel from '../models/taskModel.js';

class TaskController {
    static async createTask(req, res) {
        try {
            const newTask = await TaskModel.createTask(req.body);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getTasks(req, res) {
        try {
            const { usuario_id } = req.query; // Obtener el usuario_id de los parámetros de la consulta
            console.log("Solicitud recibida en /api/tasks con usuario_id:", usuario_id);
            
            const tasks = await TaskModel.getAllTasks(usuario_id); // Pasar el usuario_id al modelo
            console.log("Tareas obtenidas:", tasks);
            
            res.status(200).json(tasks);
        } catch (error) {
            console.error("Error al obtener tareas:", error);
            res.status(500).json({ message: error.message });
        }
    }

    // Nueva función para obtener tareas por ID de usuario
    static async getTasksByUserId(req, res) {
        try {
            const { id } = req.params; // Obtener el ID del usuario de los parámetros de la URL
            console.log("Solicitud recibida en /api/tasks/user/:id para id de usuario:", id);
            
            const tasks = await TaskModel.getTasksByUserId(id); // Pasar el id al modelo
            console.log("Tareas obtenidas para el usuario:", tasks);
            
            res.status(200).json(tasks);
        } catch (error) {
            console.error("Error al obtener tareas por usuario:", error);
            res.status(500).json({ message: error.message });
        }
    }
}

export default TaskController;