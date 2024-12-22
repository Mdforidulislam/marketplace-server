// models/post.model.ts
import { Schema, model, Document } from "mongoose";
import { TPost } from "./marketplace.interface";


// Mongoose schema for TPost
const PostSchema = new Schema<TPost & Document>({
  // Product Information (from TPostDetails)
  productName: {
    type: String,
    required: true,
  },
  author_id:{
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10, // Minimum length for description
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },

  // Reviews and Likes (arrays of TReview and TLike)
  reviews: [{
    postId: {
      type: String,
      required: true,
    },
    userName: {
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
  }],
  likesCount:{
    type: Number,
    default: 0,
  },
  likes: [{
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isLiked: {
      type: Boolean,
      required: true,
    },
  }],
}, { timestamps: true });

// Create a model for Post using the defined schema and type
export const Post = model<TPost & Document>("Post", PostSchema);

export const marketplace = {
    Post
}
