
import express from 'express';
import { authticationControler } from './auth.controlder';
import { middelwareAuth } from './auth.validation';
import { refreshAccessToken } from './refeshToken';




const Router = express.Router();


Router.post(
    '/auth',          
    authticationControler.userAuthentication    
);

Router.post("/logOut",authticationControler.userLogOutController)

Router.get("/refresh-token", refreshAccessToken)

export const authRouter = Router;