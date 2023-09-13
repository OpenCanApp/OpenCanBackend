const passport = require("passport");

const passportGoogleMiddleware = passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
});

module.exports = passportGoogleMiddleware;
