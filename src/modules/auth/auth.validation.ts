import { NextFunction, Request, Response } from "express";

const authenticateUser = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const loginCreadiencial =  req.body;
        if(!loginCreadiencial.usernameOrEmail && !loginCreadiencial.password){
            res.status(401).json({
                message: "user data missing ",
                data: loginCreadiencial
            })
        }
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: error });
    }
};


export const middelwareAuth = {
    authenticateUser
}
