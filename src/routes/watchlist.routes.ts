import watchlistController from "#controllers/watchlist.controller.js";
import { createWatchlistDto } from "#dtos/createWatchlistDto.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";
import { validateDTO } from "#middlewares/validation.middleware.js";
import { Router } from "express";

const watchlistRoutes = Router();

watchlistRoutes.post(
    "/",
    authMiddleware,
    validateDTO(createWatchlistDto),
    watchlistController.save,
);

watchlistRoutes.post(
    "/:watchlistId/movies",
    authMiddleware,
    watchlistController.addMovie,
);

watchlistRoutes.delete(
    "/:watchlistId/movies/:movieId",
    authMiddleware,
    watchlistController.removeMovie,
);

export default watchlistRoutes;
