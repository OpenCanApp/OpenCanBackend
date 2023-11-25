const passport = require("passport");

// const passportGoogleMiddleware = passport.authenticate("google", {
//   scope: ["profile", "email"],
//   prompt: "select_account",
// });

const passportGoogleMiddleware = (req, res) => {
  const { linkingUri } = req.query;
  console.log(linkingUri);
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    state: linkingUri,
  });
};
module.exports = passportGoogleMiddleware;
