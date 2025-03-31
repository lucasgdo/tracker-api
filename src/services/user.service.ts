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
}

export default new UserService();
