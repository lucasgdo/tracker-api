import { AddMovieToWatchlistDto } from "../dtos/addMovieToWatchlist.dto.js";
import { CreateWatchlistDto } from "../dtos/createWatchlist.dto.js";
import { watchlistRepository } from "../repositories/watchlist.repository.js";
import movieService from "./movie.service.js";
import userService from "./user.service.js";

class WatchlistService {
    async findById(id: string) {
        const watchlist = await watchlistRepository.findOne({
            where: { id },
            relations: ["user", "movies"],
        });
        if (!watchlist) throw new Error("Watchlist not found");

        return watchlist;
    }

    async save({ name }: CreateWatchlistDto, userId: string) {
        const user = await userService.findById(userId);
        const createdWatchlist = watchlistRepository.create({ name, user });

        return await watchlistRepository.save(createdWatchlist);
    }

    async addMovie(
        watchlistId: string,
        { movieId }: AddMovieToWatchlistDto,
        userId: string,
    ) {
        const watchlist = await this.findById(watchlistId);

        const user = await userService.findById(userId);
        if (watchlist.user.id !== user.id) {
            throw new Error("Unauthorized action");
        }

        const movie = await movieService.findById(movieId);

        if (watchlist.movies.some((m) => m.id === movieId)) {
            throw new Error("Movie already in this watchlist");
        }

        watchlist.movies.push(movie);

        return await watchlistRepository.save(watchlist);
    }

    async removeMovie(watchlistId: string, movieId: string, userId: string) {
        const watchlist = await this.findById(watchlistId);

        const user = await userService.findById(userId);
        if (watchlist.user.id !== user.id) {
            throw new Error("Unauthorized action");
        }

        const movie = await movieService.findById(movieId);

        if (!watchlist.movies.some((m) => m.id === movie.id)) {
            throw new Error("Movie is not in this watchlist");
        }

        watchlist.movies = watchlist.movies.filter((m) => m.id !== movie.id);

        return await watchlistRepository.save(watchlist);
    }
}

export default new WatchlistService();
