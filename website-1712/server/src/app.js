import express from 'express';
import corsOptions from './config/corsOptions.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import prisma from './config/prisma.js';
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
async function connectToDatabase() {
    try {
      await prisma.$connect(); // Establish the database connection
      console.log('Connected to the database successfully.');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  }
  
  connectToDatabase(); // Call the database connection
  


export default app;