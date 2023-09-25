const { createJWT, decryptJWT } = require("./auth-utils/jwt");

module.exports = {
  createJWT,
  decryptJWT,
  checkPermission: require("./auth-utils/checkPermission"),
  createTokenUser: require("./auth-utils/createTokenUser"),
  getNews: require("./news-utils"),
};
