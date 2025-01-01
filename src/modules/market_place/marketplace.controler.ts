import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { marketplaceGetCategories, marketplaceServiceDB } from "./marketplace.service";
import { TCategory } from "./marketplace.interface";
import nodemailer from "nodemailer";
import imap from 'imap-simple'
import { convert } from 'html-to-text';

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
      // const { email } = req.body;

      const transporter = nodemailer.createTransport({
        host:"smtp.hostinger.com",
        port: 587,
        secure: false,
         auth: {
             user: "info@megaproxy.us",
             pass: "chinitotampa96@A"
       }
     })
 
 
     const info = await transporter.sendMail({
       from: 'info@megaproxy.us',
       to: "sobujmath25@gmail.com", 
       subject: "Hello ✔", 
       text: "Hello world?", 
       html: "<b>Hello world?</b>"
     });

     console.log(info,'check send mail successfully')

      res.status(200).json({
        message: "Successfully Get Data",
        status: 200,
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
      console.log('get request');
      const { email } = req.body;

      const config = {
          imap: {
              user: 'info@megaproxy.us',
              password: 'chinitotampa96@A',
              host: 'imap.hostinger.com',
              port: 993,
              tls: true,
              authTimeout: 3000,
          },
      };

      // Connect to the IMAP server
      const connection = await imap.connect(config);
      await connection.openBox('INBOX');

      const searchCriteria = ['ALL']; // Fetch all emails
      const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true };

      const messages = await connection.search(searchCriteria, fetchOptions);

      const emails = messages.map((message) => {
        const header = message.parts.find((part) => part.which === 'HEADER')?.body;
        const rawBody = message.parts.find((part) => part.which === 'TEXT')?.body || '';

        // Extract plain text or decode HTML if necessary
        let cleanBody = rawBody;

        if (rawBody.includes('Content-Type: text/html')) {
            // Decode HTML to plain text
            cleanBody = convert(rawBody, { wordwrap: false });
        }

        // Filter and clean the text to remove unnecessary data
        cleanBody = cleanBody
            .split('\n')
            .filter(
                (line : any) =>
                    !line.startsWith('--') && // Remove multipart boundaries
                    !line.startsWith('>') && // Remove quoted lines
                    !line.match(/^On .*wrote:/) && // Remove "On [date] wrote:" lines
                    line.trim() !== '' // Remove empty lines
            )
            .join('\n')
            .trim();

        return {
            from: header?.from ? header.from[0] : 'Unknown',
            subject: header?.subject ? header.subject[0] : 'No Subject',
            body: cleanBody,
        };
    });

    console.log('Parsed Emails:', emails);

      res.status(200).json({
          message: 'Successfully Fetched Emails',
          status: 200,
          emails, // Return the simplified parsed emails
      });
  } catch (error) {
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
