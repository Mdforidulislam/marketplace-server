import { IUserRegister } from "./user.interface";
import { userModel } from "./user.model";

// create user db
const userCreateDB = async (user:IUserRegister) => {
    try {
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

const userGetDB = async (user_Email: string): Promise<IUserRegister | null> => {
    try {
        const user = await userModel.UserRegister.findOne({ userId: user_Email }).exec();
        return user ? (user.toObject() as unknown as IUserRegister) : null;
    } catch (error) {
        console.error('Error fetching user from DB:', error);
        throw new Error('Database error');
    }
};



const getingAllUser = async (user_Email: string, requestingUserRole: string): Promise<IUserRegister | IUserRegister[] | null> => {
    try {

        if (requestingUserRole === 'admin') {
            const allUsers = await userModel.UserRegister.find().exec();
            return allUsers.map(user => user.toObject() as unknown as IUserRegister);
        } else {
            const user = await userModel.UserRegister.find().exec();
            if (!user) {
                console.warn(`No user found with ID: ${user_Email}`);
                return null;
            }
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
