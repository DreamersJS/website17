const errorHandler = (err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
};

export default errorHandler;
