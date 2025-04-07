import { AppDataSource } from "../data-source.js";
import { User } from "../entities/user.entity.js";
import { Repository } from "typeorm";

export const userRepository: Repository<User> =
    AppDataSource.getRepository(User);
