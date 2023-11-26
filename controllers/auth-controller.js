const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");
const CustomError = require("../errors");
const { createTokenUser, createJWT } = require("../utils");

const googleLogin = async (req, res) => {
  const tokenUser = createTokenUser(req.user);
  const token = createJWT(tokenUser);

  // Json -> String
  const userDataObject = {
    tokenUser,
    token,
  };
  const userData = JSON.stringify(userDataObject);
  const linkingUri = req.query.state; 
  const deepLinkUrl = `${linkingUri}data=${encodeURIComponent(userData)}`;
  res.redirect(deepLinkUrl);

  // res.status(StatusCodes.OK).json({ user: tokenUser, token, userData });
};

// const googleLogin = async (req, res) => {
//   const tokenUser = createTokenUser(req.user);
//   const token = createJWT(tokenUser);
//   res.redirect(`opencanapp://callback?token=${token}`);
// };

const facebookLogin = async (req, res) => {
  const tokenUser = createTokenUser(req.user);
  const token = createJWT(tokenUser);

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

const receiveUserProfile = async (req, res) => {
  console.log("receiveUserProfile");
  const { profile } = req.body;
  if (profile.provider === "google") {
    let foundUser = await User.findOne({ googleId: profile.id });

    if (foundUser) {
      const tokenUser = createTokenUser(foundUser);
      const token = createJWT(tokenUser);

      return res.status(StatusCodes.OK).json({ user: tokenUser, token });
    } else {
      const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        avatar: profile.photos[0]?.value,
      });

      const tokenUser = createTokenUser(newUser);
      const token = createJWT(tokenUser);

      return res.status(StatusCodes.OK).json({ user: tokenUser, token });
    }
  } else if (profile.provider === "facebook") {
    console.log("facebook");
    const foundUser = await User.findOne({ facebookId: profile.id });

    if (foundUser) {
      const tokenUser = createTokenUser(foundUser);
      const token = createJWT(tokenUser);

      return res.status(StatusCodes.OK).json({ user: tokenUser, token });
    } else {
      const newUser = await User.create({
        facebookId: profile.id,
        name: profile.displayName,
        avatar: profile.photos[0].value,
      });

      const tokenUser = createTokenUser(newUser);
      const token = createJWT(tokenUser);

      return res.status(StatusCodes.OK).json({ user: tokenUser, token });
    }
  }

  throw new CustomError.BadRequestError("Please provide providers information");
};
module.exports = { googleLogin, facebookLogin, receiveUserProfile };
