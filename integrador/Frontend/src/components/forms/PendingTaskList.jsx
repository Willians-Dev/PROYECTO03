import { useState } from "react";

export default function PendingTasksForm() {
  const [formData, setFormData] = useState({
    tipo_tarea: "",
    materia: "",
    descripcion: "",
    relevancia: "",
    entrega: "",
    estimacion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);

    try {
      const response = await fetch("http://localhost:4322/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Tarea creada exitosamente");
      } else {
        const errorData = await response.json();
        console.error("Error al crear la tarea:", errorData);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="py-4 px-6 border rounded shadow">
        <h2 className="text-lg font-bold">Cuentame $NombreUsr</h2>
        <h2 className="font-extralight">¿Tienes tareas pendientes hoy?</h2>
        <div className="flex gap-2">
          <label htmlFor="tarea_si" className="font-bold">
            <input type="checkbox" id="tarea_si" className="rounded-full" /> Sí
          </label>
          <label htmlFor="tarea_no" className="font-bold">
            <input type="checkbox" id="tarea_no" /> No
          </label>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 py-3 px-6 border mt-2 shadow rounded"
      >
        <div>
          <p className="text-lg">
            <span className="font-bold">Genial!</span>
          </p>
          <p className="text-lg">Cuentame</p>
        </div>
        <div className="flex flex-col shadow-inner border rounded p-1 md:p-1.5 relative text-sm md:text-base mb-2">
          <label htmlFor="tipoTarea" className="block mb-1">
            ¿Qué tipo de tarea es?
          </label>
          <select
            name="tipo_tarea"
            id="tipoTarea"
            value={formData.tipo_tarea}
            onChange={handleChange}
            className="bg-inherit text-neutral-600 focus:outline-none text-sm md:text-base"
          >
            <option value="">Escoge el tipo</option>
            <option value="University">Universidad</option>
            <option value="Work">Trabajo</option>
            <option value="Team-Proyects">Proyectos de Equipo</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="materia" className="">
            ¿Qué materia es?
          </label>
          <input
            type="text"
            id="materia"
            name="materia"
            placeholder="Ingresa la materia"
            value={formData.materia}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500 bg-gray-100"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="descripcion" className="">
            ¿De qué se trata?
          </label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            placeholder="Cuéntame un poco"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500 bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="relevancia" className="block mb-1">
            Relevancia
          </label>
          <select
            id="relevancia"
            name="relevancia"
            value={formData.relevancia}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500 bg-gray-100"
          >
            <option value="">Escoge</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="entrega" className="block mb-1">
            ¿Día de entrega?
          </label>
          <input
            type="date"
            id="entrega"
            name="entrega"
            value={formData.entrega}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-purple-500 bg-gray-100"
          />
        </div>
        <div className="flex flex-col bg-neutral-300 rounded p-1.5 md:p-2 relative text-sm md:text-base">
          <label htmlFor="estimacion" className="block mb-1">
            ¿Cuándo te gustaría que te recordemos esta tarea?
          </label>
          <select
            name="estimacion"
            id="estimacion"
            value={formData.estimacion}
            onChange={handleChange}
            className="bg-inherit text-neutral-600 focus:outline-none text-sm md:text-base"
          >
            <option value="">Escoge el tiempo</option>
            <option value="30">30 minutos</option>
            <option value="60">1 hora</option>
            <option value="90">1 hora 30 minutos</option>
            <option value="120">2 horas</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-purple-700 text-white font-semibold py-2 px-4 rounded mt-4 w-full"
        >
          Guardar Tarea
        </button>
      </form>
    </div>
  );
}
