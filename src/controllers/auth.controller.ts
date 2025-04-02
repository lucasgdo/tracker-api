import { LoginDto } from "#dtos/login.dto.js";
import { RegisterDto } from "#dtos/register.dto.js";
import { Request, Response } from "express";
import authService from "#services/auth.service.js";
import userService from "#services/user.service.js";

class AuthController {
    register = async (req: Request, res: Response) => {
        const { username, email, password } = req.body as RegisterDto;

        try {
            const response = await userService.save({
                username,
                email,
                password,
            });
            res.status(201).json(response);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "",
            });
        }
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body as LoginDto;

        try {
            const response = await authService.login({ email, password });
            res.json(response);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "",
            });
        }
    };
}

export default new AuthController();
