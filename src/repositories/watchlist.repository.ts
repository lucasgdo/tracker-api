import { AppDataSource } from "../data-source.js";
import { Watchlist } from "../entities/watchlist.entity.js";
import { Repository } from "typeorm";

export const watchlistRepository: Repository<Watchlist> =
    AppDataSource.getRepository(Watchlist);
