import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 
const PORT = process.env.PORT;
const DOMAIN = process.env.DOMAIN;
const NODE_ENV = process.env.NODE_ENV;

const corsOptions = {
    origin: [PORT, DOMAIN], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies and auth headers
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  export default cors(corsOptions);