const passport = require("passport");

// const passportGoogleMiddleware = passport.authenticate("google", {
//   scope: ["profile", "email"],
//   prompt: "select_account",
// });

const passportGoogleMiddleware = (req, res, next) => {
  const { linkingUri } = req.query;
  console.log(linkingUri);
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    state: linkingUri,
  })(req, res, next);
};
module.exports = passportGoogleMiddleware;
