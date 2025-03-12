import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@/utils/api';
import { ApiResponse, Phone } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Phone[]>>
) {
  try {
    const response = await api.get('/phones');
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error fetching phones:', error);
    res.status(500).json({
      success: false,
      data: [],
      error: error.message || 'Failed to fetch phones'
    });
  }
}