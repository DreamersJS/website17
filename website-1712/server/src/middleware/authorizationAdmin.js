export const verifyAdmin = (req, res, next) => {
  console.log('verifyAdmin req ' + req);
  console.log("verifyAdmin req.user:", JSON.stringify(req.user, null, 2));

    if (req.user?.role.toUpperCase() !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
  
    next(); // Proceed to the next middleware or route handler
  };
  
  // for coach roles
  export const authorizeRole = (requiredRole) => (req, res, next) => {
    if (!req.user?.role) {
      return res.status(403).json({ error: 'Access denied. Role not found.' });
    }
  
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: `Access denied. ${requiredRole} role required.` });
    }
  
    next(); 
  };
  