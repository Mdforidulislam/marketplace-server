import  express  from "express";
import { userControllers } from "./user.controler";

const router =  express.Router();


router.post('/create-user',userControllers.createUser);
router.get('/user-get', userControllers.userGet);
router.get('/get-alluser',userControllers.getingAllUser)

export const userRoutes = router;

 