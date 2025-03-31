import { User } from "#entities/user.entity.js";
import { UserRepository } from "#repositories/user.repository.js";

class UserService {
  async findById(id: string) {
    return await UserRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await UserRepository.findOneBy({ email });
  }

  async findByUsername(username: string) {
    return await UserRepository.findOneBy({ username });
  }

  async save(user: Partial<User>) {
    const createdUser = UserRepository.create(user);
    return await UserRepository.save(createdUser);
  }
}

export default new UserService();
