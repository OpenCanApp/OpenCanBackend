const { News } = require("../models");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getNews = async (req, res) => {
  const { category } = req.query;
  let queryObject = {};
  if (category) queryObject.category = category.replace(/-/g, " ");

  const news = await News.find(queryObject).sort("-date").limit(20);

  return res.status(StatusCodes.OK).json({ news, count: news.length });
};

module.exports = { getNews };
