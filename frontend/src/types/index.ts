export interface Rating {
    average: number;
    count: number;
    distribution: Record<number, number>; // Stars -> Count
  }
  
  export interface Phone {
    id: string;
    name: string;
    brand: string;
    image?: string;
    price?: string;
    rating?: Rating;
    specs?: Record<string, string | number>;
  }
  
  export interface Reviewer {
    id: string;
    name: string;
    isVerifiedPurchaser: boolean;
  }
  
  export interface Review {
    id: string;
    productId: string;
    rating: number;
    title: string;
    text: string;
    submissionDate: string;
    reviewer: Reviewer;
    helpfulVotes?: number;
    notHelpfulVotes?: number;
    pros?: string;
    cons?: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    success: boolean;
    error?: string;
  }