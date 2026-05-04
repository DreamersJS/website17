import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET_KEY;

if (!ACCESS_SECRET) {
  throw new Error('JWT secret key is missing from environment variables');
}

export const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    req.user = decoded; // This makes `req.user` available to `verifyAdmin`
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};
