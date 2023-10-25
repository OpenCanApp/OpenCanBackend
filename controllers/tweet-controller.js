const {Tweet} = require("../models");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getTweet = async (req, res) => {
  const tweets = await Tweet.find({}).sort("-date");
  return res.status(StatusCodes.OK).json({tweets, count: tweets.length});
}

module.exports = { getTweet};