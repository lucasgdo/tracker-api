import userController from "#controllers/user.controller.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";
import { validateUUID } from "#middlewares/validation.middleware.js";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get(
    "/:id",
    authMiddleware,
    validateUUID("id"),
    userController.findById,
);

export default userRoutes;
