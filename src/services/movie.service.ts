import { CreateMovieDto } from "../dtos/createMovie.dto.js";
import { TmdbResponse } from "../interfaces/tmdbResponse.interface.js";
import { movieRepository } from "../repositories/movie.repository.js";

const TMDB_API_URL = process.env.TMDB_API_URL ?? "";
const TMDB_API_KEY = process.env.TMDB_API_KEY ?? "";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
    },
};

class MovieService {
    async findAll() {
        return movieRepository.find();
    }

    async findById(id: string) {
        const movie = await movieRepository.findOneBy({ id });
        if (!movie) throw new Error("Movie not found");

        return movie;
    }

    async searchById(id: string) {
        const movie = await movieRepository.findOneBy({ id });
        if (!movie) throw new Error("Movie not found");

        const response = await fetch(
            `${TMDB_API_URL}/movie/${encodeURIComponent(movie.tmdbId)}`,
            options,
        )
            .then(async (res) => await res.json())
            .then((json) => {
                return json;
            })
            .catch(() => {
                throw new Error("Movie not found");
            });

        return response;
    }

    async findByTitle(title: string) {
        const movie = await movieRepository.findOneBy({ title });
        if (!movie) throw new Error("Movie not found");

        return movie;
    }

    async findByTmdbId(tmdbId: string) {
        const movie = await movieRepository.findOneBy({ tmdbId });
        if (!movie) throw new Error("Movie not found");

        return movie;
    }

    async searchByTitle(title: string, page: string) {
        const movies = await fetch(
            `${TMDB_API_URL}/search/movie?query=${encodeURIComponent(title)}&page=${encodeURIComponent(page)}`,
            options,
        )
            .then(async (res) => await res.json())
            .then(async (json) => {
                const movies = (json as TmdbResponse).results;
                const existingMovies = await movieRepository.find({
                    where: movies.map((movie) => ({
                        tmdbId: String(movie.id),
                    })),
                    select: ["id", "tmdbId"],
                });

                const existingMoviesMap = new Map(
                    existingMovies.map((movie) => [movie.tmdbId, movie.id]),
                );

                const newMovies = movies.filter(
                    (movie) => !existingMoviesMap.has(String(movie.id)),
                );

                if (newMovies.length > 0) {
                    const savedMovies = await movieRepository.save(
                        newMovies.map((movie) =>
                            movieRepository.create({
                                title: movie.title,
                                tmdbId: String(movie.id),
                            }),
                        ),
                    );

                    savedMovies.forEach((movie) => {
                        existingMoviesMap.set(movie.tmdbId, movie.id);
                    });
                }

                const transformedMovies = movies.map((movie) => ({
                    ...movie,
                    tmdbId: movie.id,
                    id: existingMoviesMap.get(String(movie.id)) ?? null,
                }));

                return transformedMovies;
            })
            .catch(() => {
                throw new Error("Movie not found");
            });

        return movies;
    }

    async searchPopular(page: string) {
        const movies = await fetch(
            `${TMDB_API_URL}/movie/popular?page=${encodeURIComponent(page)}`,
            options,
        )
            .then(async (res) => await res.json())
            .then(async (json) => {
                const movies = (json as TmdbResponse).results;

                const existingMovies = await movieRepository.find({
                    where: movies.map((movie) => ({
                        tmdbId: String(movie.id),
                    })),
                    select: ["id", "tmdbId"],
                });

                const existingMoviesMap = new Map(
                    existingMovies.map((movie) => [movie.tmdbId, movie.id]),
                );

                const newMovies = movies.filter(
                    (movie) => !existingMoviesMap.has(String(movie.id)),
                );

                if (newMovies.length > 0) {
                    const savedMovies = await movieRepository.save(
                        newMovies.map((movie) =>
                            movieRepository.create({
                                title: movie.title,
                                tmdbId: String(movie.id),
                            }),
                        ),
                    );

                    savedMovies.forEach((movie) => {
                        existingMoviesMap.set(movie.tmdbId, movie.id);
                    });
                }

                const transformedMovies = movies.map((movie) => ({
                    ...movie,
                    tmdbId: movie.id,
                    id: existingMoviesMap.get(String(movie.id)) ?? null,
                }));

                return transformedMovies;
            })
            .catch(() => {
                throw new Error("Movie not found");
            });

        return movies;
    }

    async save(movie: CreateMovieDto) {
        try {
            await this.findByTmdbId(movie.tmdbId);
            throw new Error("Movie already exists");
        } catch (error) {
            if (error instanceof Error) {
                if (error.message !== "Movie not found") {
                    throw error;
                }
            }
        }

        const createdMovie = movieRepository.create(movie);
        return await movieRepository.save(createdMovie);
    }
}

export default new MovieService();
