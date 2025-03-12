import envSchema from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
  NODE_ENV: Type.String({
    default: 'development'
  }),
  PORT: Type.Number({
    default: 3001
  }),
  HOST: Type.String({
    default: 'localhost'
  }),
  LOG_LEVEL: Type.String({
    default: 'info'
  }),
  CORS_ORIGIN: Type.String({
    default: 'http://localhost:3000'
  }),
  BAZAARVOICE_API_KEY: Type.String(),
  BAZAARVOICE_ENDPOINT: Type.String({
    default: 'https://api.bazaarvoice.com'
  })
});

type Env = Static<typeof schema>;

export const config = envSchema<Env>({
  schema,
  dotenv: true
});

export const isDevelopment = config.NODE_ENV === 'development';
export const isProduction = config.NODE_ENV === 'production';