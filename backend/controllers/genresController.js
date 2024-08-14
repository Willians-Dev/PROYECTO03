import genreModel from "../models/genreModel.js";

async function getGenres(req, res) {
  try {
    const genres = await genreModel.getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getGenres }; // Exporta la función correctamente
