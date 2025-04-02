import { defineConfig } from 'drizzle-kit';
import { ENV } from './src/constants/env';
export default defineConfig({
  dialect: 'mysql',
  out: './src/db/migrations',
  schema: './src/entities',
  dbCredentials: {
    host: ENV.DB_HOST,
    user: ENV.DB_USER,
    database: ENV.DB_NAME,
    password: ENV.DB_PASSWORD,
    port: ENV.DB_PORT,
  },
  verbose: true,
  strict: true,
});
