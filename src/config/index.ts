import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

interface Config {
  port: number;
  database_url: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '5000', 10),
  database_url: process.env.DATABASE_URL || '',
};

if (!config.database_url) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

export default config;
