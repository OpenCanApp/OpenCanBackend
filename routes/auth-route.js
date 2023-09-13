const express = require("express");
const router = express.Router();
const passport = require("passport");

const { passportGoogleMiddleware } = require("../middlewares");
const { googleLogin } = require("../controllers").authController;

// Google login
router.get("/google", passportGoogleMiddleware);
router.get("/google/redirect", passport.authenticate("google"), googleLogin);

module.exports = router;
