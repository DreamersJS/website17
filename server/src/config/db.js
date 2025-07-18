// import { Pool } from 'pg'; //SyntaxError trying to use ES Module (ESM) syntax (import { Pool } from 'pg') with a package (pg) that is written in CommonJS format. In Node.js, CommonJS modules can't always be destructured like ESM modules.
import pkg from 'pg';
const { Pool } = pkg;

import { DATABASE_URL } from './env.js';

// Create a new pool of connections
const pool = new Pool({
  connectionString: DATABASE_URL, 
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

export default pool; 
