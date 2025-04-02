import movieController from "#controllers/movie.controller.js";
import { CreateMovieDto } from "#dtos/createMovie.dto.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";
import {
    validateDTO,
    validateUUID,
} from "#middlewares/validation.middleware.js";
import { Router } from "express";

const movieRoutes = Router();

movieRoutes.get("/", movieController.findAll);
movieRoutes.get("/search-popular", movieController.searchPopular);
movieRoutes.get("/search-by-title", movieController.searchByTitle);
movieRoutes.get(
    "/search-by-id/:id",
    validateUUID("id"),
    movieController.searchById,
);
movieRoutes.get("/:id", validateUUID("id"), movieController.findById);
movieRoutes.post(
    "/",
    authMiddleware,
    validateDTO(CreateMovieDto),
    movieController.save,
);

export default movieRoutes;
