import express from "express";
import { getGenres } from "../controllers/genresController.js";

const routerGenres = express.Router();
routerGenres.get("/genres", getGenres);

export default routerGenres;
