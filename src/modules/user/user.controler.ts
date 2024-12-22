import { Request, Response } from "express";
import {  userService } from "./user.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import expressAsyncHandler from "express-async-handler";

// create user 
const createUser = expressAsyncHandler(async (req: Request, res: Response) => {
    try {

        const {user} = req.body;
        console.log(user)
        const result = await userService.userCreateDB(user);
        res.status(200).json({ 
            message: "Successfully Get Data",
            status: 200,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// user get

export const userGet = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        console.log("Token:", token);
        
        if (!token) {
            res.status(401).json({ error: "Unauthorized: No token provided" });
            return;
        }

        const decoded = jwt.verify(token, config.SECRECT_KEY as string) as JwtPayload & { user_Email?: string };
        console.log("Decoded token:", decoded);

        // Check if the decoded token has a user_name property and that it is a string
        const user_Email = decoded.user_Email;
        
        console.log("first",user_Email)
        if (typeof user_Email !== "string") {
            res.status(400).json({ error: "User ID is required" });
            return;
        }

        const user = await userService.userGetDB(user_Email);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// geting all user 

const getingAllUser = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header is present
        if (!authHeader) {
            res.status(401).json({ error: "Unauthorized: No token provided" });
            return;
        }

        // Extract token after 'Bearer '
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({ error: "Unauthorized: Malformed token" });
            return;
        }

        // Verify the token
        const decoded = jwt.verify(token, config.SECRECT_KEY as string) as JwtPayload & { user_Email?: string; user_Role?: string };

        console.log("Decoded token all:", decoded);

        const user_Email = decoded.user_Email;
        const user_Role = decoded.user_Role;

        console.log(user_Email,user_Role,'check there all data ')

        if (typeof user_Email !== "string" || typeof user_Role !== "string") {
            res.status(400).json({ error: "Invalid token payload" });
            return;
        }

        // Fetch user details
        const user = await userService.getingAllUser(user_Email, user_Role);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ error: "Unauthorized: Token has expired" });
        } else {
            console.error("JWT Verification Error:", error);
            res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
    }
});


export const userControllers = {
    createUser,
    userGet,
    getingAllUser
};
