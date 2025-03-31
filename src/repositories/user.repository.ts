import { AppDataSource } from "#data-source.js";
import { User } from "#entities/user.entity.js";

export const UserRepository = AppDataSource.getRepository(User);
