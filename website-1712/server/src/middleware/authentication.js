import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const authenticateUser = (req, res, next) => {
  // console.log('authenticateUser req ' + req);
  const token = req.cookies.authToken || req.header('Authorization')?.replace('Bearer ', '');
  // console.log("Auth Token from Cookie:", req.cookies.authToken);
  // console.log("Auth Token from Header:", req.header('Authorization'));
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    console.log('authenticateUser token ' + token);

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('authenticateUser decoded ' + decoded);
    req.user = decoded; // This makes `req.user` available to `verifyAdmin`
    console.log('authenticateUser req.user ' + req.user);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};
