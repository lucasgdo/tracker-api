import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import userService from "../services/user.service.js";

class UserController {
    findById = async (req: Request, res: Response) => {
        const userId = req.params.id;
        const currentUser = req.user as JwtPayload;

        if (currentUser.id !== userId) {
            res.status(400).json({ message: "Unauthorized action" });
        } else {
            try {
                const user = await userService.findById(userId);
                res.json(user);
            } catch (error) {
                res.status(400).json({
                    message: error instanceof Error ? error.message : "",
                });
            }
        }
    };
}

export default new UserController();
