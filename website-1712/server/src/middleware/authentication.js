// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expect 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
