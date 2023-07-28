export const handleError = (err, req, res, next) => {
  if (res.headerSent) {
    next(err);
  }
  return res.status(err.statusCode || 500).json({
    status: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'dev' ? err.stack : null,
  });
};

export const handle404 = (req, res) => {
  return res.status(404).json({
    status: false,
    data: null,
    message: 'Endpoint not found!',
  });
};
