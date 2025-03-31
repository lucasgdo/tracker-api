import userController from "#controllers/user.controller.js";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/:id", userController.findById);

export default userRoutes;
