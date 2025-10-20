import * as dotenv from 'dotenv';
// import path from 'path';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || 'rr',
    user: process.env.DB_USER || 'root',
    pass: process.env.DB_PASS || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  email: {
    host: process.env.EMAIL_HOST,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  sms: {
    apiKey: process.env.SMS_API_KEY,
  }
};
