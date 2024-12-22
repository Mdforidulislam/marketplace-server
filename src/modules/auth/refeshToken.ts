import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import expressAsyncHandler from "express-async-handler";

export const refreshAccessToken = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies?.refreshToken;
    console.log(refreshToken, 'check is refresh token');

    if (!refreshToken) {
        res.status(403).json({ message: "Refresh token not provided" });
        return;
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, config.SECRECT_KEY as string) as jwt.JwtPayload;
        console.log(decoded, 'check decoded refresh token');

        // Generate a new access token
        const newAccessToken = jwt.sign(
            { user_Name: decoded.user_Name, user_Role: decoded.user_Role, user_Email: decoded.user_Email },
            config.SECRECT_KEY as string,
            { expiresIn: "15m" }  // Short-lived access token (e.g., 15 minutes)
        );

        // Respond with the new access token
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("Refresh token error:", error);
        res.status(403).json({ message: "Invalid refresh token" });
    }
});
