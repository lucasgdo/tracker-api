import watchlistController from "#controllers/watchlist.controller.js";
import { AddMovieToWatchlistDto } from "#dtos/addMovieToWatchlist.dto.js";
import { CreateWatchlistDto } from "#dtos/createWatchlist.dto.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";
import {
    validateDTO,
    validateUUID,
} from "#middlewares/validation.middleware.js";
import { Router } from "express";

const watchlistRoutes = Router();

watchlistRoutes.post(
    "/",
    authMiddleware,
    validateDTO(CreateWatchlistDto),
    watchlistController.save,
);

watchlistRoutes.post(
    "/:watchlistId/movies",
    authMiddleware,
    validateUUID("watchlistId"),
    validateDTO(AddMovieToWatchlistDto),
    watchlistController.addMovie,
);

watchlistRoutes.delete(
    "/:watchlistId/movies/:movieId",
    authMiddleware,
    validateUUID("watchlistId"),
    validateUUID("movieId"),
    watchlistController.removeMovie,
);

export default watchlistRoutes;
