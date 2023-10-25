const axios = require("axios");
const CustomError = require("../errors");
const { Tweet } = require("../models");

const getTweet = async () => {
  try {
    const response = await axios.get(
      `https://api.apify.com/v2/datasets/5fCp6Vu5RYfsl4UW4/items?token=${process.env.APIFY_API_KEY}`
    );

    if (!response.data) {
      throw new CustomError.BadRequestError(`Cannot get the tweets`);
    }

    await Tweet.removeAllTweets();

    response.data.forEach(async (tweet) => {
      const {
        tweet_avatar: tweetAvatar,
        url,
        text,
        username,
        timestamp,
      } = tweet;
      const date = new Date(timestamp);

      await Tweet.create({
        tweetAvatar,
        url,
        text,
        username,
        date,
      });
    });

    console.log("Updated Tweet")
  } catch (err) {
    console.log(err);
  }
};

module.exports = getTweet;