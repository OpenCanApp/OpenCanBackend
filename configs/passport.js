const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const { User } = require("../models");
const { createTokenUser } = require("../utils");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  const user = await User.findOne({ _id });
  const tokenUser = createTokenUser(user);
  done(null, tokenUser);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      let foundUser = await User.findOne({ googleId: profile.id });

      if (foundUser) {
        done(null, foundUser);
      } else {
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: profile.photos[0]?.value,
        });

        done(null, newUser);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["photos", "displayName"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const foundUser = await User.findOne({ facebookId: profile.id });

      if (foundUser) {
        done(null, foundUser);
      } else {
        const newUser = await User.create({
          facebookId: profile.id,
          name: profile.displayName,
          avatar: profile.photos[0].value,
        });

        done(null, newUser);
      }
    }
  )
);
