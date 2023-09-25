const axios = require("axios");
const CustomError = require("../errors");
const { News } = require("../models");
const cheerio = require("cheerio");

const convertFullDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
};

const getNews = async () => {
  const response = await axios.get(
    `${process.env.XML_PARSER}=${process.env.NEWS_LINK}`
  );
  if (!response.data.success === true) {
    throw new CustomError.BadRequestError(`Cannot get the news`);
  }
  await News.removeAllNews();
  const newsList = response.data.data;

  newsList.forEach(async (news) => {
    const { title, url, description: htmlString, date: timestamps } = news;
    const date = new Date(timestamps);
    const readableDate = convertFullDate(date);
    const $ = cheerio.load(htmlString);
    const image = $("img").attr("src");
    const description = $("p").text();

    await News.create({
      title,
      description,
      url,
      image,
      date,
    });
  });
  console.log("Updated News");
};

module.exports = getNews;
