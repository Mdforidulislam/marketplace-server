export interface TReview {
  postId: string;
  userName: string;
  rating: number;
  description: string;
}

export interface TLike {
  postId: string;
  userId: string;
  isLiked: boolean;
}

export interface TPostDetails {
  productName: string;
  author_id: string;
  category: string;
  description: string;
  image: string;
}

export interface TPost extends TPostDetails {
  userId?: string;
  phone?: string;
  whatsApp?: string;
  address?: string;
  telegram?: string;
  facebook?: string;
  likesCount?: number;
  reviews: TReview[];
  likes: TLike[];
}
