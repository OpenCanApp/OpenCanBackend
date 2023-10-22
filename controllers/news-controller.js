const { News } = require("../models");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getNews = async (req, res) => {
  const { category } = req.query;
  let queryObject = {};
  if (category) queryObject.category = category.replace(/-/g, " ");

  // Pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || 30;
  const skip = (page - 1) * limit;

  const news = await News.find(queryObject).sort("-date").limit(limit).skip(skip);

  return res.status(StatusCodes.OK).json({ news, count: news.length });
};

module.exports = { getNews };
