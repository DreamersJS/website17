import { Pool } from 'pg';
import { DATABASE_URL } from './env.js';

// Create a new pool of connections
const pool = new Pool({
  connectionString: DATABASE_URL, // Connection string from .env
});

export const connectDB = async () => {
  try {
    // Test the connection to the PostgreSQL database
    await pool.connect();
    console.log('Database connected successfully!');
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

export default pool; // Export the pool to query the database
