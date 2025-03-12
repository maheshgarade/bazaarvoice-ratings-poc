import { FastifyRequest, FastifyReply } from 'fastify';
import { ReviewService } from '../services/reviewService';

const reviewService = new ReviewService();

export async function getPhoneReviewsController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  
  try {
    const reviews = await reviewService.getReviewsByProductId(id);
    
    return reply.status(200).send({
      success: true,
      data: reviews
    });
  } catch (error: any) {
    request.log.error(`Error fetching reviews for phone ${id}: ${error.message}`);
    return reply.status(500).send({
      success: false,
      data: [],
      error: `Failed to fetch reviews for phone with ID ${id}`
    });
  }
}