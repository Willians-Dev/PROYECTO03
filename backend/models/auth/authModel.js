// models/authModel.js
import supabase from "../../config/supabaseClient.js";

export const signInUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message || "Error al iniciar sesión");
  }

  const user = data.user;

  if (!user) {
    throw new Error("No se pudo obtener la información del usuario");
  }
  console.log("Usuario:", user);

  return { user, session: data.session };
};

export const getUserRole = async (userId) => {
  const { data: userData, error } = await supabase
    .from("usuarios")
    .select("perfil_id")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message || "Error al obtener el rol del usuario");
  }
  console.log("Rol del usuario:", userData.perfil_id);
  return userData.perfil_id;
};
