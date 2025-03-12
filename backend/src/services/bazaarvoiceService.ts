import axios from 'axios';
import { config } from '../config';
import { Review } from './reviewService';

interface BazaarvoiceReviewResponse {
  Results: Array<{
    Id: string;
    ProductId: string;
    Rating: number;
    Title: string;
    ReviewText: string;
    SubmissionTime: string;
    UserNickname: string;
    ReviewerId: string;
    IsVerifiedPurchaser: boolean;
    TotalPositiveFeedbackCount: number;
    TotalNegativeFeedbackCount: number;
    Pros?: string;
    Cons?: string;
  }>;
  TotalResults: number;
  Includes?: any;
  Locale: string;
}

interface BazaarvoiceStatsResponse {
  Results: Array<{
    ProductId: string;
    AverageOverallRating: number;
    TotalReviewCount: number;
    RatingDistribution: Array<{
      RatingValue: number;
      Count: number;
    }>;
  }>;
}

export class BazaarvoiceService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = config.BAZAARVOICE_API_KEY;
    this.baseUrl = config.BAZAARVOICE_ENDPOINT;
  }

  async getProductStats(productId: string): Promise<{
    average: number;
    count: number;
    distribution: Record<string, number>;
  }> {
    // In a real integration, you would call Bazaarvoice API
    // For this POC, we'll simulate the response
    
    // This is where you would normally make the API call:
    /*
    const response = await axios.get(
      `${this.baseUrl}/data/statistics.json`,
      {
        params: {
          apiversion: '5.4',
          passkey: this.apiKey,
          productid: productId,
          stats: 'Reviews',
          filter: 'contentlocale:en_US'
        }
      }
    );
    
    const data: BazaarvoiceStatsResponse = response.data;
    const result = data.Results[0];
    */
    
    // Simulated response based on productId to provide different ratings
    const distributionMap: Record<string, number> = {};
    let average = 0;
    let count = 0;
    
    // Simulate different ratings based on productId
    switch (productId) {
      case 'iphone-13-pro':
        average = 4.7;
        count = 1243;
        distributionMap['5'] = 864;
        distributionMap['4'] = 267;
        distributionMap['3'] = 74;
        distributionMap['2'] = 25;
        distributionMap['1'] = 13;
        break;
      case 'samsung-s21':
        average = 4.5;
        count = 987;
        distributionMap['5'] = 612;
        distributionMap['4'] = 256;
        distributionMap['3'] = 85;
        distributionMap['2'] = 22;
        distributionMap['1'] = 12;
        break;
      case 'pixel-6':
        average = 4.2;
        count = 567;
        distributionMap['5'] = 298;
        distributionMap['4'] = 185;
        distributionMap['3'] = 52;
        distributionMap['2'] = 18;
        distributionMap['1'] = 14;
        break;
      case 'oneplus-9':
        average = 4.4;
        count = 432;
        distributionMap['5'] = 265;
        distributionMap['4'] = 121;
        distributionMap['3'] = 34;
        distributionMap['2'] = 8;
        distributionMap['1'] = 4;
        break;
      default:
        average = 4.0;
        count = 100;
        distributionMap['5'] = 50;
        distributionMap['4'] = 30;
        distributionMap['3'] = 10;
        distributionMap['2'] = 5;
        distributionMap['1'] = 5;
    }

    return {
      average,
      count,
      distribution: distributionMap
    };
  }

  async getProductReviews(productId: string): Promise<Review[]> {
    // In a real integration, you would call Bazaarvoice API
    // For this POC, we'll simulate the response
    
    // This is where you would normally make the API call:
    /*
    const response = await axios.get(
      `${this.baseUrl}/data/reviews.json`,
      {
        params: {
          apiversion: '5.4',
          passkey: this.apiKey,
          productid: productId,
          limit: 10,
          sort: 'SubmissionTime:desc',
          include: 'products,authors',
          filter: 'contentlocale:en_US'
        }
      }
    );
    
    const data: BazaarvoiceReviewResponse = response.data;
    */
    
    // Generate simulated reviews based on productId
    const reviewCount = Math.floor(Math.random() * 10) + 5; // 5-15 reviews
    const reviews: Review[] = [];
    
    const reviewTitles = [
      'Great phone!', 
      'Excellent purchase', 
      'Solid device', 
      'Better than expected', 
      'Good value for money',
      'Not worth the hype',
      'Amazing camera quality',
      'Battery life is impressive',
      'Decent but not perfect',
      'Highly recommended!'
    ];
    
    const reviewTexts = [
      'I\'ve been using this phone for a month now and I\'m very satisfied with its performance.',
      'The camera quality is amazing, especially in low light conditions.',
      'Battery life is good but could be better for heavy users.',
      'The design is sleek and premium, definitely worth the price.',
      'Fast processor, no lag even with multiple apps running.',
      'I upgraded from an older model and the difference is noticeable.',
      'The screen is beautiful with vibrant colors and good brightness.',
      'Face recognition works perfectly even in dark environments.',
      'Good phone but I expected more features for this price range.',
      'Very responsive touchscreen and smooth interface.'
    ];
    
    const pros = [
      'Great battery life', 
      'Excellent camera', 
      'Fast processor', 
      'Beautiful screen', 
      'Premium build quality',
      'Lightweight design',
      'Intuitive interface',
      'Water resistant',
      'Wireless charging',
      'Good speakers'
    ];
    
    const cons = [
      'Expensive', 
      'No headphone jack', 
      'Average battery life', 
      'Bulky design', 
      'Heats up under heavy use',
      'Limited storage options',
      'No expandable storage',
      'Average camera in low light',
      'Fingerprint magnet',
      'Slow charging'
    ];
    
    for (let i = 0; i < reviewCount; i++) {
      const rating = Math.floor(Math.random() * 5) + 1; // 1-5 rating
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 90)); // Random date in the last 90 days
      
      reviews.push({
        id: `review-${productId}-${i}`,
        productId: productId,
        rating: rating,
        title: reviewTitles[Math.floor(Math.random() * reviewTitles.length)],
        text: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
        submissionDate: randomDate.toISOString(),
        reviewer: {
          id: `user-${Math.floor(Math.random() * 1000)}`,
          name: `User${Math.floor(Math.random() * 1000)}`,
          isVerifiedPurchaser: Math.random() > 0.3 // 70% chance of being a verified purchaser
        },
        helpfulVotes: Math.floor(Math.random() * 50),
        notHelpfulVotes: Math.floor(Math.random() * 10),
        pros: rating > 3 ? pros[Math.floor(Math.random() * pros.length)] : undefined,
        cons: cons[Math.floor(Math.random() * cons.length)]
      });
    }

    return reviews;
  }
}