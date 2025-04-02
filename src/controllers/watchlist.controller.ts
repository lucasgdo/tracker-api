import { AddMovieToWatchlistDto } from "#dtos/addMovieToWatchlist.dto.js";
import { CreateWatchlistDto } from "#dtos/createWatchlist.dto.js";
import watchlistService from "#services/watchlist.service.js";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

class WatchlistController {
    save = async (req: Request, res: Response) => {
        const { name } = req.body as CreateWatchlistDto;
        const userId = (req.user as JwtPayload).id as string;

        try {
            const createdWatchlist = await watchlistService.save(
                { name },
                userId,
            );
            res.status(201).json(createdWatchlist);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "",
            });
        }
    };

    addMovie = async (req: Request, res: Response) => {
        const watchlistId = req.params.watchlistId;
        const { movieId } = req.body as AddMovieToWatchlistDto;
        const userId = (req.user as JwtPayload).id as string;

        try {
            const updatedWatchlist = await watchlistService.addMovie(
                watchlistId,
                { movieId },
                userId,
            );
            res.json(updatedWatchlist);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "",
            });
        }
    };

    removeMovie = async (req: Request, res: Response) => {
        const watchlistId = req.params.watchlistId;
        const movieId = req.params.movieId;
        const userId = (req.user as JwtPayload).id as string;

        try {
            const updatedWatchlist = await watchlistService.removeMovie(
                watchlistId,
                movieId,
                userId,
            );
            res.json(updatedWatchlist);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "",
            });
        }
    };
}

export default new WatchlistController();
