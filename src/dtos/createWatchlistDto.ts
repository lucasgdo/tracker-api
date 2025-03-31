import { IsNotEmpty, IsString } from "class-validator";

export class createWatchlistDto {
    @IsNotEmpty()
    @IsString()
    name!: string;
}
