import { defineConfig } from 'drizzle-kit';
import { ENV } from './src/constants/env';
export default defineConfig({
  dialect: 'mysql',
  out: './src/db/migrations',
  schema: './src/entities',
  dbCredentials: {
    host: ENV.DB_HOST as any,
    user: ENV.DB_USER as any,
    database: ENV.DB_NAME as any,
    password: ENV.DB_PASSWORD as any,
    port: ENV.DB_PORT,
  },
  verbose: true,
  strict: true,
});
