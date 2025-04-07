import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity.js";
import { Movie } from "./entities/movie.entity.js";
import { Watchlist } from "./entities/watchlist.entity.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Movie, Watchlist],
});
