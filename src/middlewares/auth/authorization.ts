import { NextFunction, Request, Response } from "express";

const authorizationUser = (requiredRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const userRole = req.user?.role;

        if (!userRole || !requiredRoles.includes(userRole)) {
            res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            return;
        }

        next();
    };
};

export default authorizationUser;
