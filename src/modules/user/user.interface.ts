export interface IUserLogin {
    user_Email: string;
    user_Password: string;
}

export interface IUserRegister extends IUserLogin {
    user_Id?: string;
    user_Name: string;
    user_PhoneNumber: string;
    user_Facebook: string;
    user_Skype?: string;
    user_Telegram?: string;  
    user_Image?: string;
    user_WhatsApp?: string;
    user_blance?: number;
    user_Address?: string;
    user_varified?: boolean;
    country?: string;
    city?: string;
    user_Role?: string;
}
