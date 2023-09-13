const jwt = require("jsonwebtoken");
const { modelNames } = require("mongoose");

// Create JWT function
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  return token;
}

// Decrypt JWT from user
// It returns the payload (user's info)
const decryptJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {createJWT, decryptJWT};