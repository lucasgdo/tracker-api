import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm";
import { User } from "./user.entity.js";
import { Movie } from "./movie.entity.js";

@Entity("watchlists")
export class Watchlist {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    name!: string;

    @ManyToOne(() => User, (user) => user.watchlists)
    user!: Relation<User>;

    @ManyToMany(() => Movie, (movie) => movie.watchlists)
    @JoinTable({ name: "watchlist_movie " })
    movies!: Relation<Movie>[];
}
