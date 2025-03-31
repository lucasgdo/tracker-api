import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function validateDTO(dtoClass: ClassConstructor<unknown>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToInstance(dtoClass, req.body);
        await validate(dtoInstance as object).then((errors) => {
            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: errors.map((error) => ({
                        field: error.property,
                        issues: Object.values(error.constraints ?? {}),
                    })),
                });
            } else {
                next();
            }
        });
    };
}
