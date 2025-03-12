import fastify, { FastifyInstance } from 'fastify';
import autoload from '@fastify/autoload';
import { TypeBoxTypeProvider } from '@fastify/type-provider-json-schema-to-ts';
import { join } from 'path';
import { config } from './config';

export async function buildServer(): Promise<FastifyInstance> {
  const server = fastify({
    logger: {
      level: config.LOG_LEVEL,
      transport: config.isDevelopment
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  // Register plugins
  await server.register(import('@fastify/cors'), {
    origin: config.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  // Register Swagger
  await server.register(import('@fastify/swagger'), {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'Bazaarvoice Ratings API',
        description: 'API for retrieving phone ratings and reviews from Bazaarvoice',
        version: '1.0.0',
      },
      host: `${config.HOST}:${config.PORT}`,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  await server.register(import('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
  });

  // Register routes
  await server.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
  });

  // Register plugins
  await server.register(autoload, {
    dir: join(__dirname, 'plugins'),
    options: { config },
  });

  // Health check endpoint
  server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Error handler
  server.setErrorHandler((error, request, reply) => {
    server.log.error(error);
    
    reply.status(error.statusCode || 500).send({
      success: false,
      error: error.message || 'Internal Server Error',
      data: null
    });
  });

  return server;
}