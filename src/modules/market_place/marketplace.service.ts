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

// post with single user data(iftee)
const marketplaceProductGetSingleUserDB = async (data: any) => {
    try {
        const post = await marketplace.Post.findById(data);

        if (!post) {
            return { message: "Post not found", status: 404 };
        }

        const user = await UserRegister.findOne({ user_Id: post.author_id as string });
        console.log(user,'get user')
        if (user) {
            const {
                user_Id,
                user_Email,
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
                message: "Successfully Get Data",
                status: 200,
                data: {
                    ...post.toObject(),
                    user_Id,
                    user_Email,
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
                },
            };
        } else {
            return {
                message: "Successfully Get Data",
                status: 200,
                data: post.toObject(),
            };
        }
    } catch (error) {
        console.error(error);
        return { error: "Internal Server Error" };
    }
}

// marketplace product comment update

const marketplaceProductCommentUpdateDB = async (data: any) => {
    try {
        const { postId, userId, rating, description } = data;
        console.log("Post data received:", data);
        // Fetch the post
        const post = await marketplace.Post.findById(postId);

        if (!post) {
            return { message: "Post not found", status: 404 };
        }

        // Find if the user has already commented on the post
        const existingCommentIndex = post.reviews.findIndex((item) => item?.user_id === userId);

        if (existingCommentIndex > -1) {
            // Update the existing comment if found
            post.reviews[existingCommentIndex].rating = rating;
            post.reviews[existingCommentIndex].description = description;
        } else {
            // Add a new comment if no existing comment is found
            const user = await UserRegister.findOne({ userId: userId });
            const userName = user ? user.user_Name : 'Unknown';
            post.reviews.push({ user_id:userId, postId, userName, rating, description });
        }

        // Save the updated post
        const updatedPost = await post.save();

        return {
            message: "Successfully updated comments",
            status: 200,
            data: updatedPost,
        };
    } catch (error) {
        console.error(error);
        return { message: "Internal Server Error", status: 500, error: (error as Error).message };
    }
};


// marketplaceProductLikeUpdateDB
const marketplaceProductLikeUpdateDB = async (data: any) => {
    try {
        const { postId, user_Id, isLiked } = data;

        // Fetch the post
        const post = await marketplace.Post.findById(postId);

        if (!post) {
            return { message: "Post not found", status: 404 };
        }

        // Find the like index
        const existingLikeIndex = post.likes.findIndex((item) => item.user_Id === user_Id);

        if (existingLikeIndex > -1) {
            // If user already liked/unliked the post, update their isLiked value
            const existingLike = post.likes[existingLikeIndex];
            if (existingLike.isLiked !== isLiked) {
                post.likes[existingLikeIndex].isLiked = isLiked;

                // Update likesCount
                if (isLiked) {
                    post.likesCount = (post.likesCount || 0) + 1;
                } else {
                    post.likesCount = Math.max((post.likesCount || 0) - 1, 0);
                }
            }
        } else {
            // Add a new like if the user hasn't interacted before
            post.likes.push({ postId, user_Id, isLiked });

            // Increment likesCount if the new like is positive
            if (isLiked) {
                post.likesCount = (post.likesCount || 0) + 1;
            }
        }

        // Save the updated post
        const updatedPost = await post.save();

        return {
            message: "Successfully updated likes",
            status: 200,
            data: updatedPost,
        };
    } catch (error) {
        console.error(error);
        return { message: "Internal Server Error", status: 500, error: (error as Error).message };
    }
};



export const marketplaceServiceDB =  { marketplaceProductPostEveryUserDB,marketplaceProductGetEveryUserDB,marketplaceProductLikeUpdateDB,marketplaceProductCommentUpdateDB , marketplaceProductGetSingleUserDB};