import { FastifyPluginAsync } from 'fastify';
import { Type } from '@sinclair/typebox';
import { getPhonesController, getPhoneByIdController } from '../controllers/phoneController';
import { getPhoneReviewsController } from '../controllers/reviewController';

const phoneSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  brand: Type.String(),
  image: Type.Optional(Type.String()),
  price: Type.Optional(Type.String()),
  rating: Type.Optional(Type.Object({
    average: Type.Number(),
    count: Type.Number(),
    distribution: Type.Record(Type.String(), Type.Number())
  })),
  specs: Type.Optional(Type.Record(Type.String(), Type.Union([Type.String(), Type.Number()])))
});

const phoneParamsSchema = Type.Object({
  id: Type.String()
});

const reviewSchema = Type.Object({
  id: Type.String(),
  productId: Type.String(),
  rating: Type.Number(),
  title: Type.String(),
  text: Type.String(),
  submissionDate: Type.String(),
  reviewer: Type.Object({
    id: Type.String(),
    name: Type.String(),
    isVerifiedPurchaser: Type.Boolean()
  }),
  helpfulVotes: Type.Optional(Type.Number()),
  notHelpfulVotes: Type.Optional(Type.Number()),
  pros: Type.Optional(Type.String()),
  cons: Type.Optional(Type.String())
});

const responseSchema = <T>(schema: T) => Type.Object({
  success: Type.Boolean(),
  data: schema,
  error: Type.Optional(Type.String())
});

const routes: FastifyPluginAsync = async (fastify) => {
  // Get all phones
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: responseSchema(Type.Array(phoneSchema))
        }
      }
    },
    getPhonesController
  );

  // Get phone by ID
  fastify.get<{ Params: { id: string } }>(
    '/:id',
    {
      schema: {
        params: phoneParamsSchema,
        response: {
          200: responseSchema(phoneSchema)
        }
      }
    },
    getPhoneByIdController
  );

  // Get phone reviews
  fastify.get<{ Params: { id: string } }>(
    '/:id/reviews',
    {
      schema: {
        params: phoneParamsSchema,
        response: {
          200: responseSchema(Type.Array(reviewSchema))
        }
      }
    },
    getPhoneReviewsController
  );
};

export default routes;