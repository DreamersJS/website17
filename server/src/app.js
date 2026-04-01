import express from 'express';
import corsOptions from './config/corsOptions.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
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

export default app;
