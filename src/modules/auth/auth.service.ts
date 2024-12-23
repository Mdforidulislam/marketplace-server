import jwt from "jsonwebtoken";
import { userModel } from "../user/user.model";
import config from "../../config";


interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}


const generateAccessToken = (user: any): string => {
    return jwt.sign(
        { user_Email: user.user_Email, user_Role: user.user_Role },
        config.SECRECT_KEY as string,
        { expiresIn: "3d" }  
    );
};

const generateRefreshToken = (user: any): string => {
    return jwt.sign(
        { user_Email: user.user_Email, user_Role: user.user_Role },
        config.SECRECT_KEY as string,  
        { expiresIn: "7d" }
    );
};

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}
// login User Service 
const authticationService = async (user_Email: string, user_Password: string): Promise<TokenResponse | null>  => {
    try {

        user_Email = user_Email.trim();
        user_Password = user_Password.trim();

        const isExiteuser = await userModel.UserRegister.findOne({
            $or: [{ user_Email: user_Email }]
        });

        // If the user does not exist or the password is incorrect
        if (!isExiteuser) {
            console.warn("User not found");
            return null;
        }

        // Generate tokens
        const accessToken = generateAccessToken(isExiteuser);
        const refreshToken = generateRefreshToken(isExiteuser);


        return { accessToken, refreshToken };

    } catch (error) {
        console.error("Authentication error:", error); 
        return null;
    }
};

export const authtication = {
    authticationService
}