import { createMovieDto } from "#dtos/createMovieDto.js";
import movieService from "#services/movie.service.js";
import { Request, Response } from "express";

class MovieController {
    findAll = async (req: Request, res: Response) => {
        const movies = await movieService.findAll();
        res.json(movies);
    };

    findById = async (req: Request, res: Response) => {
        const movieId = req.params.id;
        const movie = await movieService.findbyId(movieId);
        res.json(movie);
    };

    save = async (req: Request, res: Response) => {
        const { title, tmdbId } = req.body as createMovieDto;

        try {
            const response = await movieService.save({ title, tmdbId });
            res.status(201).json(response);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "",
            });
        }
    };
}

export default new MovieController();
