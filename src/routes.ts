import userRoutes from "#routes/user.routes.js";
import { Router } from "express";

const routes = Router();

routes.use("/users", userRoutes);

export default routes;
