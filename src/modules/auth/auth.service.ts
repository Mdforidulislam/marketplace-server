import jwt from "jsonwebtoken";
import { userModel } from "../user/user.model";
import config from "../../config";


interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}


const generateAccessToken = (user: any): string => {
    return jwt.sign(
        { user_Name: user.user_name, user_role: user.user_role, user_email: user.user_email },
        config.SECRECT_KEY as string,
        { expiresIn: "3d" }  
    );
};

const generateRefreshToken = (user: any): string => {
    return jwt.sign(
        { user_name: user.user_name, user_role: user.user_role, user_email: user.user_email },
        config.SECRECT_KEY as string,  
        { expiresIn: "7d" }
    );
};

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}
// login User Service 
const authticationService = async (usernameOrEmail: string, password: string): Promise<TokenResponse | null>  => {
    try {

        usernameOrEmail = usernameOrEmail.trim();
        password = password.trim();

        console.log(usernameOrEmail,password)

        const isExiteuser = await userModel.User.findOne({
            $or: [{ user_name: usernameOrEmail }, { user_email: usernameOrEmail }]
        });

        console.log(isExiteuser,'check is user is Exite')
        // If the user does not exist or the password is incorrect
        if (!isExiteuser) {
            console.warn("User not found");
            return null;
        }

        // Generate tokens
        const accessToken = generateAccessToken(isExiteuser);
        const refreshToken = generateRefreshToken(isExiteuser);
        console.log(accessToken,refreshToken)

        return { accessToken, refreshToken };

    } catch (error) {
        console.error("Authentication error:", error); 
        return null;
    }
};

export const authtication = {
    authticationService
}