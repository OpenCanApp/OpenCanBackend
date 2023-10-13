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

const newsArr = [
  "canada",
  "canada-britishcolumbia",
  "canada-calgary",
  "canada-manitoba",
  "canada-thunderbay",
  "canada-london",
  "canada-kitchenerwaterloo",
  "canada-toronto",
  "canada-hamiltonnews",
  "canada-montreal",
  "canada-newbrunswick",
  "canada-novascotia",
  "canada-newfoundland",
  "canada-north",
  "canada-ottawa",
];

const getSingleCategoryNews = async (category) => {
  const response = await axios.get(
    `${process.env.XML_PARSER}=${process.env.NEWS_LINK}${category}`
  );

  if (!response.data.success === true) {
    throw new CustomError.BadRequestError(`Cannot get the news`);
  }

  const newsList = response.data.data;
  newsList.forEach(async (news) => {
    const { title, url, description: htmlString, date: timestamps } = news;
    const date = new Date(timestamps);
    const $ = cheerio.load(htmlString);
    const image = $("img").attr("src");
    const description = $("p").text();
    const category = news.source.text.split("|").map((item) => item.trim())[1];
    
    await News.create({
      title,
      description,
      url,
      image,
      date,
      category,
    });
  });
};

const getNews = async () => {
  await News.removeAllNews();

  for (let i = 0; i < newsArr.length; i++) {
    getSingleCategoryNews(newsArr[i]);
  }

  console.log("Updated News");
};

module.exports = getNews;
