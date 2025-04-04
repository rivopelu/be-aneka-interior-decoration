export const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  APP_DEBUG: process.env.APP_DEBUG,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: String(process.env.JWT_SECRET),
  SHIPPING_SERVICE_ENDPOINT: process.env.SHIPPING_SERVICE_ENDPOINT,
  SHIPPING_STORE_ORIGIN_CODE: process.env.SHIPPING_STORE_ORIGIN_CODE,
};
