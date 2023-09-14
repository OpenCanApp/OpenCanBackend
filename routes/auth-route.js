const express = require("express");
const router = express.Router();
const passport = require("passport");

const { passportGoogleMiddleware } = require("../middlewares");
const { googleLogin, facebookLogin } = require("../controllers").authController;

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

module.exports = router;
