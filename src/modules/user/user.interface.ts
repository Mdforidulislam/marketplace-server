export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister extends IUserLogin {
    userId?: string;
    name: string;
    userRole?: string;
    phoneNumber: string;
    skypeProfileUrl: string;
    facebookProfileUrl: string;
    balance?: number;
    verified?: boolean;  
    subscription?: boolean;
    image?: string;
    address?: string;
    country?: string;
    city?: string;
}
