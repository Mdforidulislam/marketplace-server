import express from 'express';
import { marketplaceControl } from './marketplace.controler';

const router = express.Router();


router.post("/create-post", marketplaceControl.marketplacePostEveryUser);
router.get("/get-single-post", marketplaceControl.marketplaceGetPostSingleUser);
router.get("/get-all-post", marketplaceControl.marketplaceGetPostEveryUser);
router.put("/comment-post", marketplaceControl.marketplaceCommentUpdate);
router.put("/like-post", marketplaceControl.marketplaceLikeUpdate);
router.post("/add-category", marketplaceControl.marketplacePostCategory);
router.get("/get-all-categories", marketplaceControl.marketplaceGetAllCategories);


export const marketplaceRoutes = router;


