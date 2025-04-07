import { CreateMovieDto } from "../dtos/createMovie.dto.js";
import { Request, Response } from "express";
import movieService from "../services/movie.service.js";

class MovieController {
    findAll = async (req: Request, res: Response) => {
        try {
            const movies = await movieService.findAll();
            res.json(movies);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "",
            });
        }
    };

    findById = async (req: Request, res: Response) => {
        const movieId = req.params.id;
        try {
            const movie = await movieService.findById(movieId);
            res.json(movie);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "",
            });
        }
    };

    searchById = async (req: Request, res: Response) => {
        const movieId = req.params.id;
        try {
            const movie = await movieService.searchById(movieId);
            res.json(movie);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "",
            });
        }
    };

    searchByTitle = async (req: Request, res: Response) => {
        const title = req.query.title as string;
        const page = (req.query.page as string)
            ? (req.query.page as string)
            : "1";

        if (!title) {
            res.status(400).json({ message: "Title is required" });
        } else {
            try {
                const movies = await movieService.searchByTitle(title, page);
                res.json(movies);
            } catch (error) {
                res.status(400).json({
                    message: error instanceof Error ? error.message : "",
                });
            }
        }
    };

    searchPopular = async (req: Request, res: Response) => {
        const page = (req.query.page as string)
            ? (req.query.page as string)
            : "1";

        try {
            const movies = await movieService.searchPopular(page);
            res.json(movies);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "",
            });
        }
    };

    save = async (req: Request, res: Response) => {
        try {
            const response = await movieService.save(
                req.body as CreateMovieDto,
            );
            res.status(201).json(response);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "",
            });
        }
    };
}

export default new MovieController();
