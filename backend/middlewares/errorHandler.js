export default (err, req, res, next) => {
  logger.error(err)
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({ message: err.message, error: err })
}
