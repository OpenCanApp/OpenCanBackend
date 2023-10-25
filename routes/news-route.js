const express = require("express");
const router = express.Router();

const { getNews } = require("../controllers").newsController;
const { getTweet} = require("../controllers").tweetController;

router.route("/").get(getNews);
router.route("/ttc").get(getTweet);

module.exports = router;
