const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");
const CustomError = require("../errors");
const { createTokenUser, createJWT } = require("../utils");

const googleLogin = async (req, res) => {
  const tokenUser = createTokenUser(req.user);
  const token = createJWT(tokenUser);

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

const facebookLogin = async (req, res) => {
  const tokenUser = createTokenUser(req.user);
  const token = createJWT(tokenUser);

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

module.exports = { googleLogin, facebookLogin };
