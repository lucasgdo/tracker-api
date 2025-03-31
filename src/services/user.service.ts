import { User } from "#entities/user.entity.js";
import { userRepository } from "#repositories/user.repository.js";

class UserService {
    async findById(id: string) {
        return await userRepository.findOneBy({ id });
    }

    async findByEmail(email: string) {
        return await userRepository.findOneBy({ email });
    }

    async findByUsername(username: string) {
        return await userRepository.findOneBy({ username });
    }

    async save(user: Partial<User>) {
        const createdUser = userRepository.create(user);
        return await userRepository.save(createdUser);
    }
}

export default new UserService();
