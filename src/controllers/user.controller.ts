import { Request, Response } from "express";
import userService from "#services/user.service.js";

class UserController {
    findById = async (req: Request, res: Response) => {
        const userId = req.params.id;
        const user = await userService.findById(userId);
        res.json(user);
    };
}

export default new UserController();
