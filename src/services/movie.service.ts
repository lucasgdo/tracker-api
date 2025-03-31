import { Movie } from "#entities/movie.entity.js";
import { movieRepository } from "#repositories/movie.repository.js";

class MovieService {
    async findAll() {
        return movieRepository.find();
    }

    async findbyId(id: string) {
        return await movieRepository.findOneBy({ id });
    }

    async findByTitle(title: string) {
        return await movieRepository.findOneBy({ title });
    }

    async findByTmdbId(tmdbId: string) {
        return await movieRepository.findOneBy({ tmdbId });
    }

    async save(movie: Partial<Movie>) {
        const createdMovie = movieRepository.create(movie);
        return await movieRepository.save(createdMovie);
    }
}

export default new MovieService();
