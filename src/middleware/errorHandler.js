const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  console.error({
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  res.status(statusCode).json({
    success: false,
    message: statusCode < 500 ? err.message : "Internal Server Error",

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

module.exports = errorHandler;
