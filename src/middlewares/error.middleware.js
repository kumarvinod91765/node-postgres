module.exports = (err, req, res, _next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
};
