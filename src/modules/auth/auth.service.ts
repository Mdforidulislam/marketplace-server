import jwt from "jsonwebtoken";
import { userModel } from "../user/user.model";
import config from "../../config";

interface TokenResponse {
  accessToken?: string;
  refreshToken?: string;
  error?: string;
}

// In your backend authentication service
const generateAccessToken = (user: any): string => {
  return jwt.sign(
    {
      user_Email: user.user_Email,
      user_Role: user.user_Role,
      user_Id: user.user_Id, 
    },
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

// login User Service
const authticationService = async (
  user_Email: string,
  user_Password: string
): Promise<TokenResponse | null> => {
  try {
    user_Email = user_Email.trim();
    user_Password = user_Password.trim();

    const isExistUser = await userModel.UserRegister.findOne({
      $or: [{ user_Email: user_Email }],
    });

    if (!isExistUser) {
        console.warn("User not found");
        return { error: "User not found" };
      }
  
      // If password is incorrect
      if (user_Password !== isExistUser.user_Password) {
        console.warn("Invalid password");
        return { error: "Invalid password" }; 
      }

    const accessToken = generateAccessToken(isExistUser);
    const refreshToken = generateRefreshToken(isExistUser);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
};

export const authtication = {
  authticationService,
};
