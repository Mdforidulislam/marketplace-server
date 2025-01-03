import { UserRegister } from "../user/user.model";
import { EmailSendModel, marketplace } from "./marketplace.model";
import Categories from "./category.model";
import { getValue } from "node-global-storage";
import { emailSendToUser } from "../../utils/marketplace/email";


// marketplace geting email reponse type 

 interface  EmailResponse {
    conversaction_id: string | undefined;
    senderEmail: string | undefined;
    subject: string | undefined;
    body: string | undefined;
  }

// category
const marketplaceCategoryPost = async (name: string) => {
  try {
    console.log("from service", name);

    const categoryName = name.toLowerCase();
    console.log("from service", categoryName);

    const existingCategory = await Categories.findOne({
      name: {
        $regex: new RegExp(
          `^${categoryName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
          "i"
        ),
      },
    });

    if (existingCategory) {
      return { error: "Category already exists." };
    }

    const newCategory = new Categories({ name: name });
    await newCategory.save();
    return { data: newCategory, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

// get all categories
export const marketplaceGetCategories = async () => {
  try {
    const categories = await Categories.find({});
    return { data: categories, status: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};


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
    const postResPonse = await Promise.all(
      posts.map(async (item) => {
        const user = await UserRegister.findOne({
          userId: item.author_id as string,
        });
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
            city,
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
      })
    );

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

    const user = await UserRegister.findOne({
      user_Id: post.author_id as string,
    });
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
        city,
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
          productPrice: post.productPrice,
        },
      };
    } else {
      return {
        message: "Successfully Get Data",
        status: 200,
        data: post.toObject(),
        productPrice: post.productPrice,
      };
    }
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

// marketplace product comment update

const marketplaceProductCommentUpdateDB = async (data: any) => {
  try {
    const { postId, userId, rating, description } = data;
    // Fetch the post
    const post = await marketplace.Post.findById(postId);

    if (!post) {
      return { message: "Post not found", status: 404 };
    }

    // Find if the user has already commented on the post
    const existingCommentIndex = post.reviews.findIndex(
      (item) => item?.user_id === userId
    );

    if (existingCommentIndex > -1) {
      // Update the existing comment if found
      post.reviews[existingCommentIndex].rating = rating;
      post.reviews[existingCommentIndex].description = description;
    } else {
      // Add a new comment if no existing comment is found
      const user = await UserRegister.findOne({ userId: userId });
      const userName = user ? user.user_Name : "Unknown";
      post.reviews.push({
        user_id: userId,
        postId,
        userName,
        rating,
        description,
      });
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
    return {
      message: "Internal Server Error",
      status: 500,
      error: (error as Error).message,
    };
  }
};

// marketplaceProductLikeUpdateDB
const marketplaceProductLikeUpdateDB = async (data: any) => {
  try {
    const { postId, user_Id, isLiked } = data;
    console.log("isLiked", isLiked);

    const isLikedBool = isLiked === "true";
    console.log("isLikedBool", isLiked);

    const post = await marketplace.Post.findById(postId);
    console.log("like update post", post);
    
    console.log(
      "Trying to update post:",
      post?.likes.map((like) => like.isLiked)
    );

    if (!post) {
      return { message: "Post not found", status: 404 };
    }

    const existingLikeIndex = post.likes.findIndex(
      (item) => item.user_Id === user_Id
    );

    if (existingLikeIndex > -1) {
      const existingLike = post.likes[existingLikeIndex];
      if (existingLike.isLiked !== isLikedBool) {
        post.likes[existingLikeIndex].isLiked = isLikedBool;

        if (isLikedBool) {
          post.likesCount = (post.likesCount || 0) + 1;
        } else {
          post.likesCount = Math.max((post.likesCount || 0) - 1, 0);
        }
      }
    } else {
      post.likes.push({ postId, user_Id, isLiked: isLikedBool });

      if (isLikedBool) {
        post.likesCount = (post.likesCount || 0) + 1;
      }
    }

    const updatedPost = await post.save();

    return {
      message: "Successfully updated likes",
      status: 200,
      data: updatedPost,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Internal Server Error",
      status: 500,
      error: (error as Error).message,
    };
  }
};


// save email conversation 
const saveEmailConversationDB = async (data: any) => {
  try{

    const sendEmail = getValue("emailInfo");
    console.log(data, sendEmail,'geting data form sending email reseponse and local storage');
    
    const email = new EmailSendModel(sendEmail);
    await email.save();
    return email;

  }catch(error){
    console.error(error);
    return { error: "Internal Server Error" };
  }
}

//  getign data on send again to user 

const getEmailFromUserDB = async (data: EmailResponse) => {
  try{


    const emailRese = await EmailSendModel.findOne({
      transactionId: data.conversaction_id,
    })

    
    if (!emailRese) {
      return { error: "Email record not found", status: 404 };
    }

    await emailSendToUser({
      send_email: emailRese.receive_email || "",
      receive_email: emailRese.send_email || "",
      subject: data.subject || "",
      text: data.body || "",
    });



  }catch(error){
    console.error(error);
    return { error: "Internal Server Error" };
  }
}


export const marketplaceServiceDB = {
  marketplaceProductPostEveryUserDB,
  marketplaceProductGetEveryUserDB,
  marketplaceProductLikeUpdateDB,
  marketplaceProductCommentUpdateDB,
  marketplaceProductGetSingleUserDB,
  marketplaceCategoryPost,
  saveEmailConversationDB,
  getEmailFromUserDB
};
