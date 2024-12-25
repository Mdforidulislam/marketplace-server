import { Schema, model, Document } from "mongoose";
import { IUserRegister } from "./user.interface";
import { v4 as uuidv4 } from "uuid";

// Updated Schema Definition
const SchemaUserRegister = new Schema<IUserRegister & Document>(
  {
    user_Id: {
      type: String,
      default: () => uuidv4(),
      unique: true,
      trim: true,
    },
    user_Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    user_Password: {
      type: String,
      required: true,
      trim: true,
    },
    user_Name: {
      type: String,
      required: true,
      trim: true,
    },
    user_PhoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    user_Facebook: {
      type: String,
      required: true,
      trim: true,
    },
    user_Skype: {
      type: String,
      default: null,
      trim: true,
    },
    user_Telegram: {
      type: String,
      default: false,
    },
    user_Image: {
      type: String,
      default: null,
    },
    user_WhatsApp: {
      type: String,
      default: null,
      required: true,
      trim: true,
    },
    user_blance: {
      type: Number,
      default: 0,
      set: (value: any) =>
        typeof value === "string" ? parseFloat(value) : value,
    },
    user_Address: {
      type: String,
      default: null,
      required: true,
      trim: true,
    },
    user_varified: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
      default: null,
      trim: true,
    },
    city: {
      type: String,
      default: null,
      trim: true,
    },
    user_Role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Create and Export the User Model
export const UserRegister = model<IUserRegister & Document>(
  "User",
  SchemaUserRegister
);

// Export User Model as an Object (Optional, if you have multiple models)
export const userModel = {
  UserRegister,
};
