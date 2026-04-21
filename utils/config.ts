import dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  standardUser: process.env.STANDARD_USER || 'standard_user',
  standardPassword: process.env.STANDARD_PASSWORD || 'secret_sauce',
  lockedUser: process.env.LOCKED_USER || 'locked_out_user',
};