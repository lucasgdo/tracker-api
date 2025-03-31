import userController from "#controllers/user.controller.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/:id", authMiddleware, userController.findById);

export default userRoutes;
