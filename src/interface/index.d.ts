
import {  JwtPayload } from "jsonwebtoken";

// Extend the Request interface from Express
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}
