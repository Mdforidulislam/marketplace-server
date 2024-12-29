// models/post.model.ts
import { Schema, model, Document } from "mongoose";
import { TPost } from "./marketplace.interface";
import Category from "./category.model";

// Mongoose schema for TPost
const PostSchema = new Schema<TPost & Document>(
  {
    // Product Information (from TPostDetails)
    productName: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    // Reviews and Likes (arrays of TReview and TLike)
    reviews: [
      {
        postId: {
          type: String,
          required: true,
        },
        user_id: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5, // Rating scale 1-5
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        user_Id: {
          type: String,
          required: true,
        },
        isLiked: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Create a model for Post using the defined schema and type
export const Post = model<TPost & Document>("Post", PostSchema);

// Import and include the Category model
export const marketplace = {
  Post,
  Category,
};
