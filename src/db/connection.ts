import mongoose from 'mongoose';
import config from '../config';

const connectToDatabase = async (): Promise<void> => {
    try {
        // Set connection options, including server selection timeout
        const options = {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
        };

        await mongoose.connect(config.database_url as string, options); 
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Database connection failed");
    }
};

export default connectToDatabase;
