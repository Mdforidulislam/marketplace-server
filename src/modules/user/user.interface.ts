import { Document } from "mongoose";

export interface IUser extends Document {
    user_name: string;
    user_Id: string;
    user_role: string;
    user_email: string;
    user_PhoneNumber: string;
    user_Skype_Profile_url: string;
    user_Facebook_Profile_url: string;
    user_Balance: number;
    user_Subscription: boolean;
    user_verifyed: boolean;
    user_Image: string | null;
    user_password: string; // Include this if you have a password field
    comparePassword(password: string): Promise<boolean>;
}


export interface User {
    id: string; 
    username: string;
    email: string;
}