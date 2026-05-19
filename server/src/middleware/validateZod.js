export const validateZod = (schema, source = "body") => (req, res, next) => {
  const data = req[source];

  const result = schema.safeParse(data);
  if (!result.success) {
    return res.status(400).json({
      errors: result.error.flatten(),
    });
  }
  req.validatedData = result.data;
  next();
};