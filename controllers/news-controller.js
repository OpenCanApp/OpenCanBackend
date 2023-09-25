const { News } = require("../models");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getNews = async (req, res) => {
  const news = await News.find({}).sort("-date");

  return res.status(StatusCodes.OK).json({ news, count: news.length });
};

module.exports = { getNews };
