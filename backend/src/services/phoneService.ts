import axios from 'axios';
import { config } from '../config';
import { BazaarvoiceService } from './bazaarvoiceService';

export interface Phone {
  id: string;
  name: string;
  brand: string;
  image?: string;
  price?: string;
  rating?: {
    average: number;
    count: number;
    distribution: Record<string, number>;
  };
  specs?: Record<string, string | number>;
}

export class PhoneService {
  private bazaarvoiceService: BazaarvoiceService;
  
  // In a real application, this would likely come from a database
  private phoneData: Phone[] = [
    {
      id: 'iphone-13-pro',
      name: 'iPhone 13 Pro',
      brand: 'Apple',
      image: 'https://example.com/iphone13pro.jpg',
      price: '$999',
      specs: {
        display: '6.1 inch',
        processor: 'A15 Bionic',
        camera: '12MP Triple',
        storage: '128GB',
        battery: '3095 mAh'
      }
    },
    {
      id: 'samsung-s21',
      name: 'Galaxy S21',
      brand: 'Samsung',
      image: 'https://example.com/samsungs21.jpg',
      price: '$799',
      specs: {
        display: '6.2 inch',
        processor: 'Snapdragon 888',
        camera: '12MP Triple',
        storage: '128GB',
        battery: '4000 mAh'
      }
    },
    {
      id: 'pixel-6',
      name: 'Pixel 6',
      brand: 'Google',
      image: 'https://example.com/pixel6.jpg',
      price: '$599',
      specs: {
        display: '6.4 inch',
        processor: 'Google Tensor',
        camera: '50MP Dual',
        storage: '128GB',
        battery: '4614 mAh'
      }
    },
    {
      id: 'oneplus-9',
      name: 'OnePlus 9',
      brand: 'OnePlus',
      image: 'https://example.com/oneplus9.jpg',
      price: '$729',
      specs: {
        display: '6.55 inch',
        processor: 'Snapdragon 888',
        camera: '48MP Triple',
        storage: '128GB',
        battery: '4500 mAh'
      }
    }
  ];

  constructor() {
    this.bazaarvoiceService = new BazaarvoiceService();
  }

  async getAllPhones(): Promise<Phone[]> {
    // Fetch ratings for all phones from Bazaarvoice
    const phonesWithRatings = await Promise.all(
      this.phoneData.map(async (phone) => {
        try {
          const stats = await this.bazaarvoiceService.getProductStats(phone.id);
          return {
            ...phone,
            rating: stats
          };
        } catch (error) {
          console.error(`Error fetching ratings for ${phone.id}:`, error);
          return phone;
        }
      })
    );

    return phonesWithRatings;
  }

  async getPhoneById(id: string): Promise<Phone | null> {
    const phone = this.phoneData.find(p => p.id === id);
    
    if (!phone) {
      return null;
    }

    try {
      const stats = await this.bazaarvoiceService.getProductStats(id);
      return {
        ...phone,
        rating: stats
      };
    } catch (error) {
      console.error(`Error fetching ratings for ${id}:`, error);
      return phone;
    }
  }
}