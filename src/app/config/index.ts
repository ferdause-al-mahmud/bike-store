import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL, // Ensure this matches the .env variable name
  NODE_ENV: process.env.NODE_ENV,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET, // Corrected typo
  access_token_expire_date: process.env.ACCESS_TOKEN_EXPIRE_DATE,
  refresh_token_expire_date: process.env.REFRESH_TOKEN_EXPIRE_DATE,
};