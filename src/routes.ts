import authRoutes from "#routes/auth.routes.js";
import movieRoutes from "#routes/movie.routes.js";
import userRoutes from "#routes/user.routes.js";
import { Router } from "express";

const routes = Router();

routes.use("/movies", movieRoutes);
routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);

export default routes;
