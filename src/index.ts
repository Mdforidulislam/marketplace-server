import app from "./app";
import config from "./config";
import connectToDatabase from "./db/connection";

async function main() {
    try {
        console.log("Connecting to database at:", config.database_url);
        await connectToDatabase(); // Await the database connection
        console.log("Database connected successfully");

        app.listen(config.port, () => {
            console.log(`Server is listening on port ${config.port}`);
        });
    } catch (error) {
        console.error("Failed to initialize the application:", error);
        process.exit(1); // Exit the process with a failure code
    }
}

main();
