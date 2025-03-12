import useSWR from 'swr';
import { ApiResponse, Review } from '@/types';
import { fetcher } from '@/utils/api';

export function useReviews(phoneId: string) {
  const { data, error, isLoading } = useSWR<ApiResponse<Review[]>>(
    phoneId ? `/api/phones/${phoneId}/reviews` : null,
    fetcher
  );

  return {
    reviews: data?.data,
    isLoading,
    error
  };
}