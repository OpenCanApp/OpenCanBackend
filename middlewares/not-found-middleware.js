const {StatusCodes}  =require("http-status-codes");

const notFoundMiddleware = (req, res) => {
  const url = req.url;
  res.status(StatusCodes.NOT_FOUND).json({message: `The route ${url} doesn't exist`});
}

module.exports = notFoundMiddleware;