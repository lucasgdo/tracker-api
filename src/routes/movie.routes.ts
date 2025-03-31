import movieController from "#controllers/movie.controller.js";
import { createMovieDto } from "#dtos/createMovieDto.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";
import { validateDTO } from "#middlewares/validation.middleware.js";
import { Router } from "express";

const movieRoutes = Router();

movieRoutes.get("/", movieController.findAll);
movieRoutes.get("/:id", movieController.findById);
movieRoutes.post(
    "/",
    authMiddleware,
    validateDTO(createMovieDto),
    movieController.save,
);

export default movieRoutes;
