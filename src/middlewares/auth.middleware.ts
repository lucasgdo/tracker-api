import authService from "#services/auth.service.js";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied " });
    return;
  }

  try {
    const decodedUser = authService.verifyToken(token);
    req.user = decodedUser;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: error instanceof Error ? error.message : "" });
    return;
  }
}
