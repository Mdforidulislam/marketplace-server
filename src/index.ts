import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
    try {
        console.log("Connecting to database at:", config.database_url);
        const database = await mongoose.connect(config.database_url as string, {
        });
        console.log("Database connected successfully");

        app.listen(config.port, () => {
            console.log(`Server is listening on port ${config.port}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database", error);
    }
}

main();

