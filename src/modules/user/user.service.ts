import { IUserRegister } from "./user.interface";
import { userModel } from "./user.model";

// create user db
const userCreateDB = async (user:IUserRegister) => {
    try {
        console.log(user)
        const result = await userModel.UserRegister.create(user);
        return result;
    } catch (error: any) {

        if (error.code === 11000) {
            return { message: 'Duplicate user information', error: error.message };
        }

        return {
            message: "An error occurred while creating the user",
            error: error.message,
        };
    }
};


// get user from db

const userGetDB = async (userId: string): Promise<IUserRegister | null> => {
    try {
        console.log("Searching for user with identifier:", userId);
        const user = await userModel.UserRegister.findOne({ userId: userId }).exec();
        return user ? (user.toObject() as unknown as IUserRegister) : null;
    } catch (error) {
        console.error('Error fetching user from DB:', error);
        throw new Error('Database error');
    }
};



const getingAllUser = async (userId: string, requestingUserRole: string): Promise<IUserRegister | IUserRegister[] | null> => {
    try {
        console.log("Searching for user with identifier:", userId);

        if (requestingUserRole === 'admin') {
            const allUsers = await userModel.UserRegister.find().exec();
            console.log("Admin request - returning all user data.");
            return allUsers.map(user => user.toObject() as unknown as IUserRegister);
        } else {
            const user = await userModel.UserRegister.find().exec();
            if (!user) {
                console.warn(`No user found with ID: ${userId}`);
                return null;
            }
            console.log("Non-admin request - returning user data.");
            return user as unknown as IUserRegister; 
        }
    } catch (error) {
        console.error('Error fetching user from DB:', error);
        throw new Error('Database error');
    }
};


export const userService = {
    userCreateDB,
    userGetDB,
    getingAllUser
};
