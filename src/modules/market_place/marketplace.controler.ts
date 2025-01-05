import expressAsyncHandler from "express-async-handler";
import cron from "node-cron";
import { Request, response, Response } from "express";
import { marketplaceGetCategories, marketplaceServiceDB } from "./marketplace.service";
import { TCategory } from "./marketplace.interface";
import { emailSendToUser, getEmailFromUser } from "../../utils/marketplace/email";


// add category
const marketplacePostCategory = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name }: TCategory = req.body;
      console.log("from controller", name);

      if (!name) {
        res.status(400).json({ message: "Category is required." });
        return;
      }

      const result = await marketplaceServiceDB.marketplaceCategoryPost(name);

      if (result.error) {
        res.status(400).json({ message: result.error });
        return;
      }

      res.status(200).json({
        message: "Category successfully added.",
        status: 200,
        data: result.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// get all categories
export const marketplaceGetAllCategories = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await marketplaceGetCategories();

      if (result.error) {
        res.status(400).json({ message: result.error });
        return;
      }

      res.status(200).json({
        message: "Categories fetched successfully.",
        status: 200,
        data: result.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// create post
const marketplacePostEveryUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { post } = req.body;
      const result =
        await marketplaceServiceDB.marketplaceProductPostEveryUserDB(post);

      res.status(200).json({
        message: "Successfully Get Data",
        status: 200,
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// get every user
const marketplaceGetPostEveryUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const result =
        await marketplaceServiceDB.marketplaceProductGetEveryUserDB();
      res.status(200).json({
        message: "Successfully Get Data",
        status: 200,
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

const marketplaceGetPostSingleUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      const result =
        await marketplaceServiceDB.marketplaceProductGetSingleUserDB(id);
      res.status(200).json({
        message: "Successfully Get Data",
        status: 200,
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// comment update the user post
const marketplaceCommentUpdate = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { post } = req.body;
      const result =
        await marketplaceServiceDB.marketplaceProductCommentUpdateDB(post);
      res.status(200).json({
        message: "Successfully Get Data",
        status: 200,
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// like update the user post

const marketplaceLikeUpdate = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { post } = req.body;
      const result =
        await marketplaceServiceDB.marketplaceProductLikeUpdateDB(post);
      res.status(200).json({
        message: "Successfully Get Data",
        status: 200,
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


// send email to user
const marketplaceSendEmail = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {

      const { emailInfo} = req.body;
      console.log(emailInfo,'check the email info here!!')

      const repnse =  await emailSendToUser(emailInfo);

      const result = await marketplaceServiceDB.saveEmailConversationDB(repnse);
      
      res.status(200).json({
        message: "Successfully Get Data",
        status: 200,
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// get email from user reponse 
const marketplaceGetEmail = expressAsyncHandler(async (req, res) => {
  try {
    // Fetch email response
    const response = await getEmailFromUser();

    // Validate response
    if (!response) {
      console.error('Error: No response or invalid response received from getEmailFromUser');
      res.status(400).json({ error: "Invalid email response" });
      return; // Stop further execution
    }

    // Proceed with valid response
    console.log('Valid response received:', response);

    const result = await marketplaceServiceDB.getEmailFromUserDB(response);

    // Return the final result
    res.status(200).json({
      message: 'Successfully Fetched Emails',
      status: 200,
      result,
    });
  } catch (error) {
    // Catch unexpected errors
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export const marketplaceControl = {
  marketplacePostEveryUser,
  marketplaceGetPostEveryUser,
  marketplaceCommentUpdate,
  marketplaceLikeUpdate,
  marketplaceGetPostSingleUser,
  marketplacePostCategory,
  marketplaceGetAllCategories,
  marketplaceSendEmail,
  marketplaceGetEmail
};
