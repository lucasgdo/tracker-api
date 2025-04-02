import { RegisterDto } from "#dtos/register.dto.js";
import { userRepository } from "#repositories/user.repository.js";

class UserService {
    async findById(id: string) {
        const user = await userRepository.findOne({
            where: { id },
            relations: ["watchlists"],
        });
        if (!user) throw new Error("User not found");

        return user;
    }

    async findByEmail(email: string) {
        const user = await userRepository.findOneBy({ email });
        if (!user) throw new Error("User not found");

        return user;
    }

    async findByUsername(username: string) {
        const user = await userRepository.findOneBy({ username });
        if (!user) throw new Error("User not found");

        return user;
    }

    async save(user: RegisterDto) {
        try {
            await this.findByEmail(user.email);
            throw new Error("E-mail already registered");
        } catch (error) {
            if (error instanceof Error) {
                if (error.message !== "User not found") {
                    throw error;
                }
            }
        }

        try {
            await this.findByUsername(user.username);
            throw new Error("Username already taken");
        } catch (error) {
            if (error instanceof Error) {
                if (error.message !== "User not found") {
                    throw error;
                }
            }
        }

        const createdUser = userRepository.create(user);

        return await userRepository.save(createdUser);
    }
}

export default new UserService();
