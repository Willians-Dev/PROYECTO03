import supabase from "../config/supabaseClient.js";

// Función para obtener todos los usuarios
export const getAllUsers = async () => {
  const { data, error } = await supabase.from("usuarios").select(`
    id,
    nombre,
    apellido,
    email,
    perfil_id,
    genero_id,
    nickname,
    generos (genero_id, descripcion_genero),
    perfiles (id, tipo, descripcion)
  `);

  if (error) {
    throw error;
  }

  return data;
};

// Función para obtener un usuario por ID
export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select(
      `
      id,
      nombre,
      apellido,
      nickname,
      email,
      perfil_id,
      perfiles (id, tipo, descripcion)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Función para crear un nuevo usuario con contraseña hasheada
export const createUser = async ({
  nombre,
  apellido,
  nickname,
  email,
  password,
  genero_id,
}) => {
  try {
    // Intentar registrar el usuario con Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    const user = data.user;
    const perfil_id = 2; // Asignar un perfil_id por defecto

    // Insertar los datos adicionales del usuario en la tabla 'usuarios'
    const { error: dbError } = await supabase
      .from("usuarios")
      .insert([
        {
          id: user?.id,
          nombre,
          apellido,
          nickname,
          email,
          genero_id,
          perfil_id,
        },
      ]);

    if (dbError) {
      throw new Error(dbError.message);
    }

    return { message: "Usuario registrado con éxito" };
  } catch (err) {
    throw new Error(err.message);
  }
};

// Función para actualizar un usuario existente
export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from("usuarios")
    .update(updates)
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// Función para eliminar un usuario
export const deleteUser = async (id) => {
  const { data, error } = await supabase.from("usuarios").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// Función para obtener un usuario por correo electrónico
export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Función para iniciar sesión de usuario
export const loginUser = async (email, contrasena) => {
  const { data: user, error } = await supabase
    .from("usuarios")
    .select("id, contrasena")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("Usuario no encontrado o error en la consulta");
  }

  // Verificar la contraseña usando la función RPC
  const { data: isValid, error: verifyError } = await supabase.rpc(
    "verify_password",
    {
      password: contrasena,
      hashed_password: user.contrasena,
    }
  );

  if (verifyError) {
    throw verifyError;
  }

  return isValid;
};
