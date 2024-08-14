import * as perfilModel from "../models/profileModel.js";

export const getAllPerfiles = async (req, res) => {
  try {
    const perfiles = await perfilModel.getAllPerfiles();
    res.json(perfiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPerfilById = async (req, res) => {
  const { id } = req.params;
  try {
    const perfil = await perfilModel.getPerfilById(id);
    if (!perfil) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }
    res.json(perfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPerfil = async (req, res) => {
  const perfil = req.body;
  try {
    const newPerfil = await perfilModel.createPerfil(perfil);
    res.status(201).json(newPerfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePerfil = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedPerfil = await perfilModel.updatePerfil(id, updates);
    res.json(updatedPerfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePerfil = async (req, res) => {
  const { id } = req.params;
  try {
    await perfilModel.deletePerfil(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};