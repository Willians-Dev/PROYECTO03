import supabase from "../config/supabaseClient.js";

class TaskModel {
  static async createTask(taskData) {
    const { data, error } = await supabase.from("creartareas").insert([
      {
        tipo_tarea: taskData.tipo_tarea,
        materia: taskData.materia,
        descripcion: taskData.descripcion,
        relevancia_id: taskData.relevancia,
        fecha_entrega: taskData.entrega,
        estimacion_intervalo: `PT${taskData.estimacion}M`,
        usuario_id: taskData.usuario_id, // Verifica que el usuario_id se pase correctamente
      },
    ]);
    if (error) throw error;
    return data;
  }

  static async getAllTasks(usuario_id) {
    let query = supabase
      .from("listatareas")
      .select(
        "*, creartareas!inner(tipo_tarea, materia, descripcion, relevancia_id, fecha_entrega)"
      )
      .order("fecha_creacion", { ascending: false });

    if (usuario_id) {
      query = query.eq("creartareas.usuario_id", usuario_id); // Filtrar por usuario_id si está presente
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  // Nueva función para obtener tareas por ID de usuario
  static async getTasksByUserId(id) {
    const { data, error } = await supabase
      .from("listatareas")
      .select(
        "*, creartareas!inner(tipo_tarea, materia, descripcion, relevancia_id, fecha_entrega)"
      )
      .eq("creartareas.usuario_id", id) // Filtrar por id de usuario
      .order("fecha_creacion", { ascending: false });

    if (error) throw error;
    return data;
  }
}

export default TaskModel;
