import { IsUUID } from "class-validator";

export class AddMovieToWatchlistDto {
    @IsUUID()
    movieId!: string;
}
