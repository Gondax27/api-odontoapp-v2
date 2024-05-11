import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local' });

export const PORT = Number(process.env.PORT || '3001');
export const MONGO_URL = process.env.MONGO_URL || '';
export const DATA_BASE_NAME = process.env.DATA_BASE_NAME || '';
export const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT || '';
