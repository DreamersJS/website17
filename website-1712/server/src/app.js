import express from 'express';
import corsOptions from './config/corsOptions';
import routes from './routes/index';
import errorHandler from './middleware/errorHandler';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(corsOptions);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', routes);

// Error Handling
app.use(errorHandler);

// Connect to DB
connectDB();

export default app;