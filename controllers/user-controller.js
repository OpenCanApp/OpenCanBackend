const { User } = require("../models");
const { StatusCodes } = require("http-status-codes");

const showCurrentUser = async (req, res) => {
  console.log("showCurrentUser");
  console.log(req.user);
  res.status(StatusCodes.OK).json({ user: req.user });
};

module.exports = {
  showCurrentUser,
};
