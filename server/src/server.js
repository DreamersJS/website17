import app from './app.js';
import { PORT } from './config/env.js';
import prisma from './config/prisma.js';

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
