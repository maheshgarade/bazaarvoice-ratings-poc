import { BazaarvoiceService } from './bazaarvoiceService';

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

export class ReviewService {
  private bazaarvoiceService: BazaarvoiceService;

  constructor() {
    this.bazaarvoiceService = new BazaarvoiceService();
  }

  async getReviewsByProductId(productId: string): Promise<Review[]> {
    return await this.bazaarvoiceService.getProductReviews(productId);
  }
}