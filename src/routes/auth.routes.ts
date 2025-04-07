import authController from "../controllers/auth.controller.js";
import { LoginDto } from "../dtos/login.dto.js";
import { RegisterDto } from "../dtos/register.dto.js";
import { validateDTO } from "../middlewares/validation.middleware.js";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/register", validateDTO(RegisterDto), authController.register);
authRoutes.post("/login", validateDTO(LoginDto), authController.login);

export default authRoutes;
