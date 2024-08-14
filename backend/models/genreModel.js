import supabase from "../config/supabaseClient.js";

async function getAllGenres() {
  const { data, error } = await supabase.from("generos").select("*");

  if (error) {
    throw new Error(error.message); // Lanza el error para manejarlo en el controlador
  }

  return data; // Devuelve los datos al controlador
}

export default { getAllGenres };
