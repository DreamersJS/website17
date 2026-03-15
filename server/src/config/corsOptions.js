import cors from 'cors';
import { FRONTEND_URL } from '../config/env.js';

const allowedOrigins = [
  FRONTEND_URL
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies and auth headers
  allowedHeaders: ['Content-Type', 'Authorization'],
};
export default cors(corsOptions);
