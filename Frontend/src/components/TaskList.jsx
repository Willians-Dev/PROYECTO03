import { useState, useEffect } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:4322/api/tasks");
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      const data = await response.json();
      console.log("Tareas recibidas del backend:", data);
      setTasks(data); // Actualiza el estado con las tareas recibidas
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Estado de tareas después de setTasks:", tasks); // <-- Verifica si el estado se actualiza
  }, [tasks]); // Este useEffect se dispara cada vez que `tasks` se actualiza

  const calculateTimeLeft = (dueDate) => {
    const difference = new Date(dueDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return timeLeft;
  };

  const getRelevanciaText = (relevancia_id) => {
    switch (relevancia_id) {
      case 1:
        return "Alta";
      case 2:
        return "Media";
      case 3:
        return "Baja";
      default:
        return "Desconocida";
    }
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded shadow-lg border border-purple-900 mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-purple-900">
        Tareas Pendientes
      </h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600">
          No hay tareas pendientes. <br /> Ingrese una tarea para empezar
        </p>
      ) : (
        <ul>
          {tasks.map((task, index) => {
            const taskDetails = task.creartareas;
            if (!taskDetails) return null;
            const timeLeft = calculateTimeLeft(taskDetails.fecha_entrega);
            const relevanciaText = getRelevanciaText(taskDetails.relevancia_id);

            return (
              <li key={index} className="mb-4 p-4 border rounded shadow-sm">
                <h3 className="font-semibold text-purple-900">
                  {taskDetails.materia}
                </h3>
                <p>
                  <strong>Descripción:</strong> {taskDetails.descripcion}
                </p>
                <p>
                  <strong>Relevancia:</strong> {relevanciaText}
                </p>
                <p>
                  <strong>Entrega:</strong> {taskDetails.fecha_entrega}
                </p>
                <p>
                  <strong>Recordatorio:</strong>{" "}
                  {`${timeLeft.days} días, ${timeLeft.hours} horas, ${timeLeft.minutes} minutos`}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
