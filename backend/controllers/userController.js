import * as userModel from "../models/userModel.js";
import supabase from "../config/supabaseClient.js";
import UserRegister from "../schema/userRegister.js";

// Controlador para obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    let { nombre, apellido, nickname, genero_id, email } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !apellido || !nickname || !email || !contraseña) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Asignar un género predeterminado si genero_id está vacío
    if (!genero_id) {
      genero_id = 1; // "Masculino" por defecto
    }

    console.log("Datos recibidos:", req.body);

    // Encriptar la contraseña usando la función RPC en Supabase
    const { data: hashedPassword, error: hashError } = await supabase.rpc(
      "hash_password",
      { password: contrasena }
    );

    if (hashError) {
      console.error("Error en la encriptación:", hashError.message);
      throw new Error(hashError.message);
    }

    // Almacenar la información del usuario en la base de datos
    const { data, error: insertError } = await supabase
      .from("usuarios")
      .insert([
        {
          nombre,
          apellido,
          nickname,
          genero_id,
          email,
          contrasena: hashedPassword,
          perfil_id: 2,
        },
      ]);

    //Almacenando el registro del usuario en mongo db
    const nuevoUsuario = new UserRegister({
      nombre,
      apellido,
      nickname,
      genero_id,
      email,
      contrasena: hashedPassword,
      perfil_id: 2,
    });

    const resultado = await nuevoUsuario.save();
    console.log("Usuario creado en mongoDB:", resultado);

    if (insertError) {
      // Verificar si el error es por duplicado de email o alias
      if (insertError.message.includes("usuarios_email_key")) {
        return res
          .status(400)
          .json({ error: "El correo electrónico ya está en uso." });
      }
      if (insertError.message.includes("usuarios_alias_key")) {
        return res
          .status(400)
          .json({ error: "El nombre de usuario ya está en uso." });
      }

      console.error("Error en la inserción de usuario:", insertError.message);
      throw new Error(insertError.message);
    }
    res.status(201).json(data);
    console.log("Usuario creado correctamente");
    console.log("Usuario creando en mongo DB", resultado);
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    res.status(500).json({ error: error.message });
  }

  //Guardando el registro del usuario en mongo db
};

// Controlador para actualizar un usuario existente
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await userModel.updateUser(id, updates);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await userModel.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // req.userId viene del middleware de autenticación
    const user = await getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};