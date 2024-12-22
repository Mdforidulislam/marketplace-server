import { UserRegister } from "../user/user.model";
import { marketplace } from "./marketplace.model";

// marketplaceProductPostEveryUserDB
const marketplaceProductPostEveryUserDB = async (data: any) => {
    try {

        const postRes = new marketplace.Post(data);
        await postRes.save();

        return {
        message: "Successfully Get Data",
        status: 200,
        };
    } catch (error) {
        console.error(error);
        return { error: "Internal Server Error" };
    }
};

// marketplaceProductGetEveryUserDB
const marketplaceProductGetEveryUserDB = async () => {
    try {
        const posts = await marketplace.Post.find();

        // Use Promise.all to handle all asynchronous operations
        const postResPonse = await Promise.all(posts.map(async (item) => { 
            console.log(item.author_id)
            const user = await UserRegister.findOne({ userId: item.author_id as string });
            if (user) {
                const {
                    user_Name,
                    user_PhoneNumber,
                    user_Facebook,
                    user_Skype,
                    user_Telegram,
                    user_Image,
                    user_WhatsApp,
                    user_blance,
                    user_Address,
                    user_varified,
                    country,
                    city
                } = user;
                return {
                    ...item.toObject(),
                    user_Name,
                    user_PhoneNumber,
                    user_Facebook,
                    user_Skype,
                    user_Telegram,
                    user_Image,
                    user_WhatsApp,
                    user_blance,
                    user_Address,
                    user_varified,
                    country,
                    city,
                };
            } else {
                return item.toObject();
            }
        }));

        return {
            message: "Successfully Get Data",
            status: 200,
            data: postResPonse,
        };
    } catch (error) {
        console.error(error);
        return { error: "Internal Server Error" };
    }
};


// marketplace product comment update

const marketplaceProductCommentUpdateDB = async (data: any) => {
    try {
        const { postId, ...comment } = data;
        // console.log(postId, ...comment);
        const postRes = await marketplace.Post.findOneAndUpdate({ _id: postId }, { $push: { reviews: comment } }, { new: true });
        return {
        message: "Successfully Get Data",
        status: 200,
        data: postRes
        };
    } catch (error) {
        console.error(error);
        return { error: "Internal Server Error" };
    }
}

// marketplaceProductLikeUpdateDB
const marketplaceProductLikeUpdateDB = async (data: any) => {
    try {
        const {  postId , ...like } = data;
        const postRes = await marketplace.Post.findOneAndUpdate({ _id: postId }, { $push: {likes: like }, $inc: { likesCount: 1 } }, { new: true });
        return {
        message: "Successfully Get Data",
        status: 200,
        data: postRes
        };
    } catch (error) {
        console.error(error);
        return { error: "Internal Server Error" };
    }
};



export const marketplaceServiceDB =  {marketplaceProductPostEveryUserDB,marketplaceProductGetEveryUserDB,marketplaceProductLikeUpdateDB,marketplaceProductCommentUpdateDB};