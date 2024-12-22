import { Schema, model, Document } from "mongoose";
import { IUserRegister } from "./user.interface";
import { v4 as uuidv4} from 'uuid';


const SchemaUserRegister = new Schema<IUserRegister & Document>({
    userId: {
        type: String,
        default: () => uuidv4(),
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: { 
        type: String, 
        default: () => uuidv4(),
        trim: true,
    },
    name: { 
        type: String, 
        required: true, 
        trim: true,
    },
    userRole: { type: String, enum: ["user", "admin"], default: "user" },
    phoneNumber: { 
        type: String, 
        required: true, 
        trim: true,
    },
    skypeProfileUrl: { 
        type: String, 
        trim: true,

    },
    facebookProfileUrl: { 
        type: String, 
        required: true,
        trim: true,
    },
    balance: { 
        type: Number, 
        default: 0,
        set: (value: any) =>{
            return typeof value === "string" ? parseInt(value) : value;
        }
    },
    verified: { 
        type: Boolean, 
        default: false
    },
    subscription: { 
        type: Boolean, 
        default: false 
    },
    image: { 
        type: String, 
        default: null 
    },
    address: { // Include a password field for user authentication
        type: String,
        default: null
    },
    country: { 
        type: String, 
        default: null 
    },
    city: { 
        type: String,
        default: null
    },
}, { timestamps: true });



const UserRegister = model<IUserRegister & Document>("user", SchemaUserRegister);

// Export the User model
export const userModel = {
    UserRegister
};
