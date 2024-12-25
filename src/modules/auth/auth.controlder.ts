import { Request, Response } from "express";
import { authtication } from "./auth.service";
import jwt from "jsonwebtoken";
import config from "../../config";
import expressAsyncHandler from "express-async-handler";

// login Controler 
const userAuthentication = expressAsyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_Email, user_Password } = req.body;

        const tokens = await authtication.authticationService(user_Email, user_Password);

        if (!tokens) {
           return res.status(401).json({ message: "Authentication failed" }); 
        }

        const { accessToken, refreshToken } = tokens;
        console.log(accessToken, refreshToken)

        // // Set the refresh token in an HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        });

         res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: "Internal server error" }); 
    }
});

//  logOut Controler 

const userLogOutController = expressAsyncHandler(async (req: Request, res: Response) : Promise<any>  => {
    try {
        // Extract the token from the request (if using a Bearer token)
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decodedToken = jwt.verify(token, config.SECRECT_KEY as string);
        
        // Respond with success
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export const authticationControler = {
        userAuthentication,
        userLogOutController
}


