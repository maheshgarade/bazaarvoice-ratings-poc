import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@/utils/api';
import { ApiResponse, Review } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Review[]>>
) {
  const { id } = req.query;
  
  try {
    const response = await api.get(`/phones/${id}/reviews`);
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error(`Error fetching reviews for phone ${id}:`, error);
    res.status(500).json({
      success: false,
      data: [],
      error: error.message || 'Failed to fetch reviews'
    });
  }
}