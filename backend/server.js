import express from "express";
import cors from "cors"; // Importar cors para manejo de políticas de acceso
import router from "./routes/userRoutes.js";
import routerGenres from "./routes/genresRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"; // Importar las rutas de tareas
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 4322; // Definir puerto desde variable de entorno o usar 4322

app.use(
  cors({
    origin: "http://localhost:5173", // Reemplaza con la URL de tu frontend
    credentials: true, // Permitir envío de cookies y credenciales
  })
); // Habilitar CORS para permitir solicitudes desde otros dominios
app.use(express.json()); // Habilitar JSON parsing en el cuerpo de la solicitud

/* Conexión con MongoDB */
async function connect() {
  await mongoose.connect(process.env.MONGODB_CONECCTION_STRING);
  console.log("Connected to MongoDB");
}
connect().catch(console.error);

app.use("/api", router); // Usar las rutas definidas en userRoutes.js
app.use("/api", routerGenres); // Usar las rutas definidas en genresRoutes.js
app.use("/api", taskRoutes); // Usar las rutas definidas en taskRoutes.js
app.use("/api", authRoutes); // Usar las rutas definidas en authRoutes.js

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); // Iniciar servidor en el puerto especificado
