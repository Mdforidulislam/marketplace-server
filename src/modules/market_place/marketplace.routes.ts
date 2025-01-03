import express from 'express';
import { marketplaceControl } from './marketplace.controler';
import cron from 'node-cron'
const router = express.Router();


router.post("/create-post", marketplaceControl.marketplacePostEveryUser);
router.get("/get-single-post", marketplaceControl.marketplaceGetPostSingleUser);
router.get("/get-all-post", marketplaceControl.marketplaceGetPostEveryUser);
router.put("/comment-post", marketplaceControl.marketplaceCommentUpdate);
router.put("/like-post", marketplaceControl.marketplaceLikeUpdate);
router.post("/add-category", marketplaceControl.marketplacePostCategory);
router.get("/get-all-categories", marketplaceControl.marketplaceGetAllCategories);


// email send to user
router.post("/send-email", marketplaceControl.marketplaceSendEmail);
// email geting response
router.post("/get-email", marketplaceControl.marketplaceGetEmail);
<<<<<<< HEAD

// add custom doamin or email to send email
=======
>>>>>>> bbd9cc718ebdf028320805b0f82c1ba5595a9c55


export const marketplaceRoutes = router;


