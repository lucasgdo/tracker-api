import { AppDataSource } from "../data-source.js";
import { Movie } from "../entities/movie.entity.js";
import { Repository } from "typeorm";

export const movieRepository: Repository<Movie> =
    AppDataSource.getRepository(Movie);
