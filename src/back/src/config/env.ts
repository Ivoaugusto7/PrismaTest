import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3333),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  DEFAULT_SELLER_NAME: z.string().default('Casa Lajes'),
  DATABASE_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);
