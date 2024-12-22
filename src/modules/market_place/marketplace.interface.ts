interface Review {
    postId: string;
    userName: string;
    rating: number;
    description: string;
  }
  
  interface Like {
    postId: string;
    userId: string;
    isLiked: boolean;
  }
  
  interface PostDetails {
    productName: string;
    category: string;
    description: string;
    image: string;
  }
  
  interface Post extends PostDetails {
    userId: string;
    phone: string;
    whatsApp: string;
    address: string;
    telegram: string;
    facebook: string;
    reviews: Review[];
    likes: Like[];
  }
  