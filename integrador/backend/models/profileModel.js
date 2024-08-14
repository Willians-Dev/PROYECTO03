import supabase from "../config/supabaseClient.js";

export const getAllPerfiles = async () => {
  const { data, error } = await supabase.from("perfiles").select("*");
  if (error) throw error;
  return data;
};

export const getPerfilById = async (id) => {
  const { data, error } = await supabase.from("perfiles").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
};

export const createPerfil = async (perfil) => {
  const { data, error } = await supabase.from("perfiles").insert([perfil]);
  if (error) throw error;
  return data;
};

export const updatePerfil = async (id, updates) => {
  const { data, error } = await supabase.from("perfiles").update(updates).eq("id", id);
  if (error) throw error;
  return data;
};

export const deletePerfil = async (id) => {
  const { data, error } = await supabase.from("perfiles").delete().eq("id", id);
  if (error) throw error;
  return data;
};