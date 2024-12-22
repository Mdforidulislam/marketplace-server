import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    user_name: { type: String, required: true, trim: true, minlength: 2 },
    user_Id: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
    },
    user_role: { type: String, enum: ["user", "admin"], default: "user" },
    user_email: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: function (value: string) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: "Invalid email format"
        }
    },
    user_PhoneNumber: { 
        type: String, 
        required: true 
    },
    user_Skype_Profile_url: { 
        type: String, 
        required: true 
    },
    user_Facebook_Profile_url: { 
        type: String, 
        required: true 
    },
    user_Balance: { 
        type: Number, 
        default: 0 
    },
    user_Subscription: { 
        type: Boolean, 
        default: false 
    },
    user_Image: { 
        type: String, 
        default: null 
    },
    user_password: { // Include a password field for user authentication
        type: String,
        required: true
    },
}, { timestamps: true });



// Create the User model
const User = model<IUser>("User", userSchema);

// Export the User model
export const userModel = {
    User
};
