import jwt from "jsonwebtoken";
import { userModel } from "../user/user.model";
import config from "../../config";


interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}


const generateAccessToken = (user: any): string => {
    return jwt.sign(
        { userId: user.userId, userRole: user.userRole, email: user.email },
        config.SECRECT_KEY as string,
        { expiresIn: "3d" }  
    );
};

const generateRefreshToken = (user: any): string => {
    return jwt.sign(
        { userId: user.userId, userRole: user.userRole, email: user.email },
        config.SECRECT_KEY as string,  
        { expiresIn: "7d" }
    );
};

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}
// login User Service 
const authticationService = async (userIdOrEmail: string, password: string): Promise<TokenResponse | null>  => {
    try {

        userIdOrEmail = userIdOrEmail.trim();
        password = password.trim();

        console.log(userIdOrEmail,password)

        const isExiteuser = await userModel.UserRegister.findOne({
            $or: [{ email: userIdOrEmail }, { userId: userIdOrEmail }]
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