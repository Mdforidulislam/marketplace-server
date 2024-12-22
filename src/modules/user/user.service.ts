import { IUser, User } from "./user.interface";
import { userModel } from "./user.model";



// create user db
const userCreateDB = async (user: IUser) => {
    try {
        console.log(user)
        const result = await userModel.User.create(user);
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



const userGetDB = async (userId: string): Promise<User | null> => {
    try {
        console.log("Searching for user with identifier:", userId);

        // Fetch the user document from MongoDB
        const user = await userModel.User.findOne({ user_name: userId }).exec();

        // Convert document to plain object and cast to `User`
        return user ? (user.toObject() as unknown as User) : null;
    } catch (error) {
        console.error('Error fetching user from DB:', error);
        throw new Error('Database error');
    }
};



const getingAllUser = async (userId: string, requestingUserRole: string): Promise<User | User[] | null> => {
    try {
        console.log("Searching for user with identifier:", userId);

        if (requestingUserRole === 'admin') {
            // Admins can view all users
            const allUsers = await userModel.User.find().exec();
            console.log("Admin request - returning all user data.");
            
            // Convert each user document to a plain object and cast to User[]
            return allUsers.map(user => user.toObject() as unknown as User);
        } else {
            // Non-admins can only view their own data
            const user = await userModel.User.findById(userId).exec();
            if (!user) {
                console.warn(`No user found with ID: ${userId}`);
                return null;
            }
            console.log("Non-admin request - returning user data.");
            return user.toObject() as unknown as User; // Convert to plain object
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
