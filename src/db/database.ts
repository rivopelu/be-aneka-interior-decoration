import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { ENV } from '../constants/env';

const connection = await mysql.createConnection({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  database: ENV.DB_NAME,
  password: ENV.DB_PASSWORD,
  port: ENV.DB_PORT,
});

const db = drizzle({ client: connection });
