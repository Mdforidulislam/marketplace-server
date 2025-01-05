import { scheduleGetEmailJob } from "./marketplace/marketplace.emailget"

export const intitalizeJobs = () =>{
    try{

        scheduleGetEmailJob()

    }catch(error){
        console.log(error)
    }
}