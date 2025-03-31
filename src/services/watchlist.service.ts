import { watchlistRepository } from "#repositories/watchlist.repository.js";
import movieService from "./movie.service.js";
import userService from "./user.service.js";

class WatchlistService {
    async findById(id: string) {
        return await watchlistRepository.findOne({
            where: { id },
            relations: ["user", "movies"],
        });
    }

    async save(name: string, userId: string) {
        const user = await userService.findById(userId);
        if (!user) throw new Error("User not found");

        const createdWatchlist = watchlistRepository.create({ name, user });
        return await watchlistRepository.save(createdWatchlist);
    }

    async addMovie(watchlistId: string, movieId: string, userId: string) {
        const watchlist = await this.findById(watchlistId);
        if (!watchlist) throw new Error("Watchlist not found");

        const user = await userService.findById(userId);
        if (!user) {
            throw new Error("User not found");
        } else {
            if (watchlist.user.id !== user.id) {
                throw new Error("Unauthorized action");
            }
        }

        const movie = await movieService.findById(movieId);
        if (!movie) throw new Error("Movie not found");

        if (watchlist.movies.some((m) => m.id === movieId)) {
            throw new Error("Movie already in this watchlist");
        }

        watchlist.movies.push(movie);
        return await watchlistRepository.save(watchlist);
    }

    async removeMovie(watchlistId: string, movieId: string, userId: string) {
        const watchlist = await this.findById(watchlistId);
        if (!watchlist) throw new Error("watchlist not found");

        const user = await userService.findById(userId);
        if (!user) {
            throw new Error("User not found");
        } else {
            if (watchlist.user.id !== user.id) {
                throw new Error("Unauthorized action");
            }
        }

        const movie = await movieService.findById(movieId);
        if (!movie) throw new Error("Movie not found");

        if (!watchlist.movies.some((m) => m.id === movieId)) {
            throw new Error("Movie is not in this watchlist");
        }

        watchlist.movies = watchlist.movies.filter((m) => m.id !== movieId);

        return await watchlistRepository.save(watchlist);
    }
}

export default new WatchlistService();
