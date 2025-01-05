import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.authToken || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};
