const { decryptJWT } = require("../utils");
const { User } = require("../models");
const CustomError = require("../errors");

const auth = async (req, res, next) => {
  // Check the HTTP request's header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];
  console.log(`token ${token}`);
  try {
    const payload = decryptJWT(token);
    req.user = {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      avatar: payload.avatar,
    };
    next();
  } catch (err) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
