import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Watchlist } from "./watchlist.entity.js";

@Entity("movies")
export class Movie {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    title!: string;

    @Column({ type: "varchar", unique: true })
    tmdbId!: string;

    @ManyToMany(() => Watchlist, (watchlist) => watchlist.movies)
    watchlists!: Watchlist[];
}
