import fastify, { FastifyInstance } from "fastify";
import autoload from "@fastify/autoload";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { join } from "path";
import { config } from "./config";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

export async function buildServer(): Promise<FastifyInstance> {
  const isDevelopment = config.NODE_ENV === "development";

  const server = fastify({
    logger: {
      level: config.LOG_LEVEL,
      transport: isDevelopment
        ? {
            target: "pino-pretty",
            options: {
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          }
        : undefined,
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  // Register plugins
  await server.register(fastifyCors, {
    origin: config.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  // Register Swagger
  await server.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Bazaarvoice Ratings API",
        description:
          "API for retrieving phone ratings and reviews from Bazaarvoice",
        version: "1.0.0",
      },
      host: `${config.HOST}:${config.PORT}`,
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  // Register Swagger UI
  await server.register(fastifySwaggerUi, {
    routePrefix: "/docs", // Use routePrefix here
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    staticCSP: true, // Enable Content Security Policy for static assets
    transformStaticCSP: (header) => header, // Optional: Transform CSP header if needed
  });

  // Register routes
  await server.register(autoload, {
    dir: join(__dirname, "routes"),
    options: { prefix: "/api" },
  });

  // Register plugins
  await server.register(autoload, {
    dir: join(__dirname, "plugins"),
    options: { config },
  });

  // Health check endpoint
  server.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  // Error handler
  server.setErrorHandler((error, request, reply) => {
    server.log.error(error);

    reply.status(error.statusCode || 500).send({
      success: false,
      error: error.message || "Internal Server Error",
      data: null,
    });
  });

  return server;
}
