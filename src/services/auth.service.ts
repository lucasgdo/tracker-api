import { LoginDto } from "#dtos/login.dto.js";
import userService from "./user.service.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET ?? "default_secret_key";

class AuthService {
    async login(credentials: LoginDto) {
        try {
            const user = await userService.findByEmail(credentials.email);
            const isMatch = await user.verifyPassword(credentials.password);
            if (!isMatch) throw new Error();
            const token = jwt.sign(
                { id: user.id, email: user.email },
                SECRET_KEY,
                {
                    expiresIn: "1h",
                },
            );
            return { token };
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Invalid credentials");
            }
        }
    }

    verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Invalid token");
            }
        }
    }
}

export default new AuthService();
