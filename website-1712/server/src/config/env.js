import dotenv from 'dotenv';

dotenv.config(); 

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const DOMAIN = process.env.DOMAIN;
export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const FRONTEND_URL= process.env.FRONTEND_URL
export const REDIS_URL= process.env.REDIS_URL
export const ETHEREAL_USER= process.env.ETHEREAL_USER
export const ETHEREAL_PASS= process.env.ETHEREAL_PASS
export const ETHEREAL_PORT= process.env.ETHEREAL_PORT
export const ETHEREAL_HOST= process.env.ETHEREAL_HOST
