import { IsNotEmpty, IsString } from "class-validator";

export class createMovieDto {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsString()
    tmdbId!: string;
}
