import express from 'express';
import { marketplaceControl } from './marketplace.controler';

const router = express.Router();


// handle router here 
router.post("/create-post", marketplaceControl.marketplacePostEveryUser);
router.get("/get-post", marketplaceControl.marketplaceGetPostEveryUser);
router.put("/comment-post", marketplaceControl.marketplaceCommentUpdate);
router.put("/like-post", marketplaceControl.marketplaceLikeUpdate);


export const marketplaceRoutes = router;


