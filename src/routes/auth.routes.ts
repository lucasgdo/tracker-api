import authController from "#controllers/auth.controller.js";
import { loginDto } from "#dtos/loginDto.js";
import { registerDto } from "#dtos/registerDto.js";
import { validateDTO } from "#middlewares/validation.middleware.js";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/register", validateDTO(registerDto), authController.register);
authRoutes.post("/login", validateDTO(loginDto), authController.login);

export default authRoutes;
