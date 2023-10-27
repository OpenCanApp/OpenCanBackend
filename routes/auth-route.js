const express = require("express");
const router = express.Router();
const passport = require("passport");

const { passportGoogleMiddleware } = require("../middlewares");
const { googleLogin, facebookLogin, receiveUserProfile } =
  require("../controllers").authController;

// Google login
router.get("/google", passportGoogleMiddleware);
router.get("/google/redirect", passport.authenticate("google"), googleLogin);

// Facebook Login
router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  facebookLogin
);

// Getting profile from front-end
router.post("/google/callback", receiveUserProfile);
router.post("/facebook/callback", receiveUserProfile);

module.exports = router;
