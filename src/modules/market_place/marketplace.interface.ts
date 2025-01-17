export interface TReview {
  user_id: any;
  postId?: string;
  userName: string;
  rating: number;
  description: string;
}
export interface ParsedEmail {
  subject: string;
  from: string;
  text: string;
}

export interface MaskedEmail {
  (email: string): string;
}

export interface TLike {
  postId?: string;
  user_Id: string;
  isLiked: boolean;
}

export interface TPostDetails {
  productName: string;
  author_id: string;
  category: string;
  description: string;
  image: string;
  productPrice: string;
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


export interface TCategory {
  name?: string;
}


export interface TEmailSend {
  send_email: string;
  receive_email: string;
  transactionId: string;
}
