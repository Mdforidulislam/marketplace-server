import mongoose from "mongoose";
import app from "./app";
import config from "./config";


  

async function main(){
    try {
     const database =   await mongoose.connect(config.database_url as string);
        console.log("Database connected successfully");
        // Use server.listen instead of app.listen
        app.listen(config.port, () => {
            console.log(`Server is listening on port ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main()




