import mysql from 'mysql2';
import { ENV } from '../constants/env';
import { drizzle } from 'drizzle-orm/mysql2';

const connection = mysql.createConnection({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  port: ENV.DB_PORT,
});

export const db = drizzle(connection);
