module.exports = {
  notFoundMiddleware: require("./not-found-middleware"),
  errorHandlerMiddleware: require("./error-handler-middleware"),
  passportGoogleMiddleware: require("./passport-google-middleware"),
  authenticationMiddleware: require("./authentication-middleware"),
  permissionsMiddleware: require("./authorize-permission-middleware")
};
