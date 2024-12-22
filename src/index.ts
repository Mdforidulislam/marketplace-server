import mongoose from "mongoose";
import app from "./app";
import config from "./config";

  

async function main(){
    try {
        await mongoose.connect(config.database_url as string);
        
        // Use server.listen instead of app.listen
        app.listen(config.port, () => {
            console.log(`Server is listening on port ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();



