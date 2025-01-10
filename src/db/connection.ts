import mongoose from "mongoose";
import config from "../config";

const connectToDatabase = async (): Promise<void> => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        };

        await mongoose.connect(config.database_url as string, options);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error; // Rethrow the error to ensure proper handling
    }
};

export default connectToDatabase;
