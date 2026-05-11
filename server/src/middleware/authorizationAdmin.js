export const verifyAdmin = (req, res, next) => {
  if (req.user?.role.toUpperCase() !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden: Admin access required" });
  }

  next();
};
