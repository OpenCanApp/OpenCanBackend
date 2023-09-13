const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api-error");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    this(message);
    this.StatusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
