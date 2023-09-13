const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  // Default Error from the upper level
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // 500
    message: err.message || `Something went wrong, please try it again later`,
  };

  // For MongoDB Error
  if (err.name === "ValidationError") {
    // err.errors is an array that stored error's info
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  
  // Duplicate value
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // ObjectId casting error
  if (err.name === "CastError") {
    customError.message = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;
