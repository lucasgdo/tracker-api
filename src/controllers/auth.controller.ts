import { loginDto } from "#dtos/loginDto.js";
import { registerDto } from "#dtos/registerDto.js";
import authService from "#services/auth.service.js";
import { Request, Response } from "express";

class AuthController {
  register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body as registerDto;

    try {
      const response = await authService.register({
        username,
        email,
        password,
      });
      res.status(201).json(response);
    } catch (error) {
      res
        .status(400)
        .json({ message: error instanceof Error ? error.message : "" });
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body as loginDto;

    try {
      const response = await authService.login({ email, password });
      res.json(response);
    } catch (error) {
      res
        .status(400)
        .json({ message: error instanceof Error ? error.message : "" });
    }
  };
}

export default new AuthController();
