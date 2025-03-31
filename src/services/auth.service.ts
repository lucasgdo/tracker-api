import { loginDto } from "#dtos/loginDto.js";
import { registerDto } from "#dtos/registerDto.js";
import userService from "./user.service.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET ?? "default_secret_key";

class AuthService {
    async register(user: registerDto) {
        const existingEmail = await userService.findByEmail(user.email);
        if (existingEmail) throw new Error("E-mail already registered");

        const existingUsername = await userService.findByUsername(
            user.username,
        );
        if (existingUsername) throw new Error("Username already taken");

        await userService.save(user);

        return { message: "User registered suscessfully" };
    }

    async login(credentials: loginDto) {
        const user = await userService.findByEmail(credentials.email);
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await user.verifyPassword(credentials.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: "1h",
        });

        return { token };
    }

    verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
        } catch (error) {
            console.error(error);
            throw new Error("Invalid token");
        }
    }
}

export default new AuthService();
