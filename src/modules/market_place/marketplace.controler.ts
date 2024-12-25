import expressAsyncHandler from "express-async-handler";
import { Request, Response } from 'express';
import { marketplaceServiceDB } from "./marketplace.service";


// create user
const marketplacePostEveryUser = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const  {post}  = req.body;
        const result = await marketplaceServiceDB.marketplaceProductPostEveryUserDB(post);
        res.status(200).json({
            message: "Successfully Get Data",
            status: 200,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// get every user
const marketplaceGetPostEveryUser = expressAsyncHandler(async (req: Request, res: Response) => {
    try {

        const result = await marketplaceServiceDB.marketplaceProductGetEveryUserDB();
        res.status(200).json({
            message: "Successfully Get Data",
            status: 200,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const marketplaceGetPostSingleUser = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const  {id}  = req.query;
        console.log(id)
     
        const result = await marketplaceServiceDB.marketplaceProductGetSingleUserDB(id);
        res.status(200).json({
            message: "Successfully Get Data",
            status: 200,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
);


// comment update the user post
const marketplaceCommentUpdate = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const { post } = req.body;
        // console.log(post);
        const result = await marketplaceServiceDB.marketplaceProductCommentUpdateDB(post);
        res.status(200).json({
            message: "Successfully Get Data",
            status: 200,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// like update the user post 

const marketplaceLikeUpdate = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const { post } = req.body;
        const result = await marketplaceServiceDB.marketplaceProductLikeUpdateDB(post);
        res.status(200).json({
            message: "Successfully Get Data",
            status: 200,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




export const marketplaceControl =  {marketplacePostEveryUser,marketplaceGetPostEveryUser,marketplaceCommentUpdate,marketplaceLikeUpdate,marketplaceGetPostSingleUser};