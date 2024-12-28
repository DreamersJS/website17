export const verifyAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
  
    next(); // Proceed to the next middleware or route handler
  };
  