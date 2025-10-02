const valitation = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body, {
      abortEarly: false,
      errors: { wrap: { label: "" } },
    });

    if (result.error) {
      return res
        .status(400)
        .json({ error: result.error.details.map((err) => err.message) });
    }
    next();
  };
};

module.exports = valitation;
